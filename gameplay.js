/*
  Gameplay simulation rules.

  Edit this file when you want to tune:
  - game length and overtime flow
  - possession timing by tempo
  - player/action selection
  - shot, drive, post, and pass resolution
  - live game feed and box score output
*/

function startGameSimulation(fastFinish) {
  const game = cachedSchedule ? cachedSchedule[currentGameIndex] : null;
  if (!game) return;
  ensureDefaultGameplanSaved();
  stopGameTimer();
  activeGame = createGameState(game);
  renderGameScreen();
  flash(() => {
    showPanel('game');
    renderGameScreen();
    if (fastFinish) simGameToEnd();
    else startGameTimer();
  });
}

function startMultiGameSuperSim(count) {
  const remainingGames = (cachedSchedule || []).length - currentGameIndex;
  if (remainingGames <= 0) return;
  const gamesToSim = Math.max(1, Math.min(Number(count) || 1, remainingGames));
  ensureDefaultGameplanSaved();
  stopGameTimer();
  activeGame = createGameState(cachedSchedule[currentGameIndex]);
  activeGame.superSimRemaining = gamesToSim;
  renderGameScreen();
  flash(() => {
    showPanel('game');
    renderGameScreen();
    simGameToEnd();
  });
}

function createGameState(scheduleGame) {
  const userRoster = ((allRosters || {})[selectedConf] || {})[selectedTeam] || [];
  const oppConf = getTeamConf(scheduleGame.opponent) || selectedConf;
  const oppRoster = (((allRosters || {})[oppConf] || {})[scheduleGame.opponent]) || generateTeamRoster((((TEAM_DATA[oppConf] || {})[scheduleGame.opponent] || {}).o || 70), getFallbackNamePool());
  const homeTeam = scheduleGame.home ? selectedTeam : scheduleGame.opponent;
  const awayTeam = scheduleGame.home ? scheduleGame.opponent : selectedTeam;
  const userSide = scheduleGame.home ? 'home' : 'away';
  const opponentSide = scheduleGame.home ? 'away' : 'home';
  const state = {
    scheduleGame,
    homeTeam,
    awayTeam,
    userSide,
    opponentSide,
    period:1,
    clock:12 * 60,
    scores:{ home:0, away:0 },
    teams:{},
    feed:[],
    paused:false,
    speedIndex:0,
    complete:false,
    possessionSide:scheduleGame.home ? 'home' : 'away'
  };
  state.teams[userSide] = buildSimTeam(selectedTeam, userRoster, gameplan, true);
  state.teams[opponentSide] = buildSimTeam(scheduleGame.opponent, oppRoster, buildOpponentGameplan(oppRoster), false);
  addGameFeed(state, `Tipoff: ${state.awayTeam} at ${state.homeTeam}.`);
  return state;
}

function buildSimTeam(teamName, roster, plan, isUser) {
  const rotation = ((plan || {}).rotation || []).filter(r => Number(r.minutes) > 0);
  const rotationNames = new Set(rotation.map(r => r.playerName));
  const activePlayers = roster.filter(p => rotationNames.has(p.name));
  const fallbackPlayers = roster.slice(0, 8);
  const players = (activePlayers.length ? activePlayers : fallbackPlayers).map((p, i) => ({
    ...p,
    simMinutes:Number((rotation.find(r => r.playerName === p.name) || {}).minutes) || (i < 5 ? 24 : 8),
    box:{ pts:0, fgm:0, fga:0, threePm:0, threePa:0, ast:0 }
  }));
  return {
    name:teamName,
    players,
    plan:plan || {},
    isUser
  };
}

function buildOpponentGameplan(roster) {
  const teamAvg = average(roster.map(p => p.overall || 70));
  return {
    offensiveStyle:teamAvg > 78 ? 'Play through our star' : randomChoice(['Shoot threes','Get to the basket','Post up']),
    defensiveStyle:'Disciplined',
    tempo:'Normal',
    rotation:buildRotationDefaults(roster)
  };
}

function startGameTimer() {
  stopGameTimer();
  gameTimer = setInterval(() => {
    if (!activeGame || activeGame.paused || activeGame.complete) return;
    const steps = [1, 4, 12][activeGame.speedIndex] || 1;
    for (let i = 0; i < steps && activeGame && !activeGame.complete && !activeGame.paused; i++) {
      simulatePossession(activeGame);
    }
    renderGameScreen();
  }, 520);
}

function stopGameTimer() {
  if (gameTimer) clearInterval(gameTimer);
  gameTimer = null;
}

function toggleGamePause() {
  if (!activeGame || activeGame.complete) return;
  activeGame.paused = !activeGame.paused;
  renderGameScreen();
}

function cycleGameSpeed() {
  if (!activeGame || activeGame.complete) return;
  activeGame.speedIndex = (activeGame.speedIndex + 1) % 3;
  renderGameScreen();
}

function simGameToEnd() {
  if (!activeGame || activeGame.complete) return;
  activeGame.paused = false;
  let guard = 0;
  while (!activeGame.complete && guard < 5000) {
    simulatePossession(activeGame);
    guard++;
  }
  renderGameScreen();
}

function simulatePossession(state) {
  const offense = state.teams[state.possessionSide];
  const defenseSide = state.possessionSide === 'home' ? 'away' : 'home';
  const defense = state.teams[defenseSide];
  const seconds = getPossessionSeconds(offense.plan.tempo, offense.isUser);
  state.clock = Math.max(0, state.clock - seconds);
  const homeOnOffense = state.possessionSide === 'home';
  const result = resolvePossession(offense, defense, homeOnOffense);
  state.scores[state.possessionSide] += result.points;
  addGameFeed(state, formatPossessionFeed(state, offense.name, result));
  if (state.clock <= 0) advanceGamePeriod(state);
  state.possessionSide = defenseSide;
}

function getPossessionSeconds(tempo, isUser) {
  if (isUser && tempo === 'Fast') return randInt(8, 15);
  if (isUser && (tempo === 'Slow' || tempo === 'Super Slow')) return randInt(19, 24);
  return randInt(14, 17);
}

function resolvePossession(offense, defense, homeOnOffense) {
  const ovmBoost = homeOnOffense ? 1.25 : 1;
  const dvmBoost = homeOnOffense ? 1 : 1.25;
  const initiator = chooseInitiator(offense);
  if (!initiator) return { player:{ name:'Team' }, action:'turnover', made:false, points:0, shotValue:2, passer:null, passQuality:null };
  const defender = chooseDefender(defense, initiator.position);
  const action = chooseAction(initiator, offense.plan.offensiveStyle, true);
  if (action === 'pass') return resolvePassAction(offense, defense, initiator, defender, ovmBoost, dvmBoost);
  return resolveScoringAction(initiator, defender, action, offense.plan.offensiveStyle, ovmBoost, initiator, dvmBoost);
}

function chooseInitiator(team) {
  const players = team.players.length ? team.players : [];
  if (!players.length) return null;
  const star = players.reduce((best, p) => (p.overall || 0) > (best.overall || 0) ? p : best, players[0]);
  if (team.plan.offensiveStyle === 'Play through our star' && Math.random() < 0.35) return star;
  const rest = players.filter(p => p !== star);
  const pool = team.plan.offensiveStyle === 'Play through our star' && rest.length ? rest : players;
  return weightedChoice(pool, p => Math.max(1, Number(p.simMinutes) || 1));
}

function chooseDefender(team, pos) {
  if (!team.players.length) return null;
  const match = team.players.filter(p => p.position === pos);
  return weightedChoice(match.length ? match : team.players, p => Math.max(1, Number(p.simMinutes) || 1));
}

function chooseAction(player, style, allowPass) {
  const base = {
    pass:allowPass ? ((player.tendencies || {}).pass || 20) : 0,
    shoot:((player.tendencies || {}).shoot || 20) + Math.round(((player.tendencies || {}).iso || 0) * 0.35),
    postUp:(player.tendencies || {}).postUp || 20,
    drive:(player.tendencies || {}).drive || 20
  };
  const actions = allowPass ? ['pass','shoot','postUp','drive'] : ['shoot','postUp','drive'];
  const styleAction = {
    'Shoot threes':'shoot',
    'Post up':'postUp',
    'Get to the basket':'drive'
  }[style];
  if (styleAction && actions.includes(styleAction)) {
    const remaining = actions.filter(a => a !== styleAction);
    const weights = {};
    weights[styleAction] = 40;
    remaining.forEach(a => { weights[a] = 60 / remaining.length; });
    return weightedChoice(actions, a => weights[a]);
  }
  return weightedChoice(actions, a => Math.max(1, base[a] || 1));
}

function resolvePassAction(offense, defense, passer, passerDefender, ovmBoost, dvmBoost) {
  const teammates = offense.players.filter(p => p.name !== passer.name);
  const receiver = weightedChoice(teammates.length ? teammates : offense.players, p => Math.max(1, Number(p.simMinutes) || 1));
  if (!receiver) return resolveScoringAction(passer, passerDefender, 'shoot', offense.plan.offensiveStyle, 0.75 * ovmBoost, passer, dvmBoost);
  const defender = chooseDefender(defense, receiver.position);
  const ovm = randInt(0, 300) * ovmBoost;
  const dvm = randInt(0, 300) * dvmBoost;
  const passSkill = average([passer.attributes.iq, passer.attributes.passing]);
  const defSkill = (passerDefender && passerDefender.attributes.defense) || 70;
  const qualityBoost = (ovm * passSkill) > (dvm * defSkill) ? 1.25 : 0.75;
  const action = chooseAction(receiver, offense.plan.offensiveStyle, false);
  const result = resolveScoringAction(receiver, defender, action, offense.plan.offensiveStyle, qualityBoost, passer, dvmBoost);
  result.passQuality = qualityBoost > 1 ? 'good' : 'bad';
  result.passer = passer;
  return result;
}

function resolveScoringAction(player, defender, action, style, ovmMod, passer, dvmBoost = 1) {
  const attrs = player.attributes || {};
  const def = (defender && defender.attributes && defender.attributes.defense) || 70;
  const ovm = randInt(0, 300) * ovmMod;
  const dvm = randInt(0, 300) * dvmBoost;
  let points = 2;
  let skill = attrs.finishing || 70;
  let label = 'drive';
  if (action === 'shoot') {
    const isThree = Math.random() < (style === 'Shoot threes' ? 0.60 : 0.40);
    points = isThree ? 3 : 2;
    skill = isThree ? (attrs.threePoint || 70) : (attrs.midRange || 70);
    label = isThree ? 'three' : 'jumper';
    if (isThree) skill *= 0.9;
  } else if (action === 'postUp') {
    skill = average([attrs.finishing || 70, attrs.iq || 70]);
    label = 'post up';
  } else {
    skill = attrs.finishing || 70;
    label = 'drive';
  }
  const made = (ovm * skill) > (dvm * def);
  recordShot(player, points, made);
  if (made && passer && passer.name !== player.name) passer.box.ast++;
  return { player, defender, action:label, made, points:made ? points : 0, shotValue:points, passer:null, passQuality:null };
}

function recordShot(player, shotValue, made) {
  player.box.fga++;
  if (shotValue === 3) player.box.threePa++;
  if (made) {
    player.box.pts += shotValue;
    player.box.fgm++;
    if (shotValue === 3) player.box.threePm++;
  }
}

function advanceGamePeriod(state) {
  if (state.period >= 4 && state.scores.home !== state.scores.away) {
    finishGame(state);
    return;
  }
  state.period++;
  state.clock = state.period <= 4 ? 12 * 60 : 5 * 60;
  if (state.period === 5) addGameFeed(state, 'Regulation ends tied. Overtime begins.');
  else if (state.period > 5) addGameFeed(state, `Still tied. OT${state.period - 4} begins.`);
  else addGameFeed(state, `End of period. ${getPeriodLabel(state.period)} begins.`);
}

function finishGame(state) {
  if (state.resultApplied) return;
  state.complete = true;
  state.paused = true;
  state.weekSimInProgress = true;
  stopGameTimer();
  const winnerSide = state.scores.home > state.scores.away ? 'home' : 'away';
  const loserSide = winnerSide === 'home' ? 'away' : 'home';
  const margin = Math.abs(state.scores.home - state.scores.away);
  applyGameResultToStandings(state[`${winnerSide}Team`], state[`${loserSide}Team`], margin);
  state.resultApplied = true;
  state.scheduleGame.result = {
    homeScore:state.scores.home,
    awayScore:state.scores.away
  };
  saveCachedSchedule();
  lastBoxScore = makeBoxScore(state);
  sessionStorage.setItem('lastBoxScore', JSON.stringify(lastBoxScore));
  currentGameIndex = Math.min(currentGameIndex + 1, (cachedSchedule || []).length);
  addGameFeed(state, `Final: ${state.awayTeam} ${state.scores.away}, ${state.homeTeam} ${state.scores.home}.`);
  renderGameScreen();
  startRemainderWeekSimulation(state);
}

function startRemainderWeekSimulation(state) {
  setTimeout(() => {
    const count = simulateRemainderWeekGames(state.scheduleGame);
    state.weekSimInProgress = false;
    addGameFeed(state, `Remainder of the week complete: ${count} games simulated.`);
    if (state.superSimRemaining > 1 && currentGameIndex < (cachedSchedule || []).length) {
      state.superSimRemaining -= 1;
      startNextSuperSimGame(state.superSimRemaining);
      return;
    }
    renderGameScreen();
  }, 650);
}

function startNextSuperSimGame(remaining) {
  activeGame = createGameState(cachedSchedule[currentGameIndex]);
  activeGame.superSimRemaining = remaining;
  addGameFeed(activeGame, `Super sim continues: ${remaining} game${remaining === 1 ? '' : 's'} left including this one.`);
  renderGameScreen();
  setTimeout(simGameToEnd, 250);
}

function simulateRemainderWeekGames(scheduleGame) {
  ensureStandingsState();
  const weekKey = scheduleGame.date || `GAME-${currentGameIndex}`;
  if (standingsState.weeksSimmed && standingsState.weeksSimmed[weekKey]) {
    return 0;
  }
  const teams = Object.values(CONFERENCES)
    .flat()
    .filter(team => team !== selectedTeam && team !== scheduleGame.opponent);
  const rng = mulberry32(strHash(`${seasonNumber || 1}|${scheduleGame.date}|national-week`));
  const shuffled = seededShuffle(teams, rng);
  let count = 0;
  for (let i = 0; i < shuffled.length - 1; i += 2) {
    simulateBackgroundGame(shuffled[i], shuffled[i + 1], rng);
    count++;
  }
  standingsState.weeksSimmed[weekKey] = count;
  sessionStorage.setItem(getStandingsStateKey(), JSON.stringify(standingsState));
  return count;
}

function simulateBackgroundGame(teamA, teamB, rng) {
  const a = getTeamStandingEntry(teamA);
  const b = getTeamStandingEntry(teamB);
  if (!a || !b) return;
  const aPower = Math.max(1, Number(a.power) || 1);
  const bPower = Math.max(1, Number(b.power) || 1);
  const aScore = Math.max(45, Math.round(62 + (aPower - bPower) / 180 + rng() * 24));
  const bScore = Math.max(45, Math.round(62 + (bPower - aPower) / 180 + rng() * 24));
  if (aScore === bScore) {
    if (rng() > 0.5) applyGameResultToStandings(teamA, teamB, 1);
    else applyGameResultToStandings(teamB, teamA, 1);
    return;
  }
  if (aScore > bScore) applyGameResultToStandings(teamA, teamB, aScore - bScore);
  else applyGameResultToStandings(teamB, teamA, bScore - aScore);
}

function makeBoxScore(state) {
  return {
    homeTeam:state.homeTeam,
    awayTeam:state.awayTeam,
    homeScore:state.scores.home,
    awayScore:state.scores.away,
    periods:state.period,
    teams:{
      home:state.teams.home.players.map(boxPlayerLine),
      away:state.teams.away.players.map(boxPlayerLine)
    }
  };
}

function boxPlayerLine(p) {
  return {
    name:p.name,
    pos:p.position,
    pts:p.box.pts,
    fgm:p.box.fgm,
    fga:p.box.fga,
    threePm:p.box.threePm,
    threePa:p.box.threePa,
    ast:p.box.ast
  };
}

function formatPossessionFeed(state, teamName, result) {
  const clock = formatClock(state.clock);
  const period = getPeriodLabel(state.period);
  const shot = result.shotValue === 3 ? '3PT' : '2PT';
  const pass = result.passer ? `${result.passer.name} ${result.passQuality} pass to ` : '';
  const outcome = result.made ? `made ${shot}` : `missed ${shot}`;
  return `${period} ${clock} - ${teamName}: ${pass}${result.player.name} ${outcome} (${result.action}).`;
}

function addGameFeed(state, text) {
  state.feed.unshift(text);
  state.feed = state.feed.slice(0, 40);
}

function renderGameScreen() {
  if (!activeGame) return;
  document.getElementById('game-matchup-label').textContent = `${activeGame.awayTeam} AT ${activeGame.homeTeam}`;
  document.getElementById('game-away-name').textContent = activeGame.awayTeam;
  document.getElementById('game-home-name').textContent = activeGame.homeTeam;
  document.getElementById('game-away-score').textContent = activeGame.scores.away;
  document.getElementById('game-home-score').textContent = activeGame.scores.home;
  document.getElementById('game-period-label').textContent = getPeriodLabel(activeGame.period);
  document.getElementById('game-clock-label').textContent = formatClock(activeGame.clock);
  const status = activeGame.weekSimInProgress ? 'SIMMING WEEK' : activeGame.superSimRemaining > 1 && !activeGame.complete ? 'SUPER SIM' : activeGame.complete ? 'FINAL' : activeGame.paused ? 'PAUSED' : 'SIMULATING';
  document.getElementById('game-status-label').textContent = status;
  document.getElementById('game-pause-btn').textContent = activeGame.paused ? 'RESUME' : 'PAUSE';
  document.getElementById('game-pause-btn').disabled = activeGame.complete;
  document.getElementById('game-speed-btn').disabled = activeGame.complete;
  document.getElementById('game-speed-btn').textContent = `SPEED ${[1, 4, 12][activeGame.speedIndex]}X`;
  document.getElementById('game-feed').innerHTML = activeGame.feed.map(line => `<div class="game-feed-line">${escapeAttr(line)}</div>`).join('');
  document.getElementById('game-week-sim-loading').classList.toggle('show', !!activeGame.weekSimInProgress);
  document.getElementById('game-finished-actions').classList.toggle('show', activeGame.complete && !activeGame.weekSimInProgress);
}

function continueAfterGame() {
  activeGame = null;
  goToDashboard();
}

function showBoxScore() {
  if (!lastBoxScore) {
    try {
      lastBoxScore = JSON.parse(sessionStorage.getItem('lastBoxScore') || 'null');
    } catch (err) {
      lastBoxScore = null;
    }
  }
  if (!lastBoxScore) return;
  renderBoxScore();
  flash(() => showPanel('box'));
}

function renderBoxScore() {
  const box = lastBoxScore;
  document.getElementById('box-title').textContent = 'BOX SCORE';
  document.getElementById('box-summary').textContent = `${box.awayTeam} ${box.awayScore} - ${box.homeTeam} ${box.homeScore}${box.periods > 4 ? ` (${box.periods - 4}OT)` : ''}`;
  document.getElementById('box-grid').innerHTML =
    renderBoxTeam(box.awayTeam, box.teams.away) +
    renderBoxTeam(box.homeTeam, box.teams.home);
}

function renderBoxTeam(teamName, players) {
  const sorted = [...players].sort((a, b) => b.pts - a.pts || a.name.localeCompare(b.name));
  return `
    <div class="box-team-panel">
      <div class="box-team-title">${escapeAttr(teamName)}</div>
      <div class="box-row header"><div>PLAYER</div><div>PTS</div><div>FG</div><div>3PT</div><div>AST</div><div>POS</div></div>
      ${sorted.map(p => `
        <div class="box-row">
          <div><strong>${escapeAttr(p.name)}</strong></div>
          <div>${p.pts}</div>
          <div>${p.fgm}-${p.fga}</div>
          <div>${p.threePm}-${p.threePa}</div>
          <div>${p.ast}</div>
          <div>${escapeAttr(p.pos || '')}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function getPeriodLabel(period) {
  return period <= 4 ? `Q${period}` : `OT${period - 4}`;
}

function formatClock(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

function average(values) {
  const nums = values.filter(v => Number.isFinite(Number(v))).map(Number);
  return nums.length ? sum(nums) / nums.length : 0;
}

function weightedChoice(items, weightFn) {
  if (!items.length) return null;
  const weights = items.map(item => Math.max(0, Number(weightFn(item)) || 0));
  const total = sum(weights);
  if (total <= 0) return randomChoice(items);
  let roll = Math.random() * total;
  for (let i = 0; i < items.length; i++) {
    roll -= weights[i];
    if (roll <= 0) return items[i];
  }
  return items[items.length - 1];
}

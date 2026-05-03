/*
  Gameplay simulation rules.

  Edit this file when you want to tune:
  - game length and overtime flow
  - possession timing by tempo
  - player/action selection
  - shot, drive, post, and pass resolution
  - live game feed and box score output
*/

const SIM_TRACE_ENABLED = false;

function simTrace(label, data = {}) {
  if (!SIM_TRACE_ENABLED || typeof console === 'undefined') return;
  const scheduleLength = (cachedSchedule || []).length;
  console.log('[SIM TRACE]', label, {
    season:Number(typeof seasonNumber !== 'undefined' ? seasonNumber : 1) || 1,
    currentGameIndex:typeof currentGameIndex !== 'undefined' ? currentGameIndex : null,
    scheduleLength,
    gamesRemaining:scheduleLength - (typeof currentGameIndex !== 'undefined' ? currentGameIndex : 0),
    activeGameComplete:!!(activeGame && activeGame.complete),
    activeWeekSim:!!(activeGame && activeGame.weekSimInProgress),
    activeSuperSimRemaining:activeGame ? activeGame.superSimRemaining : null,
    ...data
  });
}

function simTraceError(label, err, data = {}) {
  if (typeof console === 'undefined') return;
  console.error('[SIM TRACE ERROR]', label, {
    message:err && err.message,
    stack:err && err.stack,
    ...data
  });
}

function startGameSimulation(fastFinish) {
  const game = cachedSchedule ? cachedSchedule[currentGameIndex] : null;
  simTrace('startGameSimulation:enter', { fastFinish:!!fastFinish, game });
  if (!game) {
    simTrace('startGameSimulation:no-game');
    return;
  }
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

function prepareGameSoundtrack(audio) {
  audio.loop = true;
  if (audio.dataset.loopFallbackBound) return;
  audio.addEventListener('ended', () => {
    audio.currentTime = 0;
    const replayPromise = audio.play();
    if (replayPromise && typeof replayPromise.catch === 'function') {
      replayPromise.catch(err => console.warn('Soundtrack replay failed:', err));
    }
  });
  audio.dataset.loopFallbackBound = 'true';
}

function playGameSoundtrack() {
  const audio = document.getElementById('game-soundtrack');
  if (!audio) return;
  prepareGameSoundtrack(audio);
  audio.dataset.userStarted = '1';
  if (typeof Music !== 'undefined') {
    if (Music.isMuted()) return;
    if (typeof Music.start === 'function') {
      Music.start();
      return;
    }
    audio.volume = Music.getVolume();
  }
  if (!audio.paused && !audio.ended) return;
  const playPromise = audio.play();
  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch(err => {
      console.warn('Soundtrack play failed:', err);
      audio.currentTime = 0;
      audio.load();
    });
  }
}

function startMultiGameSuperSim(count) {
  const remainingGames = (cachedSchedule || []).length - currentGameIndex;
  simTrace('startMultiGameSuperSim:enter', { requestedCount:count, remainingGames });
  if (remainingGames <= 0) {
    simTrace('startMultiGameSuperSim:no-games');
    return;
  }
  const gamesToSim = Math.max(1, Math.min(Number(count) || 1, remainingGames));
  ensureDefaultGameplanSaved();
  stopGameTimer();
  activeGame = createGameState(cachedSchedule[currentGameIndex]);
  activeGame.superSimRemaining = gamesToSim;
  simTrace('startMultiGameSuperSim:activeGame-created', { gamesToSim, scheduleGame:activeGame.scheduleGame });
  renderGameScreen();
  flash(() => {
    showPanel('game');
    renderGameScreen();
    simTrace('startMultiGameSuperSim:calling-simGameToEnd');
    simGameToEnd();
  });
}

function createGameState(scheduleGame) {
  const userRoster = typeof getTeamRoster === 'function' ? getTeamRoster(selectedConf, selectedTeam) : (((allRosters || {})[selectedConf] || {})[selectedTeam] || []);
  const oppConf = getTeamConf(scheduleGame.opponent) || selectedConf;
  const oppRoster = typeof getTeamRoster === 'function' ? getTeamRoster(oppConf, scheduleGame.opponent) : ((((allRosters || {})[oppConf] || {})[scheduleGame.opponent]) || []);
  const finalOppRoster = oppRoster.length ? oppRoster : generateTeamRoster((((TEAM_DATA[oppConf] || {})[scheduleGame.opponent] || {}).o || 70), getFallbackNamePool());
  const homeTeam = scheduleGame.home ? selectedTeam : scheduleGame.opponent;
  const awayTeam = scheduleGame.home ? scheduleGame.opponent : selectedTeam;
  const userSide = scheduleGame.home ? 'home' : 'away';
  const opponentSide = scheduleGame.home ? 'away' : 'home';
  const awayPenalty = getAwayGameOverallPenalty(awayTeam, homeTeam);
  const homeCourtMultiplier = getConferenceHomeCourtMultiplier(scheduleGame, homeTeam);
  const state = {
    scheduleGame,
    homeTeam,
    awayTeam,
    userSide,
    opponentSide,
    period:1,
    clock:15 * 60,
    scores:{ home:0, away:0 },
    teams:{},
    feed:[],
    paused:false,
    speedIndex:0,
    complete:false,
    homeCourtMultiplier,
    possessionSide:scheduleGame.home ? 'home' : 'away'
  };
  state.teams[userSide] = buildSimTeam(selectedTeam, userRoster, gameplan, true, selectedTeam === awayTeam ? awayPenalty : 0);
  state.teams[opponentSide] = buildSimTeam(scheduleGame.opponent, finalOppRoster, buildOpponentGameplan(scheduleGame.opponent, oppConf, finalOppRoster), false, scheduleGame.opponent === awayTeam ? awayPenalty : 0);
  addGameFeed(state, `Tipoff: ${state.awayTeam} at ${state.homeTeam}.`);
  return state;
}

function createLeagueGameState(leagueGame, rng = Math.random) {
  const homeTeam = leagueGame.home;
  const awayTeam = leagueGame.away;
  const homeConf = getTeamConf(homeTeam);
  const awayConf = getTeamConf(awayTeam);
  const homeRoster = typeof getTeamRoster === 'function' ? getTeamRoster(homeConf, homeTeam) : [];
  const awayRoster = typeof getTeamRoster === 'function' ? getTeamRoster(awayConf, awayTeam) : [];
  const awayPenalty = getAwayGameOverallPenalty(awayTeam, homeTeam, rng);
  const state = {
    scheduleGame:leagueGame,
    homeTeam,
    awayTeam,
    userSide:null,
    opponentSide:null,
    period:1,
    clock:15 * 60,
    scores:{ home:0, away:0 },
    teams:{},
    feed:[],
    paused:false,
    speedIndex:0,
    complete:false,
    backgroundSim:true,
    homeCourtMultiplier:getConferenceHomeCourtMultiplier(leagueGame, homeTeam, rng),
    possessionSide:'home'
  };
  state.teams.home = buildSimTeam(homeTeam, homeRoster, buildOpponentGameplan(homeTeam, homeConf, homeRoster), false, 0);
  state.teams.away = buildSimTeam(awayTeam, awayRoster, buildOpponentGameplan(awayTeam, awayConf, awayRoster), false, awayPenalty);
  return state;
}

function createTournamentGameState(teamA, teamB, rng = Math.random) {
  const rosterA = typeof getTeamRoster === 'function' ? getTeamRoster(teamA.conf, teamA.team) : [];
  const rosterB = typeof getTeamRoster === 'function' ? getTeamRoster(teamB.conf, teamB.team) : [];
  const state = {
    scheduleGame:{ date:'TOURNAMENT', home:teamA.team, away:teamB.team, isConf:false },
    homeTeam:teamA.team,
    awayTeam:teamB.team,
    userSide:null,
    opponentSide:null,
    period:1,
    clock:15 * 60,
    scores:{ home:0, away:0 },
    teams:{},
    feed:[],
    paused:false,
    speedIndex:0,
    complete:false,
    tournamentSim:true,
    homeCourtMultiplier:1,
    possessionSide:rng() > 0.5 ? 'home' : 'away'
  };
  state.teams.home = buildSimTeam(teamA.team, rosterA, buildOpponentGameplan(teamA.team, teamA.conf, rosterA), false, 0);
  state.teams.away = buildSimTeam(teamB.team, rosterB, buildOpponentGameplan(teamB.team, teamB.conf, rosterB), false, 0);
  return state;
}

function buildSimTeam(teamName, roster, plan, isUser, gameOverallPenalty = 0) {
  const rotation = ((plan || {}).rotation || []).filter(r => Number(r.minutes) > 0);
  const rotationNames = new Set(rotation.map(r => r.playerName));
  const activePlayers = roster.filter(p => rotationNames.has(p.name));
  const fallbackPlayers = roster.slice(0, 8);
  const players = (activePlayers.length ? activePlayers : fallbackPlayers).map((p, i) => ({
    ...applyTemporaryOverallPenalty(p, gameOverallPenalty),
    simMinutes:Number((rotation.find(r => r.playerName === p.name) || {}).minutes) || (i < 5 ? 24 : 8),
    box:{ pts:0, fgm:0, fga:0, threePm:0, threePa:0, ast:0, reb:0 }
  }));
  return {
    name:teamName,
    players,
    plan:plan || {},
    isUser
  };
}

function getTeamRatings(teamName) {
  const conf = getTeamConf(teamName);
  return ((TEAM_DATA[conf] || {})[teamName]) || {};
}

function getAwayGameOverallPenalty(awayTeam, homeTeam, rng = Math.random) {
  return 0;
}

function getConferenceHomeCourtMultiplier(scheduleGame, homeTeam, rng = Math.random) {
  return 1.03;
}

function applyTemporaryOverallPenalty(player, penalty) {
  if (!penalty) return player;
  const subtract = value => Math.max(25, Math.round((Number(value) || 25) - penalty));
  const adjusted = {
    ...player,
    overall:subtract(player.overall)
  };
  if (player.attributes) {
    adjusted.attributes = {};
    Object.entries(player.attributes).forEach(([key, value]) => {
      adjusted.attributes[key] = subtract(value);
    });
  }
  return adjusted;
}

function buildOpponentGameplan(teamName, conf, roster) {
  const style = typeof getTeamStyle === 'function' ? getTeamStyle(conf, teamName) : {};
  return {
    offensiveStyle:style.offensiveStyle || randomChoice(['Play through our star','Shoot threes','Get to the basket','Post up']),
    defensiveStyle:style.defensiveStyle || randomChoice(['Aggressive','Disciplined','Conservative','Limit Threes']),
    tempo:style.tempo || randomChoice(['Fast','Normal','Slow','Super Slow']),
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
  simTrace('simGameToEnd:enter');
  if (!activeGame || activeGame.complete) {
    simTrace('simGameToEnd:skip', { hasActiveGame:!!activeGame });
    return;
  }
  activeGame.paused = false;
  let guard = 0;
  while (!activeGame.complete && guard < 5000) {
    simulatePossession(activeGame);
    guard++;
  }
  simTrace('simGameToEnd:exit', {
    guard,
    complete:!!activeGame.complete,
    score:activeGame ? { ...activeGame.scores } : null,
    scheduleGame:activeGame ? activeGame.scheduleGame : null
  });
  if (activeGame && !activeGame.complete) {
    console.warn('[SIM TRACE]', 'simGameToEnd guard exhausted before game completed', {
      guard,
      period:activeGame.period,
      clock:activeGame.clock,
      score:activeGame.scores,
      scheduleGame:activeGame.scheduleGame
    });
  }
  if (typeof Sfx !== 'undefined' && activeGame && activeGame.complete) Sfx.simDone();
  renderGameScreen();
}

function simulatePossession(state) {
  const offense = state.teams[state.possessionSide];
  const defenseSide = state.possessionSide === 'home' ? 'away' : 'home';
  const defense = state.teams[defenseSide];
  const seconds = getPossessionSeconds(offense.plan.tempo);
  state.clock = Math.max(0, state.clock - seconds);
  const homeOnOffense = state.possessionSide === 'home';
  const result = resolvePossession(offense, defense, homeOnOffense, state.homeCourtMultiplier);
  state.scores[state.possessionSide] += result.points;
  if (!result.made) assignRebound(defense, result);
  addGameFeed(state, formatPossessionFeed(state, offense.name, result));
  if (state.clock <= 0) advanceGamePeriod(state);
  state.possessionSide = defenseSide;
}

function getPossessionSeconds(tempo) {
  if (tempo === 'Fast') return randInt(8, 15);
  if (tempo === 'Slow' || tempo === 'Super Slow') return randInt(19, 24);
  return randInt(14, 17);
}

function resolvePossession(offense, defense, homeOnOffense, homeCourtMultiplier = 1) {
  const homeBoost = homeCourtMultiplier || 1;
  const ovmBoost = homeOnOffense ? homeBoost : 1;
  const dvmBoost = homeOnOffense ? 1 : homeBoost;
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
  return weightedChoice(pool, p => {
    const minutes = Math.max(1, Number(p.simMinutes) || 1);
    const overall = Math.max(35, Number(p.overall) || 70);
    const starBoost = p === star && team.plan.offensiveStyle === 'Play through our star' ? 1.35 : 1;
    return minutes * Math.pow(overall / 70, 2.2) * starBoost;
  });
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

function assignRebound(defense, result) {
  const rebounder = chooseRebounder(defense);
  if (!rebounder || !rebounder.box) return;
  rebounder.box.reb++;
  result.rebounder = rebounder;
}

function chooseRebounder(team) {
  if (!team || !team.players || !team.players.length) return null;
  const weights = { PG:0.55, SG:0.7, SF:1, PF:1.35, C:1.55 };
  return weightedChoice(team.players, p => {
    const posWeight = weights[p.position] || 1;
    return Math.max(1, ((p.attributes || {}).defense || p.overall || 70) * posWeight);
  });
}

function advanceGamePeriod(state) {
  if (state.period >= 2 && state.scores.home !== state.scores.away) {
    finishGame(state);
    return;
  }
  state.period++;
  state.clock = state.period <= 2 ? 15 * 60 : 5 * 60;
  if (state.period === 3) addGameFeed(state, 'Regulation ends tied. Overtime begins.');
  else if (state.period > 3) addGameFeed(state, `Still tied. OT${state.period - 2} begins.`);
  else addGameFeed(state, `End of period. ${getPeriodLabel(state.period)} begins.`);
}

function finishGame(state) {
  if (state.resultApplied) return;
  if (state.tournamentSim) {
    finishTournamentGame(state);
    return;
  }
  if (state.backgroundSim) {
    finishBackgroundGame(state);
    return;
  }
  simTrace('finishGame:enter', {
    scheduleGame:state.scheduleGame,
    homeTeam:state.homeTeam,
    awayTeam:state.awayTeam,
    score:{ ...state.scores },
    superSimRemaining:state.superSimRemaining
  });
  state.complete = true;
  state.paused = true;
  state.weekSimInProgress = true;
  stopGameTimer();
  const winnerSide = state.scores.home > state.scores.away ? 'home' : 'away';
  const loserSide = winnerSide === 'home' ? 'away' : 'home';
  const margin = Math.abs(state.scores.home - state.scores.away);
  applyGameResultToStandings(state[`${winnerSide}Team`], state[`${loserSide}Team`], margin, !!state.scheduleGame.isConf);
  state.resultApplied = true;
  state.scheduleGame.result = {
    homeScore:state.scores.home,
    awayScore:state.scores.away
  };
  const lgGame = findLeagueGame(state.scheduleGame.date, state.homeTeam, state.awayTeam);
  const statGameId = typeof getStatGameId === 'function' ? getStatGameId(state.scheduleGame.date, state.homeTeam, state.awayTeam) : '';
  if (lgGame) {
    lgGame.result = {
      homeScore:state.scores.home,
      awayScore:state.scores.away
    };
    saveLeagueSchedule();
  }
  simTrace('finishGame:league-result-saved', { hasLeagueGame:!!lgGame, statGameId });
  saveCachedSchedule();
  lastBoxScore = makeBoxScore(state);
  if (typeof addBoxScoreToPlayerStats === 'function') addBoxScoreToPlayerStats(lastBoxScore, statGameId);
  if (lgGame) {
    lgGame.statsRecorded = true;
    saveLeagueSchedule();
  }
  saveGameJSON('lastBoxScore', lastBoxScore);
  currentGameIndex = Math.min(currentGameIndex + 1, (cachedSchedule || []).length);
  simTrace('finishGame:index-advanced', {
    nextGame:cachedSchedule ? cachedSchedule[currentGameIndex] : null,
    result:state.scheduleGame.result
  });
  addGameFeed(state, `Final: ${state.awayTeam} ${state.scores.away}, ${state.homeTeam} ${state.scores.home}.`);
  renderGameScreen();
  simTrace('finishGame:starting-remainder-week');
  startRemainderWeekSimulation(state);
}

function finishTournamentGame(state) {
  state.complete = true;
  state.paused = true;
  state.resultApplied = true;
  state.scheduleGame.result = {
    homeScore:state.scores.home,
    awayScore:state.scores.away
  };
}

function finishBackgroundGame(state) {
  state.complete = true;
  state.paused = true;
  const winnerSide = state.scores.home > state.scores.away ? 'home' : 'away';
  const loserSide = winnerSide === 'home' ? 'away' : 'home';
  const margin = Math.abs(state.scores.home - state.scores.away);
  applyGameResultToStandings(state[`${winnerSide}Team`], state[`${loserSide}Team`], margin, !!state.scheduleGame.isConf);
  state.resultApplied = true;
  state.scheduleGame.result = {
    homeScore:state.scores.home,
    awayScore:state.scores.away
  };
  const statGameId = typeof getStatGameId === 'function' ? getStatGameId(state.scheduleGame.date, state.homeTeam, state.awayTeam) : '';
  if (typeof addBoxScoreToPlayerStats === 'function') addBoxScoreToPlayerStats(makeBoxScore(state), statGameId);
  state.scheduleGame.statsRecorded = true;
}

function startRemainderWeekSimulation(state) {
  simTrace('startRemainderWeekSimulation:scheduled', {
    completedScheduleGame:state.scheduleGame,
    superSimRemaining:state.superSimRemaining
  });
  setTimeout(() => {
    try {
      simTrace('startRemainderWeekSimulation:timeout-fired', {
        completedScheduleGame:state.scheduleGame,
        superSimRemaining:state.superSimRemaining
      });
      const count = simulateRemainderWeekGames(state.scheduleGame);
      simTrace('startRemainderWeekSimulation:remainder-complete', { count });
      state.weekSimInProgress = false;
      addGameFeed(state, `Remainder of the week complete: ${count} games simulated.`);
      if (state.superSimRemaining > 1 && currentGameIndex < (cachedSchedule || []).length) {
        state.superSimRemaining -= 1;
        simTrace('startRemainderWeekSimulation:continue-super-sim', {
          nextRemaining:state.superSimRemaining,
          nextGame:cachedSchedule ? cachedSchedule[currentGameIndex] : null
        });
        startNextSuperSimGame(state.superSimRemaining);
        return;
      }
      simTrace('startRemainderWeekSimulation:render-final-actions');
      renderGameScreen();
    } catch (err) {
      simTraceError('startRemainderWeekSimulation:failed', err, {
        completedScheduleGame:state.scheduleGame,
        superSimRemaining:state.superSimRemaining,
        currentGameIndex,
        nextGame:cachedSchedule ? cachedSchedule[currentGameIndex] : null
      });
      throw err;
    }
  }, 650);
}

function startNextSuperSimGame(remaining) {
  simTrace('startNextSuperSimGame:enter', {
    remaining,
    nextGame:cachedSchedule ? cachedSchedule[currentGameIndex] : null
  });
  activeGame = createGameState(cachedSchedule[currentGameIndex]);
  activeGame.superSimRemaining = remaining;
  addGameFeed(activeGame, `Super sim continues: ${remaining} game${remaining === 1 ? '' : 's'} left including this one.`);
  simTrace('startNextSuperSimGame:activeGame-created', {
    scheduleGame:activeGame.scheduleGame,
    homeTeam:activeGame.homeTeam,
    awayTeam:activeGame.awayTeam
  });
  renderGameScreen();
  setTimeout(() => {
    simTrace('startNextSuperSimGame:calling-simGameToEnd', {
      scheduleGame:activeGame ? activeGame.scheduleGame : null
    });
    simGameToEnd();
  }, 250);
}

function simulateRemainderWeekGames(scheduleGame) {
  simTrace('simulateRemainderWeekGames:enter', { scheduleGame });
  ensureStandingsState();
  ensureLeagueSchedule();
  const date = scheduleGame.date;
  const weekKey = date || `GAME-${currentGameIndex}`;
  if (standingsState.weeksSimmed && standingsState.weeksSimmed[weekKey]) {
    simTrace('simulateRemainderWeekGames:already-simmed', { weekKey });
    return 0;
  }
  const games = (leagueSchedule && leagueSchedule.byDate && leagueSchedule.byDate[date])
    ? leagueSchedule.byDate[date]
    : [];
  simTrace('simulateRemainderWeekGames:games-loaded', { date, weekKey, totalGames:games.length });
  const rng = mulberry32(strHash(`${seasonNumber || 1}|${date}|league-week`));
  let count = 0;
  for (const g of games) {
    if (g.home === selectedTeam || g.away === selectedTeam) continue;
    const gameId = typeof getStatGameId === 'function' ? getStatGameId(date, g.home, g.away) : '';
    if (g.result) {
      simTrace('simulateRemainderWeekGames:existing-result', {
        date,
        home:g.home,
        away:g.away,
        statsRecorded:!!g.statsRecorded,
        result:g.result
      });
      if (!g.statsRecorded && typeof addSyntheticGameToPlayerStats === 'function' && Number.isFinite(g.result.homeScore) && Number.isFinite(g.result.awayScore)) {
        addSyntheticGameToPlayerStats(g.home, g.away, g.result.homeScore, g.result.awayScore, rng, gameId);
        g.statsRecorded = true;
      }
      continue;
    }
    simTrace('simulateRemainderWeekGames:background-start', {
      date,
      home:g.home,
      away:g.away,
      gameId,
      countBefore:count
    });
    try {
      simulateBackgroundGame(g, rng, gameId);
    } catch (err) {
      simTraceError('simulateRemainderWeekGames:background-failed', err, {
        date,
        home:g.home,
        away:g.away,
        gameId
      });
      throw err;
    }
    simTrace('simulateRemainderWeekGames:background-done', {
      date,
      home:g.home,
      away:g.away,
      result:g.result
    });
    count++;
  }
  standingsState.weeksSimmed[weekKey] = count;
  simTrace('simulateRemainderWeekGames:standings-week-marked', { weekKey, count });
  saveGameJSON(getStandingsStateKey(), standingsState);
  saveLeagueSchedule();
  const offseasonEnabled = typeof areOffseasonFeaturesEnabled !== 'function' || areOffseasonFeaturesEnabled();
  simTrace('simulateRemainderWeekGames:cpu-recruiting-check', {
    offseasonEnabled,
    hasCPURecruiting:typeof simulateCPURecruitingWeek === 'function',
    weekKey
  });
  if (offseasonEnabled && typeof simulateCPURecruitingWeek === 'function') {
    try {
      simulateCPURecruitingWeek(weekKey);
      simTrace('simulateRemainderWeekGames:cpu-recruiting-done', { weekKey });
    } catch (err) {
      simTraceError('simulateRemainderWeekGames:cpu-recruiting-failed', err, { weekKey });
      throw err;
    }
  }
  simTrace('simulateRemainderWeekGames:exit', { weekKey, count });
  return count;
}

function simulateBackgroundGame(leagueGame, rng = Math.random) {
  if (!leagueGame) return null;
  return withRandomSource(rng, () => {
    simTrace('simulateBackgroundGame:enter', { leagueGame });
    const state = createLeagueGameState(leagueGame, rng);
    let guard = 0;
    while (!state.complete && guard < 5000) {
      simulatePossession(state);
      guard++;
    }
    if (!state.complete) {
      console.warn('[SIM TRACE]', 'simulateBackgroundGame guard exhausted before game completed', {
        guard,
        leagueGame,
        period:state.period,
        clock:state.clock,
        score:state.scores
      });
    }
    simTrace('simulateBackgroundGame:exit', {
      leagueGame,
      guard,
      complete:state.complete,
      result:state.scheduleGame.result || null
    });
    return state.scheduleGame.result || null;
  });
}

function withRandomSource(rng, fn) {
  const previousRandom = Math.random;
  Math.random = rng;
  try {
    return fn();
  } finally {
    Math.random = previousRandom;
  }
}

function makeBoxScore(state) {
  return {
    date:state.scheduleGame.date,
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
    ast:p.box.ast,
    reb:p.box.reb
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
      lastBoxScore = loadGameJSON('lastBoxScore');
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
  document.getElementById('box-summary').textContent = `${box.awayTeam} ${box.awayScore} - ${box.homeTeam} ${box.homeScore}${box.periods > 2 ? ` (${box.periods - 2}OT)` : ''}`;
  document.getElementById('box-grid').innerHTML =
    renderBoxTeam(box.awayTeam, box.teams.away) +
    renderBoxTeam(box.homeTeam, box.teams.home);
}

function renderBoxTeam(teamName, players) {
  const sorted = [...players].sort((a, b) => b.pts - a.pts || a.name.localeCompare(b.name));
  return `
    <div class="box-team-panel">
      <div class="box-team-title">${escapeAttr(teamName)}</div>
      <div class="box-row header"><div>PLAYER</div><div>PTS</div><div>FG</div><div>3PT</div><div>AST</div><div>REB</div></div>
      ${sorted.map(p => `
        <div class="box-row">
          <div><strong>${escapeAttr(p.name)}</strong></div>
          <div>${p.pts}</div>
          <div>${p.fgm}-${p.fga}</div>
          <div>${p.threePm}-${p.threePa}</div>
          <div>${p.ast}</div>
          <div>${p.reb || 0}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function getPeriodLabel(period) {
  return period <= 2 ? `H${period}` : `OT${period - 2}`;
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

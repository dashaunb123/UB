Original prompt: track records for conference play, in the standings, make it so you can look at national standings or conference standings which will be by conference record

Progress:
- Added conference wins/losses to standings state and migrated existing saves.
- Wired game results to increment conference records only when the scheduled game is marked as a conference game.
- Added standings controls for national rankings versus conference standings.
- Added conference tournaments before the national tournament, including byes for uneven conference sizes and a winners page.
- Conference tournament champions are protected as automatic bids in the 64-team national tournament field.
- Added a bracket-review step for the user's own conference tournament before the all-winners page.
- Changed conference tournament flow so the user's conference has national-tournament-style simulate round/tournament controls, while other conferences reveal only final results one by one.
- Updated gameplan rotation so the highest-overall player at each position is automatically shown as the starter, manual starter changes are not exposed, and the plus button transfers one same-position minute from another player.
- Reworked weekly transfer portal advancement to show a progress bar, process CPU teams in small chunks first, then resolve only players with fulfillable offers.
- Added a progress screen for the initial post-retention transfer portal setup while CPU teams create first-week portal offers.

TODO:
- User should hard refresh before testing to ensure the browser is not running a cached script.
- Settings/theme pass: added shared CSS theme variables, broad themed overrides for common UI panels/buttons/rows/text, and canvas repaint hooks for border/court/hoops/dashboard scene when theme changes.
- Settings/music pass: changed music unmute to actively start/resume the soundtrack from the settings click instead of depending on prior autoplay state.
- Power Index balancing pass: standings now store season-start `basePower` and a per-game resume log, then recompute visible Power Index from base strength, opponent quality, margins, record, and schedule strength instead of letting weak wins stack unlimited incremental boosts. Standings rows now show `PI`.
- Super sim pass: dashboard super sim now runs silently behind the existing progress overlay with `SIMULATING GAMES` and `X / Y`, chunks CPU week simulation with async yields, avoids showing game scores/feed, and returns to dashboard when complete.
- Power Index performance fix: standings updates are now batched during CPU week sims and super-sim runs, so full Power Index recompute/storage writes happen once per batch instead of once per CPU game. League schedule resume rebuild is cached by result signature.
- Save file startup fix: `recruitingRunId` now loads after save-slot constants/functions initialize, preventing the home screen script from aborting before `PRESS START`/keyboard input handlers are live.
- Save file persistence pass: quick/manual saves now snapshot season, screen/stage, schedule, standings, roster, portal/offseason state, conference tournaments, and the national tournament bracket. Resume now restores saved season and returns to tournament/prestige/departures/portal screens instead of always going to dashboard.
- Coach hair options reduced to Dreads Tied, Bald, Twists, Curly, and Flat Top. Added Curly rendering and normalized old saved coach hair values to the first supported option.
- Standings UI no longer shows Power Index, and the gameplan/coaching style panel no longer displays saved coach press responses under the dropdowns.
- Hidden gameplay energy added: players start each game at 100 energy, lose/regain energy by on-court/bench time, receive quarter/half recovery bonuses, and use energy-adjusted attributes during pass, shot, defense, and rebound resolution.
- Possession initiators now lose one additional hidden energy point each play they are selected to run the offense.
- Fixed offseason training next-season flow by wiring the OFFSEASON TRAINING screen's NEXT SEASON button to `finishOffseasonTraining()` instead of returning to prestige update.
- Updated the portal `OFFSEASON TRAINING` button to run offseason training and immediately advance/reset into the next season dashboard, removing the extra training review step from that path.
- Fixed the portal offseason training transition so it no longer saves closed portal/roster data or clears recruiting data before the season reset; failures now leave a `TRY AGAIN` button and log the real transition error.
- Added national tournament state normalization so completed games with scores but missing winners/champion are repaired on load/render, fixing brackets that stopped after the title game without showing Continue.
- Removed the remaining-conference explanatory subtitle during conference tournament simulation and removed the `OTHER CONFERENCE` label from non-user conference cards.
- Added transfer portal signing reveal popups after week simulation, with a queued confetti/headshot/basic-info card for each newly signed user transfer.
- Added national tournament debug logging for round/tournament simulation, playable game discovery, game start/end, winner advancement, guard-limit hits, and stuck/no-playable-game states. Browser logs are mirrored to the local Node server terminal via `/debug-log`.
- Added an Auto Recruiting settings toggle. When enabled, the user's team is included in the normal CPU recruiting offer/signing loop and uses the same weekly recruiting behavior as other CPU teams.
- Fixed national tournament freezes caused by localStorage quota errors: tournament state now saves in a compact format, save failures are non-fatal to the simulation queue, and server debug POST mirroring is gated behind `window.UB_SERVER_DEBUG` to avoid unsupported-method console spam on non-Node servers.
- Fixed transfer portal immediate signings so SEND OFFER / soft sell / hard sell acceptances now trigger the confetti signing reveal. Transfer portal saves now use a compact format, preserve portal hours with the portal state, and still load older full portal saves.
- Fixed auto-recruiting NIL accounting: user-team CPU-style recruiting offers now reserve NIL budget, and auto commitments store/count their committed deal amount even after active offers are cleaned up.
- Changed signed-by-your-team lists into `SIGNED` toggle buttons beside Bookmarks/Class Rankings in both recruiting and the transfer portal.
- Signed recruits and transfers now reveal overall and potential immediately when they join the user's team; older signed entries are revealed when shown in the signed filter.
- Added a coach office entry from the dashboard coach panel, including hover/focus `ENTER OFFICE` prompt, transition animation, office scene, and career history totals/season summaries saved per save slot.
- Updated CPU transfer portal behavior so teams pull offers when they are outside a player's top five CPU offers and redirect toward less-contested players.
- Fixed offseason retention routing so the departures screen opens the pay/portal decision list first, and only the retention screen's `FINISH RETENTION` button auto-portals undecided players.
- Added CPU transfer portal position caps so each team can have at most two active offers per position; offering a better same-position target requires pulling the weakest existing offer first.
- Converted shipped `teams.js` conference/team names to generic labels and added a settings JSON uploader/reset for custom name packs. Created `custom-team-names.example.json` from the previous full name list.
- Removed the custom roster uploader and generated roster JSON files after the source roster data was found inaccurate; custom name packs remain supported.
- Restored `teams.js` and `custom-team-names.example.json` to the original 365-team structure and original prestige/NIL/overall values after the bad roster import had overwritten overalls.
- Added AD resource-choice effects: choosing NIL Fund stores a one-season $500K NIL boost, while choosing Scouts fully scouts 20% of the generated freshman recruiting class by revealing ratings and motivations.

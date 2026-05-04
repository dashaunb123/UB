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

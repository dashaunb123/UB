Original prompt: track records for conference play, in the standings, make it so you can look at national standings or conference standings which will be by conference record

Progress:
- Added conference wins/losses to standings state and migrated existing saves.
- Wired game results to increment conference records only when the scheduled game is marked as a conference game.
- Added standings controls for national rankings versus conference standings.

TODO:
- User should hard refresh before testing to ensure the browser is not running a cached script.

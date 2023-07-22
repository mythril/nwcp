# VaultDweller Character Planner

Overall goals:

- Keep the built site small, < 1mb
- No bitmap images if possible, sprite-sheet style if they are necessary, lossy limited palette (transparent mono-color webp)

### To do

- [ ] Try to figure out why worn-text image doesn't render sometimes
- [ ] Add age setter
- [ ] Add sex setter
- [ ] Add level up button
- [ ] reconsider screen orientation locking
- [ ] Refactor `/chosen-one` route into components for each section
- [ ] Refactor scss, maybe consider alternative tech with better minification
- [ ] See if you can reduce initial page-weight via help json splitting
- [ ] Figure out more modern way to convey invalid choices (bonk animation/noise for spinners, for example)
- [ ] Match tag / trait buttons better
- [ ] Extract push button and make it resizable
- [ ] Build an event sourced store, keeping track of the character development as a log instead of just mangling an object
- [ ] Make the first event: create character
- [ ] Build filter to add random blotchy grooves into the background
- [ ] Improve logo
- [ ] Add an about page
- [ ] Figure out UI to change between planners and about pages / whatever else is added in (escape menu?)
- [ ] Figure out a way for end users to preserve their character creations
  - third party storage services that the user can opt in to?
- [ ] Release source when the "Chosen One" planner is in a "better than nothing" state and some collaboration guidelines are in place
- [ ] Cache fullscreen filter image and rebuild/re-cache when page is resized

### Maybe

- [ ] Create an intro anim
- [ ] redirect to '/' when images are not yet generated
- [ ] Build an svg for 'screen' dialogs
- [ ] embed stylistically similar music
- [ ] play UI sounds
- [ ] figure out how to apply shaders to whole screen, so that we can abandon svg filters (and bring FF back in to the fold)
- [ ] embed this todo into the released site

### After first release

- [ ] Build post-creation (level up) interface
- [ ] Build basic, text based, item chooser
- [ ] Build perk chooser

### Done

- [x] Add name setter
- [x] Set up pre-commit hooks
- [x] Add 'help' info
- [x] De-wrap the main panel
- [x] speed up full screen filter and restore look to FF
- [x] speed up image generator and put in data URL fallback

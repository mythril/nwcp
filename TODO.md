# VaultDweller Character Planner

Overall goals:

- Keep the built site small, < 1mb
- No bitmap images if possible, sprite-sheet style if they are necessary, lossy limited palette (transparent mono-color webp)

### To do

- [ ] Add inert / other a11y features (mini dialogs need attention, use portals and body/document listeners)
- [ ] Refactor `/chosen-one` route into components for each section
- [ ] Refactor scss, maybe consider alternative tech with better minification
- [ ] See if you can reduce initial page-weight via help json splitting
- [ ] Make the first event: create character
- [ ] Figure out a way for end users to preserve their character creations
  - third party storage services that the user can opt in to?
- [ ] Release source when the "Chosen One" planner is in a "better than nothing" state and some collaboration guidelines are in place
- [ ] Cache full-screen filter image and rebuild/re-cache when page is resized
- [ ] Add an about page
- [ ] Redirect from base route to `/chosen-one` on temporary basis

### Visuals

- [ ] Match tag / trait buttons better
- [ ] Extract push button and make it resizable
- [ ] Improve look of sex setter buttons
- [ ] Build filter to add random blotchy grooves into the background
- [ ] Improve logo

### Maybe

- [ ] Create an intro anim
- [ ] redirect to '/' when images are not yet generated
- [ ] Build an svg for 'screen' dialogs
- [ ] embed stylistically similar music
- [ ] play UI sounds
- [ ] figure out how to apply shaders to whole screen, so that we can abandon svg filters (and bring FF back in to the fold)
- [ ] embed this todo into the released site

### After first release

- [ ] Figure out UI to change between planners and about pages / whatever else is added in (escape menu?)
- [ ] Add level up button
- [ ] Build an event sourced store, keeping track of the character development as a log instead of just mangling an object
- [ ] Build post-creation (level up) interface
- [ ] Build basic, text based, item chooser
- [ ] Build perk chooser

### Done

- [x] Figure out more modern way to convey invalid choices (bonk animation/noise for spinners, for example)
- [x] Try to figure out why worn-text image doesn't render sometimes
- [x] reconsider screen orientation locking
- [x] Add age setter
- [x] Add sex setter
- [x] Add name setter
- [x] Set up pre-commit hooks
- [x] Add 'help' info
- [x] De-wrap the main panel
- [x] speed up full screen filter and restore look to FF
- [x] speed up image generator and put in data URL fallback

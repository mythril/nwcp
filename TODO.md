# VaultDweller Character Planner

Overall goals:

- Keep the built site small, < 1mb
- No bitmap images if possible, sprite-sheet style if they are necessary, lossy limited palette (transparent mono-color webp)

### To do

- [ ] Fix modal anchoring when zooming in
- [ ] Figure out what is going on with worn-text cache and hard refresh
- [ ] Cache full-screen filter image and rebuild/re-cache when page is resized
- [ ] debug service worker quirks - firefox for 1, stickiness for 2
- [ ] Make the first event: create character
- [ ] Figure out a way for end users to preserve their character creations
  - third party storage services that the user can opt in to?
- [ ] Release source when the "Chosen One" planner is in a "better than nothing" state and some collaboration guidelines are in place
- [ ] Add an about page
- [ ] Build filter to add random blotchy, embossed grooves into the background
- [ ] Convert virtually everything to css grids / flexbox / (display)table instead of positioned elements (reduce un-needed stacking contexts)

### Visuals

- [ ] Match tag / trait buttons better
- [ ] Extract push button and make it resizable
- [ ] Improve look of sex setter buttons
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

- [ ] Refactor `/chosen-one` route into components for each section
- [ ] Figure out UI to change between planners and about pages / whatever else is added in (escape menu?)
- [ ] Add level up button
- [ ] Build an event sourced store, keeping track of the character development as a log instead of just mangling an object
- [ ] Build post-creation (level up) interface
- [ ] Build basic, text based, item chooser
- [ ] Build perk chooser

### Done

- [x] Factor screen effect into a component
- [x] Check inline TODOs
- [x] Add inert / other a11y features (mini dialogs need attention, use portals and body/document listeners)
- [x] Make background grain as large as the document
- [x] Figure out a way to adjust overlays on resize but not on zoom
- [x] Redirect from base route to `/chosen-one` on temporary basis
- [x] Refactor scss, maybe consider alternative tech with better minification
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

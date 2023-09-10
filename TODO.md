# Nuclear Wasteland Character Planner

Overall goals:

- Keep the built site small, < 1mb
- No bitmap images if possible, sprite-sheet style if they are necessary, lossy limited palette (transparent mono-color webp)

### To do

- [ ] build landing page
- [ ] implement lone wanderer logic
- [ ] implement courier logic
- [ ] write save/load integrity tests for each role type
- [ ] detect when embedded and reduce graphical fidelity / freeze input
- [ ] update help file with variances of traits
- [ ] factor out common character elements into mid-class
- [ ] internationalize: npm i i18next
- [ ] extract common subset out of RoleDisplay and Toast
- [ ] inspect on phone
- [ ] convert footer to position sticky, restore min-height 100vh on .app

### Maybe

- [ ] improve flat menu look
- [ ] Figure out a way to show currently hidden derived stats
- [ ] Improve paper background (has issues with resizing?)
- [ ] Release source when the planner is in a "better than nothing" state and some collaboration guidelines are in place
- [ ] Extract push button and make it resizable
- [ ] Include VB sprites?
- [ ] Create an intro anim
- [ ] redirect to '/' when images are not yet generated?
- [ ] Build an svg for 'screen' dialogs
- [ ] embed stylistically similar music
- [ ] embed this todo into the released site

### After first release

- [ ] consider file-save progressive enhancement
- [ ] get browser testing functioning, build a test to verify character linking
- [ ] Make the first event: create character
- [ ] Figure out UI to change between planners and about pages / whatever else is added in (escape menu?)
- [ ] Add level up button
- [ ] Build an event sourced / cqrs store, keeping track of the character development as a log instead of just mangling an object
- [ ] bit-pack the log format to attempt to keep builds linkable
- [ ] Build post-creation (level up) interface
- [ ] Build basic, text based, item chooser
- [ ] Build perk chooser
- [ ] automatically store characters in local storage
- [ ] allow user to select characters from local storage based on name

### Done

- [x] put a visual indicator of route changes (animated)
- [x] add automatic hash-state update to url
- [x] enable warrior Role
- [x] debug role chooser
- [x] add in Vault Dweller stat / trait / skill calculation
- [x] use setters to precalculate derived stats / prevent mis-rendered data
- [x] debug special/trait issues
- [x] add multi-game support to help system
- [x] debug role chooser
- [x] update https://discord.com/channels/457912077277855764/1143773994844180541 if you can figure out instance references
- [x] fix linking to character
- [x] Consider a real responsive design
- [x] Add an about page
- [x] fix anchor for modal editors
- [x] Escape should bring up options menu when nothing is already open
- [x] Escape should leave a modal if it has a clean way to leave
- [x] add a better confirm dialog
- [x] add a modal stack manager (sort of, added an event to solve the issue)
- [x] Restore done button with toast to let user know nothing implemented
- [x] "Level button" style toast should appear with some info
- [x] Save / load should be merged into options menu
- [x] Add difficulty selector
- [x] Match tag / trait buttons better (push state)
- [x] Build filter to add random blotchy color variation
- [x] Build filter to add embossed grooves into the background
- [x] come up with a better solution for managing character points
- [x] flesh out remaining derived stats
- [x] consider replacing anim lib with [css tweening](https://news.ycombinator.com/item?id=36442797) - big win, saved ~70k on build (down from 412k to 344k)
- [x] Figure out a way for end users to preserve their character creations
- [x] Improve look of sex setter buttons
- [x] Improve logo
- [x] re-scale UI to 640x480 style dimensions
- [x] Cache full-screen filter image and rebuild/re-cache when page is resized
- [x] improve shadows and highlights (check modals)
- [x] make validation errors propagate reactively
- [x] fix paper corruption on zoom (seems to only happen in dev)
- [x] fix reflow
- [x] see what can be converted to value binding
- [x] use types to enforce help entries, try Pick & some equality library
- [x] fix modals, flanges, char-points height?
- [x] re-format to 640x480 style
- [x] replace svelte spring with gsap or some high-quality animation library that doesn't stutter
- [x] fix osd keyboard
- [x] Fix modal anchoring when zooming in
- [x] add scroll in to view for modal anchoring
- [x] Fix grain scaling
- [x] Refactor `/chosen-one` route into components for each section
- [x] play UI sounds
- [x] figure out how to (nope) apply shaders to whole screen, so that we can abandon svg filters (and bring FF back in to the fold) or (yep) improve svg filter performance
- [x] debug service worker quirks
- [x] Figure out what is going on with worn-text cache and hard refresh
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

# Puzzled Pint 2019 Website Design Docs

# Prologue

## Motivation

The current website (as of early 2019) is based on a CMS called concrete5.  It has mostly served us well over the years, but it suffers from the same problem that every CMS suffers from, and that is we’ve developed repeated workflows that need automation to save us time, and they don’t really support that well.  Additionally, it’s showing its age in both the visual design, and compatibility with some firewalls.  It’s also somewhat difficult to update, as it’s based on a manual linux installation.

Several years ago, we addressed some of this using a Ruby on Rails Heroku instance that took care of event and location management for Game Control.  Again, this was a great improvement, as it allowed GC to directly enter locations, and export that list to the main website.  Unfortunately, that too suffers from some technical issues with firewalls, but more importantly, design time and complexity for adding new features has proven significant.  As, the popularity of Rails has been steadily dropping over the past nine years, it’s becoming more difficult to integrate new technology (like google maps), to its backend-focused architecture.  

Therefore, we’ve begun work on a new site, using leading-edge (bleeding edge?) modern architecture.  This one won’t be as much a traditional informational-only web site, as it is more an online web application meant to manage our data flow month to month for players, GC, and headquarters.

## Design Goals

- Think of good user experiences for each type of user visiting the site.  All information should be obtainable within 4 clicks!  See the UX section below.
- Distribute tasks as much as possible.  We want to avoid single people with the knowledge and capability to update the site.  Rather, we want to make the tools usable enough so that anyone can update their portions of the site, in an easy and efficient way. We want to automate the data flow from our volunteers, authors, and players directly into the site (in a secure way).
- Make use of modern tools.  We want this last, so the latest technology is being adopted.  Building on top of modern platforms give us a significant set of capabilities that didn’t exist a decade ago.  For example, the Google Mapping API lets GC enter locations by name.  The Drive SDK allows us to manage puzzle revisions, peek inside PDFs for data, search them, and even repackage PDFs on-the-fly.  Finally, a single-page architecture (SPA) lets the website be blazingly fast across navigation, and the distributed databases and CDNs allow even our users on the other side of the planet to have the same fast experience.
- Design for exponential growth.  We’ve been experiencing this, doubling our city count every year.  This means our old design of presenting things event-first needs to switch to assuming we’ll have vast numbers of cities, GC, etc, and cannot rely on long lists like the old website does.  Entering new cities and GC, needs to push button simple, and players need really nice interfaces for navigating to their cities of interest to get the information they need.

# UX Design

For the User Experience, we’re targeting several different types of users and the data they want to consume.  The site will keep these different users in mind when thinking about navigation and presentation of data.  Here’s a list of user-types with what information they’re likely interested in obtaining.

### Players

- Where is puzzled pint?  / Location Puzzle
- Contact their local GC (email/Social media/twitter)
- When is it?
- Archives
- Solving Tips, getting better
- Puzzle Resources
    - Code Sheets
    - Other event calendars
- Faq?
- News / Events relating to players (Blog)
- Google Calendar/iCal integration
- Suggest New Puzzle Resources

### Curious Newbies

- What is puzzled pint?
- When is it ? 
- How much does it cost?  What do I have to do?
- Example Puzzle?

### Media

- Describe puzzled pint succinctly
- Acquire Press Kit
- History of Puzzled Pint

### Donors

- What’s the company type?
- How do I donate?
- Manage my donations / get receipts
- See list of donors
- Access Public financial records

### Merch Buyers

- See list
- Buy stuff
- Order status/history

### Potential Game Control Volunteers

- Read the Charter
- What are my Responsibilities?
- Next steps?  How do I sign up

### Potential Authors

- How does it work?
- Next Steps?
- Reserve a theme
- List of themes
- Get Puzzle Design Tips

### Businesses Wanting to Host PP

- Explain Non-profit and no advertising
- Connect them with local GC

## Authenticated Users

### Game Control (Authenticated: Role: GC)

- Specify their Social Media
- Get News / Events GC would be interested in seeing (Newsletter)
- Manage my newsletter settings
- Expense Reporting
- Expense Reimbursement
- Edit my bio
- Edit City Info
- Request GC Add
- Add Locations to upcoming events
- Download the puzzles for the month

### Puzzle Authors  (Role: Authors)

- List of my puzzles
- Submit a puzzle
- List of previous themes
- List of upcoming themes
- Get Puzzle Design Tips
- Edit my Bio

### Playtesters (Role: Playtesters)

-  See a list of puzzle sets open for playtesting
-  Download puzzles
- See hints/answers for each puzzle
-  Add feedback to a tested puzzle
    - Solve info should be pre-filled by the website to prevent re-entering data
        - Last version downloaded
        - Number of players
        - Average experience level

### Puzzle Editors  (Role: Editors)

- Add themes
- Add puzzles, hints, answers
- Add monthly puzzle info, last minute fixes
- Keep private per-playtester notes
- See playtester solving statistics
- See playtest results

### City-Ops (Role: City-Ops)

- Add new city
- Add primary GC
- See list of cities without locations
- E-Mail subset of cities (e.g. without locations)
- Edit Cities’ page info

### Comms (Role: Comms)

- Edit Pages Content
- Manage site-wide banners
- Add news/blog

### Showrunners (Role: Showrunners)

- Add events
- See report of city status (including locations)
- See report of location puzzle readiness

### Admins  (Role: Webmasters)

- Get stats on site use, broken links, errors, etc.

# Page Layout

## Home

- Header with Logo, Title, and Sign-in status
- Site-wide alert message
- Upcoming Event info (top, location puzzle, etc.)
- Role-specific cards to help navigate: 
    - Manage my donations (donors)
    - Manage my puzzles (authors)
    - Manage my city (GC)
    - Manage my playtests (playtesters)
    - Manage my puzzle sets (Editors)
    - Manage Events (Showrunners)
    - Note: Manage news, banners, and content are on individual pages (comms)
- Teasers for various other pages
    - What is Puzzled Pint?
    - Find a city near you
    - Make a donation
    - Volunteer as Game Control
    - Interested in writing puzzles?
    - Buy our cool Merchandise!
    - Puzzle Archives
    - Media Inquiries
    - Blog
- Footer with CC, privacy policy, and help info

# Architecture

This section covers the architectural components, decisions, and partial explanations for them.

## Implementing for v1

- Angular - Client Side Framework  (currently v7)
	- Includes Node.js
- PrimeNG
	- With the free Nova-light theme (customized)
    - PrimeNG is more opinionated than Angular Material.
    - It builds on top of the best low level components (e.g. Quill)
    - It’s one library, with one dependency (simpler), even A.M. has additional CDK dependencies.
    - It’s more easily themeable.
    - Has many more components.
- Firebase - Server NoSQL Database API
- Travis CI - Continuous Integration
	- Better open source options than CircleCI
- GitHub - Repository & Bug Tracking
	- Better features, and free non-profit account
- Google Maps API
- Stripe - Payment Processing
	- Cheapest card processing possible 2.2% + 0.30c (with non-profit discount)
- GSuite
	- Drive API for files
    - Auth for HQ logins
    - Teams for HQ Roles (GC uses Google Auth)
- Cypress.io
	- User friendly testing framework

## Implemented Later

- Stripe Connect
	- Payouts to GC
- Angular Universal
	- Implemented in v1, but not tested
    - Also need to add SEO tags, and search meta-data
- Angular Elements - Packaged Components
	- Will allow for more dynamic rendering/reordering of content (e.g. adding components or modifying page structure on-the fly)
- Firebase Notifications
	- Allows us to directly notify users when, e.g. the location puzzle is released
- Cloud Scheduler - Timed Releases of Pages
	- Allows scheduled releases of content
- Google Drive API for PDFs and revisions
	- Allows revision history for playtesting use cases.
- Google Analytics for Firebase
	- Insights into use-cases (better than server logs)
- Possibly Mix-In Bulma for better visuals
	- https://github.com/jgthms/bulma

## Considered but not going to use

These were all considered for design, but rejected.

- AngularFlex
	- PrimeNG provides simple responsive components, which should be sufficient for mobile browsers
    - Much simpler syntax, with less control (a win)
    - Doesn’t build, at time of writing, on the latest package versions, so support might be lacking.
- GSuite Sites
	- Too simple for our advanced coding use-cases and workflows
- Tableau - Reporting
	- No good Firebase connector
    - Probably overkill for our needs
- CMS
	- Generally CMS options failed to deliver on some needs. 
    - We don’t often edit the website’s content/structure, more often we are following a predefined workflow, which custom coded components will greatly accelerate.
    - Flamelink.io
		- Not Free
        - Limited features
    - Contentful
        - More tailored to more standard workflows than our unique ones
    - Pushtable
		- Separate database system
        - Difficult to pull data down in different formats, easier to build what we need directly.
- Static Site Generators
	- Netlify
		- No good way to update online without coding
    - Hugo
		- Online edit tools through github require lots of team coordination on content layout.  We may end up doing something with static generation later if our DB reads start becoming costly.

## Libraries

This is a list of coding libraries being used:

- AngularFire - Wraps Google’s Firebase SDK to support typescript and Angular.
- Angular Google Maps (AGM)?  -- still evaluating
- GeoFireX? -- still evaluating

## Components

This is a quick description of the current and planned components:

- About Pages
- Home blurbs
- Adding “areas” (Selecting centerpoints)
- Adding GC (& bios)
- Adding GC to Areas?
- Puzzle Archives (initially)
- Location Puzzles (& hints, with ‘ready’ toggle) (initially)
- Faq Entries
-  Media Mentions
- Resources
- Blog Entries?
- Events (eventually)
- Locations (eventually)
- Standings (eventually)
- RSVP
- User Ratings
- User location saving
- User notifications
- Puzzle Playtesting (eventually)
- Puzzle Archives (eventually)

# Layout

Simple layouts with ng-prime’s p-grids.  Everything is planned to be responsive to work on mobile.

# Tools

- Npm - Package management
- Angular Console - Source Project Management  -->May replace with angulardoc (CoPilot)
- Balsamiq Mockups - Wireframing tool
- Visual Studio Code - Editor
    - GitHistory Extension
    - Angular Essentials extension: <https://marketplace.visualstudio.com/items?itemName=johnpapa.angular-essentials>
    - Tips
        - Ctrl-K Keybindings
        - Ctrl-P Command Pallette
            - Jumpt to file by name
            - Bookmark plug-in  jump to code (e.g. router)
            - `npm -*`
			- `Ctrl-@` - gives you types & functions
		- `Ctrl-\`` terminal
		- `Ctrl-space` code completion
        - Peek-Defintion
        - Find References
        - Paste JSON as code
        - Git Integration
        - VS Studio Live-Share
- NodeJS - Package Management
- Chrome - Debugging
	- Augury Extension
- Typescript - Language
- Cypress.io integration testing.
	- Firestore local rules testing
- Lighthouse/WhySlow -- performance test
- Trello - User Stories
- GitHub - Bug Tracking/PRs
- Convert User-Agent to Browser+Version: <https://www.whatsmyua.info/>

# Learning Resources

Learning Angular - <https://www.codeproject.com/Articles/1198279/%2fArticles%2f1198279%2fLearn-Angular-in-days-Day-Part>

Firestore

Geoquery: Geohash codes:  <https://youtu.be/lO1S-FAcZU8>

<https://angularfirebase.com/lessons/query-by-array-contains-firestore/>

Angular Universal - <https://angularfirebase.com/lessons/angular-6-universal-ssr-prerendering-firebase-hosting/>

FlexLayout learning:<https://tburleson-layouts-demos.firebaseapp.com/#/responsive>

<https://flex-possibilities.stackblitz.io/>

<https://blog.angularindepth.com/gravatar-directive-in-angular-e379a681dbe4>

<https://blog.angularindepth.com/how-to-improve-angular-performance-by-just-adding-just-8-characters-877bde708ddd>

<https://angularfirebase.com/snippets/how-to-use-google-apis-or-gapi-with-firebase-auth/>

# How to Contribute

## Getting Started

1. Install Visual Studio Code
	- <https://code.visualstudio.com/>  (Any OS)
2. Install Node JS
    - <https://nodejs.org/>
    - Use the Latest not the LTS version.
    - I chose to install the tools for Native modules, but I don’t know if this is strictly necessary.
    - Reboot may be required.
3. Install Git 
	- <https://git-scm.com/download>
    - Change the default git editor to VSCode (not insiders)
    - I suggest using Git Bash only for commands
    - USe the OpenSSL Library
    - Checkout Windows Style, Commit Unix-style (if applicable)
    - Use MinTTY
    - Enable File Caching and the Git Credentials Manager, leave Symlinks off.
4. Launch VSCode
	- Using the Extensions Marketplace:
		- install Angular Essentials (by John Papa)
        - install the Angular Console (by nrwl)
        - Install the Cypress Snippets (by Andrew Smith)
5. Restart VSCode
	- Click “Enable Material Icons” in the notification box.
6. In VSCode type “Command(Ctrl)-Shift-P” then “Git:Clone”
	- Enter: “<https://github.com/PuzzledPint/pp-pigpen.git>”
    - Choose an empty folder for the repo.  I suggest placing it in /code/puzzledpint/
    - At the prompt, open the repo
7. In VSCode type “Command(Ctrl)-Shift-P” then “npm: Install Dependencies”
8. In VSCode type “Command(Ctrl)-Shift-P” then “Angular Console”
	- Click “Serve”, and “Run”
    - This will build and run the app locally.
    - Click the “application” link to open your browser
    - Using Chrome is highly recommended!.
9. Set up command line (Optional)
	- You can use all Angular CLI (ng) commands in the console (recommended)
	- You can use VSCode for all git commands, as well (recommended!)
    - But if you want to use the terminal anyhow:
		- VSCode go to Terminal->New Terminal
        - Customize your terminal choice (we suggest using Git Bash)
        - Type npm link @angular/cli
10. Get to coding!

## Installing Firestore

You probably don’t need to install the firebase-tools locally to develop.  The firebase CLI is used mostly for deployment, as we’re using Travis CI for that.  For local testing, you should use mocks for your components.  If you’re doing cloud function development, or rewriting security rules, then here’s how to get started:

```
npm install -g firebase-tools
```

## Cypress.io for Integration Testing

We recommend using Cypress.io for testing your components.  It’s much easier than other end to end tools like Protractor.  Since most code is going to be integration code, you can even do module tests (unit test) with this tool.

### Installing 

```
npm install cypress --save-dev
```

### Running

```
npx cypress open
```

### Naming

PigPen -- it was the new code added to the sheet, this is the new website.

# Testing

## Resources

<https://angular.io/guide/testing>

<https://semaphoreci.com/community/tutorials/testing-components-in-angular-2-with-jasmine>

<https://github.com/angular/angular-cli/wiki/test>

<https://github.com/angular/angular-cli/wiki/e2e>

<https://offering.solutions/blog/articles/2018/06/01/running-cypress-tests-in-angular-with-travis-ci/>

<https://firebase.google.com/docs/functions/unit-testing>

“Chance” test lib

https://github.com/mikkopaderes/mock-cloud-firestore

# Testing Cloud Functions

```
npm run shell
```

# Browser Testing 

We’re using [BrowserStack](https://www.browserstack.com/).  We have a few available users in our 501c3 gratis account, let us know if you need one.

# Conventions

`/app/{route}`  is where “views” or “container components” go.  These have their own routers, lazy loaded modules, and keep and fetch all the data and logic for the sub-components they display.  They should not have any ‘controls’ or presentational logic beyond the container.  Component used exclusively in that view can be within that same folder, but shared component go in /components

`/components` all shared presentational components, including meta-components which are lists of elements of the same type.

`/models/fs*` are data structures that are stored in the Google Firestore database.  They do not contain any logic.

`/services` are data singleton services.  Normally injected into the route, but ones exclusive to modules can also be here.  These services include ones that wrap the database objects into classes.

All new components should have an example usage added to  /components/testAll this is a special view that renders every component with test data and can be used to see styling effects across the app, and as a development test tool on the presentational components.  It is also used by cypress to test that these components are functioning as expected.  (TODO)

In Firestore

Collections should be plural, e.g.  /users/{id}

Multi-word collections should be in (lower) camel case, e.g. /puzzleSets/{id}

Document arrays should be plural, e.g. /settings/permissions

Other documents should be singular, e.g. /info/footer

Mass nouns, e.g. info or feedback, should not be mangled (infos, feedbacks)

Note, additional collections need their corresponding documents added to the firestore security rules before they can function.

# Theming

## Design

The current idea behind the visual of the site is to evoke the same feel as our puzzle sets.  Hence the logo in the upper left, the title in the center, (not in Dakota, unfortunately, as it’s not a free web-font), and the sign-in where the stars would be.  Content is mostly black, white and greys, with blue buttons by default to reflect the only color on our code sheets. The main font is open sans due to its excellent performance at small screen readability.  

The idea behind cards instead of menus comes from the realization after a UX design pass (see above) that we have over 8 different types of users accessing our site for different reasons, and menu items alone couldn’t address their concerns well.  We don’t just have the “players looking for the location puzzle” anymore.  One of these 8 'home page start cards' has enough info to navigate the user to what they want to see, and they provide more context than a soulless traditional menu-word like "info" or "locations".

Finally, the design is mobile-first!  All theming changes should start by looking at it on mobile as mobile is now 60%+ of site views!

## Architecture

We’re using PrimeNG which is fully theme-able with CSS.  Our base theme is the free nova-light theme with only minor style adjustments in some places.

## Contributing

If you want to contribute theme changes, consider the following:

#### PrimeNG

<https://www.primefaces.org/primeng/#/>

Notice the THEMES menu item.  You can choose a different (free) theme there and their site dynamically adjusts to it. (it's hard to see the differences on the home page, but try other pages by clicking items on the left)  If you choose a non-free theme you can also go to live demos of theme at the site they take you to.

#### Visibug

<https://chrome.google.com/webstore/detail/visbug/cdockenadnadldjbbgcallicgledbeoc?hl=en>

This chrome browser extension is excellent for toying with the CSS.  Also note that CTRL-SHIFT-M in chrome gets you to the mobile device simulator for screens.

#### Themeroller

<http://jqueryui.com/themeroller/>  is great for modifying  <https://medium.com/@OlegVaraksin/simple-ways-to-create-a-new-theme-in-primeng-12d9bbe3fc60> for details.

#### Component Tests

If you go to [www.puzzledpint.org/test-all](http://www.puzzledpint.org/test-all) you can see all of our controls instantiated with mock data.  This is a great place to test the effects of your new theme changes on the live website.

# ** Ignore the below.  These are in-progress notes.  **

# Tips

# Firebase Auth

Testing

Npm i @firebase/testing

To run the emulator you’ll need Java, I suggest NOT using the oracle java, and instead using Zulu: https://www.azul.com/downloads/zulu/

<https://firebase.google.com/docs/auth/admin/custom-claims>

Npm run setClaims secret.token -e [User@domain.com](mailto:User@domain.com) -c { Editor: true; Webmaster: true; }

Set Env Secrets with <https://firebase.google.com/docs/functions/config-env>

# Donations Component Specs

User can make a one-time anonymous donation

Login required for:

Public Acknowledgement on the website

Recurring monthly donations (to be able to manage it)

Ability to get an IRS qualifying “gift substantiation” -- “ "No goods or services were received in return for this gift"

Say that “anonymous donations go directly to stripe, and no data is saved on our servers”

Ask for amount

If logged-in ask “anonymous”?  If yes “disclose amount on the website?”

-- In their user donations page they get:

a table of donations with dates, a grand total

A dropdown and button to get a per-year gift substantiation notice.

The ability to modify their monthly donation amount.

The ability to cancel their ongoing donation.

A note to email if there are problems or to request a refund for a mistaken transaction.
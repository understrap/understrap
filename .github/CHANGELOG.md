## [Unreleased]

** Enhancements **

  -

** Fixes **

  -

## Release 1.2.3-beta.1 October 16th 2023

** Enhancements **

  - Add and update WooCommerce templates #2091
  - Improves readability of the sidebar templates #2071
  - Uses Babel to compile Bootstrap imports #2035
  - Adds Bootstrap container classes and max-widths to editor styles #2121
  - Add editor-color-palette-bootstrap4.json #2032

** Fixes **

  - Fixes typos in the repository #2113
  - Fix typo in .gitignore to track .browserslistrc #2118
  - Fixes TinyMCE editor margins #2073
  - Bump Bootstrap from 5.2.2 to 5.2.3 & other dependencies #2010
  - Deprecate understrap_link_pages_args filter hook #1967
  - Add grouped version updates for dependabot #2130
  - Reduce code duplication by declaring copyDir() once #2129
  - Fix and update workflows #2127

## Release 1.2.2 January 16th 2023

** Fixes **

  - Updates WooCommerce templates as of 7.1.0

## Release 1.2.1 November 17th 2022

** Fixes **

  - Fixes an issue with post thumbnails not being editable

## Release 1.2.0 November 15th 2022

** Enhancements **

  - Updates Bootstrap 5.1.3 to Bootstrap 5.2.2
  - Updates Bootstrap 4.6.1 to Bootstrap 4.6.2
  - Updates WooCommerce Templates
  - Adds a new 'Full Width Landing Page' page template
  - Imports more Bootstrap utility classes into the block editor
  - HTML comments have been cleaned up and/or moved into PHP when appropriate
  - Enhancements to multiple theme template tags
  - Developers: PHP linting and testing has been overhauled
  - Developers: Removes the need for jQuery for sites running Bootstrap 5 (doesn't remove jQuery itself, though)

** Fixes **

  - Fixes issues with flags not showing up in the navigation for WPML and Polylang users
  - Fixes styles for the select tag in the Categories and Archives widgets and block widgets
  - Fixes styles for the search block widget
  - Fixes styles for pagination
  - Fixes block editor buttons on hover
  - Fixes skip to content link for Bootstrap 5
  - Fixes the offfcanvas close icon that was hidden behind the admin bar
  - Fixes issues with the Customizer preview
  - Fixes the category transient flush
  - Accessibility: aria role fixes for the carousel and footer widgets area
  - Translations: Makes aria-labels translatable

## Release 1.1.0 December 1st 2021

** Enhancements **

  - Now supports Bootstrap 5 in addition to Bootstrap 4. Update your site by using the setting in the Customizer. (If using an existing child theme, please check with your child theme author before changing this setting. If starting a new child theme, the Understrap starter child theme now supports Bootstrap 5.)
  - New Feature: Offcanvas responsive menu support (Bootstrap 5 only)
  - If `SCRIPT_DEBUG` is set to true, Understrap will load the non-minified version of the stylesheets and scripts.

** Fixes **

  - Numerous accessibility updates throughout, including new semantic markup, color contrast changes, additional screen reader text, and updates to core Bootstrap components.
  - Fixes an issue with WPML flag icons not appearing in navigation.

##  Release 1.0.1 October 7th 2021

** Fixes **

  - Updates the Popper.js dependency import that was failing on some browsers.

##  Release 1.0.0 August 26th 2021

** Enhancements **

  - Introduces [Unreleased] Section at top of CHANGELOG.md to hold items until the branch is ready for release.
  - Adds a new customizer setting for overriding the site footer information.
  - Adds support for wide- and full-width blocks.
  - Includes Bootstrap designs for blocks like blockquotes, tables, image captions, and more.
  - Introduces the Bootstrap color scheme into the block editor's default color palette.
  - Update the build process for developers to move away from Gulp.

** Fixes **

  - Updates WooCommerce templates to current versions.
  - Corrects misapplied version numbers in WooCommerce templates.
  - Reverts WooCommerce Translations to woocommerce language domain.
  - Updates understrap.pot file to include several translation strings that had not been added.
  - Fixes spelling and grammar errors in the CHANGELOG.md.
  - replaces esc_attr with esc_html in Woocommerce cart template.

## Release 0.9.6 June 15th 2021
This is a bugfix and maintenance release.

** Enhancements **
  - Set credit links to use https protocol.

** Fixes **
  - Use get_theme_file_path() to make include files child theme friendly.
  - Fixes breaking child theme overloading /inc/ folder files.

** Dependency Updates **
  - Bump ws from 7.4.3 to 7.4.6
  - Bump browserslist from 4.16.1 to 4.16.6
  - Bump postcss from 8.2.9 to 8.2.10
  - Bump hosted-git-info from 2.8.8 to 2.8.9
  - Bump lodash from 4.17.20 to 4.17.21
  - Bump ua-parser-js from 0.7.23 to 0.7.28


## Release 0.9.5 June 10th 2021
This is a maintenance release incorporating many commits including code formatting and dependency updates that have occurred over the past two years. There are still many dependency updates remaining, and they will be addressed in new releases coming soon, but we want to get this release synced first.

** Enhancements **
- Re-add custom-javascript.js
- Add .gitattributes
- Conditionally load WooCommerce and Jetpack functions
- Uses the woocommerce_quantity_input_classes hook to add Bootstrap's .form-control class. The hook has been added in WooCommerce 3.6.0.
- Adds theme tags
- Adds minimum PHP version
- Adds Tested up to:
- Adds gallery styles
- Sets phpcs-cache file
- Adds theme support for script and style
- Removes content-none from loop list

** Fixes **
- Fixes WooCommerce checkbox input
- Fixes outdated WooCommerce templates
- Fixes styling of WooCommerce product search widget
- Fixes element order in input group
- Fixes gulpfile paths

** Removes **
- Remove Bootstrap 3 classes from form fields
- Removes mini-cart.php
- Removes vendor from paths
- Removes gulp-touch-fd
- Removes jquery.slim.min.js
- Removes underscores-for-npm
- Removes Bower

---

## Release 0.9.4 June 30th 2019
## Release 0.9.3 May 8th 2019
- hotfix release

## Release 0.9.2 May 8th 2019
Commits on Feb 16, 2019
@holgerkoenemann
holgerkoenemann
Rebuild header
e6c9552

Commits on Feb 19, 2019
Lon Koenig
Lon Koenig
Make understrap_mobile_web_app_meta() and understrap_pingback() plug…
6fcf1e9

Commits on Feb 22, 2019
Noel Springer
Update form-reset-password template for Woocommerce 3.5.5
85ef63c

Commits on Feb 27, 2019
@holger1411
holger1411
Merge pull request #921 from schnoggo/master
98b2107
@holger1411
holger1411
Merge pull request #922 from noelspringer/woocommerce-template-update
17eb1c5

Commits on Mar 08, 2019
@MarieComet
MarieComet
Add responsive embed support
f663655

Commits on Mar 11, 2019
@holger1411
holger1411
Merge pull request #935 from understrap/MarieComet-responsive-embed-s…
74b0d07

Commits on Mar 20, 2019
@holgerkoenemann
holgerkoenemann
Fixing problem with tiny col on mobile
fa0bef5

Commits on Apr 11, 2019
@KenEucker
KenEucker
Dependencies updates. Migrated to gulp4. Added compilation task.
fc08939

Commits on Apr 14, 2019
@holger1411
holger1411
Merge pull request #953 from KenEucker/master
317c136
@holger1411
holger1411
Update gulpfile.js
401bcc9
@holger1411
holger1411
Fixing #946
9f848d8
@holger1411
holger1411
Update enqueue.php
705bd72

Commits on Apr 17, 2019
@holger1411
holger1411
Update BS version #no
a4f20ac

Commits on Apr 19, 2019
Chris Bibby
initial
89f2509
Chris Bibby
Woocommerce 3.6.1 template changes
1ab2f98
Chris Bibby
Woocommerce 3.6.1 template changes
d60c6d4
Chris Bibby
woocommerce 3.6.1 template changes
cb67c41
Chris Bibby
woocommerce 3.6.1 template changes
7d8e00f
Chris Bibby
woocommerce 3.6.1 template changes
a28c44d
Chris Bibby
woocommerce 3.6.1 template changes
c500160
Commits on Apr 20, 2019
Chris Bibby
Woocommerce 3.6.1 updates
1fe315c
Chris Bibby
Merge branch 'woocommerce-3.6.1-updates' of https://github.com/chrism…
b8766a7

Commits on Apr 22, 2019
@holger1411
Update Woocommerce version info
cac4962

Commits on Apr 28, 2019
@holger1411
Merge branch 'master' into woocommerce-3.6.1-updates
c293c82
@holger1411
Merge pull request #955 from chrismb75/woocommerce-3.6.1-updates
8af84c1
@holger1411
Fixing watch-bs task
bbae68f

Commits on Apr 29, 2019
@IanDelMar
WooCommerce backward compatibility. Fix for #961
8b841fb

Commits on Apr 30, 2019
@kelsS
removed bower.json since bower is no longer used
7475ec1
@kelsS
add php to allow the hero widgets to show on the fullwidth page templ…
2f5e018

Commits on May 01, 2019
@kelsS
add babel, gulp-babel, autoprefixer, and gulp-postcss as dev dependen…
0ea4793
@kelsS
add babel core, gulp-babel, autoprefixer, and gulp-postcss to gulp pr…
b179eaf
@IanDelMar
Add support for wp_body_open
0e76b40

Commits on May 03, 2019
@IanDelMar
Improve code simplicity
6076c91

Commits on May 08, 2019
@holger1411
Merge pull request #967 from IanDelMar/wp_body_open
1e90d3c
@holger1411
Merge pull request #965 from kelsS/master
a09fcbe
@holger1411
Merge pull request #963 from IanDelMar/patch-6
2d80cf4
@holger1411
Re-add customizer.js
01af1b4
@holger1411
Clean rebuild
5f9b8b2

## Release 0.9.1 February 15th, 2019 - SECURITY UPDATE
- Update to Bootstrap 4.3.1 - Fixes a XSS vulnerability in BS 4.3.0

## Release 0.9.0 February 12th, 2019
- Update to Bootstrap 4.3.0
- Update both-sidebarspage.php - thx @stevygee
- Update left-sidebar.php - thx @stevygee
- Update right-sidebars.php - thx @stevygee
- Add deprecated.php - thx @IanDelMar
- Escape translation fix - thx @IanDelMar
- Update WooCommerce templates to 3.5.3
- HTTPS Links - thx @Noel Springer
- Adding Slovene Translation - thx @Fatshape
- Update pt_Pt translation - thx @jfig

## Release 0.8.9 December 28th 2018
  - Update to Bootstrap 4.2.1
  - Fix for #796  - thx @IanDelMar
  - Add .editorconfig - thx @IanDelMar
  - Clean up gulp file and package.json according to #853
  - Conditionally add pingback - thx @IanDelMar
  - Add mobile-web-app meta as action  - thx @IanDelMar
  - Fixing spacing and indentation on a lot of spots - thx @IanDelMar
  - Update comments.php - thx @IanDelMar
  - Update sidebar-statichero.php - thx @IanDelMar
  - Update several .php files - thx @IanDelMar
  - Fix dropdown when setting depth=0 in wp_nav_menu - thx @stevygee
  - WooCommerce 3.5.2 update - thx @Fatshape
  - Fix for issue #876 - thx @Noel Springer


## Release 0.8.8 November 1st 2018
  - Refactor functions.php - Thx @ylkyrg
  - Fix for #808  - Thx @VarunBatraIT
  - Add filters for posted on/by  - Thx @IanDelMar
  - Adjust byline for hidden date case  - Thx @IanDelMar
  - Fixed typo in wp_enqueue_style() call in inc/wpcom.php - Thx @Salmatron
  - Add woocommerce product gallery slider width fix - Thx @IanDelMar
  - Prevent modifications to read_more affecting dashboard expected behavior - thx @pattonwebz
  - Tidy up left sidebar check - thx @gillespieza
  - Add gulp default talk (watcher) - thx @redpik
  - Remove $sidebar_pos - Thx @IanDelMar
  - Update Woocommerce templates for WC 3.5.x - thx @ Noel Springer

## Release 0.8.7 September 11th 2018
  - Spelling corrections thx @davidshq
  - Updated pt_PT Translation thx @jfig
  - Code cleanup thx @pattonwebz
  - Using bootstrap.bundle.js instead of bootstrapjs and popper.js
  - Update widgets.php thx @0dp
  - Update form-coupon thx @Noel Springer
  - Remove the X-UA-Compatible meta tag thx @redpik
  - Fixing typo in FR text thx @redpik
  - Create hooks.php thx @IanDelMar
  - Using site info hook thx @IanDelMar
  - Fix function_exists & parenthesis thx @IanDelMar
  - Fix for Issue #769 thx @IanDelMar
  - searchform.php replace assistive-text by sr-only thx @IanDelMar
  - Update gulpconfig.json thx @0dp
  - Fix for issue #785 thx @IanDelMar
  - sidebar-footerfull.php: incorrect spacing  thx @IanDelMar
  - Stick to single quotes & other minor changes thx @IanDelMar
  - Define .screen-reader-text thx @IanDelMar
  - Focusable 'Skip to content' thx @IanDelMar
  - Prevent direct access thx @IanDelMar

## Release 0.8.6 July 26th 2018
  - Re - Release

## Release 0.8.5 July 26th 2018
  - Update to Bootstrap 4.1.3

## Release 0.8.4 July 16th 2018  Maintenance Release:
  - Update to Bootstrap 4.1.2
  - fixing sidebar.php problem
  - Revert to Gulp 3.x support

## Maintenance Release 0.8.4 July 16th 2018
  - Update to Bootstrap 4
  - fixing sidebar.php problem
  - Revert to Gulp 3.x support

## Release 0.8.3 July 3rd 2018
  - Update to Bootstrap 4.1.1
  - Update to Gulp 4
  - Moving closing primary </div> into right-sidebar-check.php
  - Adding hero canvas widget pos
  - Swap customized walker to the latest upstream wp-bootstrap-navwalker class - Thx @pattonwebz
  - gulp-rev - Thx @0dp
  - Update pagination - thx @0dp
  - Adding german formal language - Thx @Thomas-A-Reinert
  - Added cookie checkbox support for inc/custom-comments.php - Thx @Jean Pierre Kolb
  - Create Japanese translation - Thx @teruteru128
  - WooCommerce 3.4.0 update - Thx @ZacharyElkins
  - Organize sidebar files into loop-templates directory - Thx @axlright
  - Update package.json
  - POT file and Russian translation update - Thx @edkozuto

## Release 0.8.2 April 11th 2018
  - Update to Bootstrap 4.1
  - Adding CONTRIBUTING.md and ISSUE_TEMPLATE.md - Thx @Thomas-A-Reinert
  - Adding empty JavaScript file into build process for adding own JS more easily - Thx @Thomas-A-Reinert
  - WooCommerce update and cleanup - Thx @ZacharyElkins
  - Adding SASS source map functionality - Thx @axlright
  - Cleanup - Thx @axlright
  - Adding custom editor SASS stylesheet into build process
  - Remove woocommerce.php integration and replace it with hooked approach - See: https://docs.woocommerce.com/document/third-party-custom-theme-compatibility/#section-5
  - New pagination - Thx @0dp
  - Update functions.php - Thx @0dp
  - Add pluggable functions - Thx @axlright
  - Add Polish translation - Thx @mirzal
  - Adding timestamp to js and css resources to prevent caching while developinh - Thx @@gintsmurans
  - Improve left sidebar check - Thx @ZacharyElkins


## Release 0.8.1 March 7th 2018
  - Updating dependencies
  - Fixing and improing gulpfile.js - thx @0dp
  - add function exists check in custom-comments.php  - Thx @MarieComet
  - Updated the markup for input groups according to BS 4 changes - Thx @IngoVals
  - Lot of fixes and improvements - Thx @Thomas-A-Reinert and @lilolbear
  - Fixes invalid code due to WP´s itemprop insertion - Thx @Thomas-A-Reinert
  - Enhanced contrast to comply with WCAG 2.0 rules - Thx @Thomas-A-Reinert
  - Completed german translation, fixed typos etc. - Thx @Thomas-A-Reinert
  - Fixing typos in FR translation - Thx @MarieComet
  - Adding hebrew language file - Thx @asaf147369
  - Adding gulp-autoprefixer - Thx @axlright
  - Updating WooCommerce compatibility
  - Adding turkish translation - thx @mavisland
  - Adding gulpconfig - Thx @lilolbear
  - Enable woocommerce product gallery slider by default. - Thx @typeplus

## Release 0.8.0 January 22nd 2018
  - Update to Bootstrap 4 (no more Beta...)


## Release 0.7.0 December 29th 2017
  - Update to Bootstrap 4 Beta 3
  - Create right-sidebar-check.php - Thx @Vishal-Deshpande
  - Fixing container type customizer setting - Thx @0dp
  - Fixing comments.php - Thx @Vishal-Deshpande


## Release 0.6.12 December 14th 2017
  - Hotfix release


## Release 0.6.11 December 11th 2017
  - Fixing WooCommerce functions
  - Fixing sanitizing, escaping and prefix´s issues
  - Fixing customizer settings
  - Removing duplicate code
  - Resort theme-settings.php
  - Cleaning functions.php
  - Changing licensing infos

## Release 0.6.10 December 4th 2017
  - Hotfix release


## Release 0.6.9 November 28th 2017
  - Basic guideline adjustments
  - Update prefixes
  - Remove automatically db updates by theme
  - Rename and streamline functions
  - Changing WooCommerce text domain to "understrap"
  - Disable theme-settings.php call
  - Remove jQuery 3.2.1 slim and switch back to WP core jQuery version
  - Update Bootstrap 4 Beta 2 to commit which fixes jQuery conflict

## Release 0.6.8 November 27th 2017
  - Theme check updates
  - Bugfix release

## Release 0.6.7 November 24th 2017
  - Workaround for jQuery inconsistency problem between Bootstrap Beta 2 and WordPress in noConflict mode
  - Adding jQuery slim 3.2.1
  - Update page.php - thx @Vishal-Deshpande
  - Fixing colormap problem with beta 2
  - Making navwalker function pluggable  - Thx @bruceconlon
  - Adding WordPress title attribute - Thx @JDVirtual and @Thomas-A-Reinert
  - Fixing comments in theme_variable.scss - thx @ianwyllie
  - Adding spaces the separate "posted on" and "edited" timestamps  - Thx @bruceconlon

## Release 0.6.6 October 23h 2017
  - Update to Bootstrap 4 Beta 2
  - Moving hamburger icon to the right by default
  - Fixing issue #392
  - Gramma and typo fixes
  - Making inc/security.php hookable
  - Variable product ajax_add_to_cart fix
  - Update Woocommerce 3.2.1 compatibility

## Release 0.6.5 August 17h 2017
  - Hot fix release

## Release 0.6.4.1 August 17h 2017
  - Hot fix release - Rebuild new Bootstrap 4 Beta navbar markup into Understrap

## Release 0.6.3 August 14h 2017
   - Update to Bootstrap 4 Beta
   - Fixing wrong escaping - Thx @ramiy
   - Adding composer.json - Thx @selfagency
   - WooCommerce 3.1 compatibility update - Thx @typeplus
   - WooCommerce Bootstrap buttons - Thx @yeszao
   - theme-settings.php update - Thx @oralunal
   - Update responsive meta tags for Bootstrap 4 - Thx @chuckreynolds


## Release 0.6.2 June 7h 2017
   - Hot fix release

## Release 0.6.1 May 18th 2017
   - Replacing some older BS3 markup - Thx @typeplus and @Kostas Vrouvas
   - Add basic error handling for `gulp-plumber` - thx @L422Y
   - Correcting WooCommerce customer login markup
   - Replacing cssnano with minify-css
   - Fix deprecated product accessor for WooCommerce 3.0 - Thx @willgorham
   - Declare woocommerce support - Thx @typeplus
   - Adding norwegian translation files - Thx @joakimhellum
   - Adding info for GitHub updater plugin
   - Fixing imagemin task
   - Specify correct post templates for jetpack infinite scroll - Thx @typeplus
   - Streamline 404.php and aligning with other page templates
   - Adding gulp-sequence

## Release 0.6.0 (skipping 0.5.8 and 0.5.9 ) Apr. 21st 2017
   - Adding WooCommerce 3.0.0 support - Big thx @typeplus
   - Add npm-debug.log to .gitignore file - thx @OussamaElgoumri
   - Adding swedish translation files
   - Fixing problems if both forms (login and register) are present
   - Adding image optimization task to gulpfile - thx @VesterDe
   - Removing old and unused BS4 Alpha 5 variables
   - Include call to jQuery into if block - hx @wingertjp
   - phpcs fixes - thx @typeplus
   - Fixing col-1 problem on my account WooCommerce page
   - Updating Font Awesome imports

## Release 0.5.7  Feb. 13th 2017
   - Fixing WooCommerce base layout by reverting custom woocommerce integration and switch back to default integration
   - Adding /js/ folder to watcher task excluding theme.js and theme.min.js
   - Removing duplicate DIV from "both-sidebars" page template - Thx @evandiamond
   - Fixing sidebar check
   - Remove customizer from theme.min.js

## Release 0.5.6 (skipping 0.5.5) Feb. 9th 2017
   - Adding automated tests - thx @carl-alberto
   - Remove custom Bootstrap gellery completely
   - Fixing typos - thx to @catgofire
   - Checking for WP coding standards
   - Adding a "dist-product" gulp task
   - Adding  WooCommerce form-checkout.php - thx @stef-k
   - Fixing bug #240 - thx @arpage
   - Adding AJAX classes to add-to-cart buttons - thx @typeplus
   - Updating Jetpack integration
   - Fixing "missing" h1 on frontpage problem
   - Updating inc/template-tags.php from s
   - Fixing W3C validator issues
   - Removing cleancss gulp task from cssnano task sequence due to performance issues

## Release 0.5.4 Jan. 25th 2017
   - Fixing problems with dynamic sidebars (footerfull and statichero) - Thx @NayeemNipun
   - Removes Owl Carousel slider and replace it with the BS4 carousel
   - Fixing "both sidebars" problem - Thx @ZXCVLuke
   - SEO improvements - Thx @raisonon
   - CSS cleanup
   - Updating dependencies

## Release 0.5.3 Jan. 12th 2017
   - Updating dependencies
   - Adding BS4 styles to editor style formats - Thx @ZXCVLuke
   - Adding theme css to editor
   - Dynamize the full footer and static hero widget area.
   - Custom header preparations
   - adding customizer edit icon support
   - Fixing "no sidebar" problem
   - Update Custom Logo Tags - Thx @jessijean

## Release 0.5.2 Jan. 7th 2017
   - Updating to Bootstrap 4 Alpha 6
   - Fixing german translation issues
   - Cleanup navbar code
   - Cleanup underStrap Sass file
   - Fixing browsersync issues
   - Removing one page vertical template
   - Update dependencies

## Release 0.5.1 Dec. 29th 2016
   - Adding spanish translation
   - Translation updates for: Greek, German, French
   - Updating language bas file
   - Streamlining Gulp tasks
   - Adding WooCommerce templates
   - Adding Contact Form 7 support
   - Fixing W3C validator issues
   - Adding BS4 pagination
   - Adding BS4 article nav
   - Include /JS folder to watcher task
   - Some SEO improvements (especially h1 for article titles on single item pages, etc.)
   - Adding italian language
   - General bug fixing
   - Fixing live preview for customizer
   - Font Awesome update
   - Updating all npm dependencies
   - ARIA roles update
   - Updating hamburger icon behavior

## Release 0.5.0 Nov. 24th 2016
   - Update Owl Carousel to 2.2.0
   - Update Font Awesome to 4.7.0
   - Greek language file added - Thx @stef-k
   - Portuguese language file added - Thx @jfig
   - Adding vertical-one-page template for landingpages - Thx @stef-k
   - Making all theme functions pluggable to allow child themes to overwrite ´em
   - French language file added - Thx @tchama
   - Adding article pagination and page nav BS4 markup  - Thx @stef-k & @Thomas-A-Reinert
   - Adding dynamic sidebar function - Thx @stef-k
   - Korean language file added
   - Basic WooCommerce templates added
   - Fixing "Gulp dist" Task
   - Adding masonry layout option to optimizer - Thx @stef-k
   - Adding fluid/fixed container option to optimizer


##  0.4.9 Oct. 25th 2016
   - Updating to Bootstrap 4 Alpha 5
   - Using the correct BS4 markup for navbar - Thx @tedgeving
   - Inject theme name and version into the footer dynamically - Thx @maxdmyers
   - Adding a blank template for building up a landingpage via WP editor or as blank canvas for Visual Compoeser etc. - Thx @omarusman
   - Fixing problem with empty folders after "gulp dist" - Thx @alwizo
   - Fixed custom logo function typo - Thx @willgorham


##  0.4.8 Oct. 10th 2016
   - Removing Bower and replace the dependency management with npm
   - Update to Bootstrap 4 Alpha 4
   - Optimizing WooCommerce loop -  Thx @typeplus
   - Updating all dependencies
   - Add WP Theme logo feature - Thx @jessijean


##  0.4.7 Aug. 15th 2016
   - Fixing problem with tag page
   - Fixing Navbar "hopping"
   - Global bugfixing and streamlining performance issues


##  0.4.6 Aug. 1st 2016
   - Update to Bootstrap 4 Alpha 3
   - Adding basic padding to aligned content images
   - Adding author.php template with author infos
   - Correct language file + german translation


##  0.4.5 Jun. 20th 2016
   - Adding right sanitizing function for customizer
   - Fixing some escaping problems
   - Removing "add script" customizer function
   - Calling all sidebars with "get_sidebar"
   - Load hero area on index.php conditionally
   - Remove unused code, files and dependencies
   - Adding credits for WP Bootstrap Navwalker by Edward McIntyre


##  0.4.4 Jun. 18th 2016
   - Adding the new empty.php page template. Comes just with header, footer and a content area without markup. Good for build up landingpages. An empty canvas for your Bootstrap markup.
   - Update bower.json dependencies to latest versions
   - Update package.json dependencies to latest versions
   - Adding Theter script as dependency for BS4 tooltip component
   - Resorting gulpfile.js
   - Removing BS3 completely as dependency
   - Smaller bugfixes and code improvements


##  0.4.0 Apr. 29th 2016
   - Switching from Bootstrap 3 to Bootstrap 4
   - Adding BrowserSync to gulpfile (again thx to @dvlopes)
   - Preparing the navbar markup so that the current version will work with Bootstrap 3 AND 4
   - Adding "gulp scripts" command - This uglifies and minifies all JS files (except jQuery...) into one single JS file called theme.min.js
   - Updating Gulpfile - now "gulp copy-assets" command copies all files from dependency folders into mid-layer folder called "/src"
   - Load jQuery again as extra script instead of concat it into on single file. After some problems with WooCommerce and other plugins
   - Checking WordPress 4.5 compatibility
   - Updating language template
   - Adding Brazilian Portuguese (pt-BR) translation (thx to @dvlopes).


##  0.3.8 Mar. 9th 2016
   - Adding footer widget area
   - Adjust Bootstrap markup for searchform and search widget


##  0.3.7 Jan. 8th 2016
   - Cleanup for submitting to WordPress.org theme repository:
   - Fixing sticky post problem
   - Fixing skip-to-content link
   - re-activating the admin bar
   - adding readme.txt
   - Fixing missing translation strings in comments template


##  0.3.6 Jan. 4th 2016
   - Cleanup
   - Updating dependencies
   - Upgrade to Bootstrap 3.3.6 and Font Awesome 4.5.0


##  0.3.4 SEP. 9th 2015
   - Adding basic WooCommerce support
   - Cleanup for submitting to WordPress.org
   - Removing s SASS ... no need for basic styling. That's Bootstrap´s job.


##  0.3.1 AUG. 12th 2015
   - Adding bower dependency manager and replacing GRUNT taskrunner with GULP

##  0.3.0 Mar. 23th 2015
   - Streamlining some code, adding extra "sticky" area (sticky posts above the main content area inside an extra loop). Fixing some child theme issues (now its really child theme ready...really...trust me...)

##  0.2.9 Mar. 10th 2015
   - Adding a new theme customizer option. It lets you add a code snippet right before the closing </body> tag.
	   For example for Google Analytics, Google Tag Manager, Pingdom etc. Just copy and past your code to the input field and save the setting.
	   So you don´t have to edit the theme source file´s directly, and your theme stay´s updateable

##  0.2.8 Feb. 6th 2015
   - Adding Grunt and Grunt SASS task


##  0.2.7 Jan. 26th 2015
   - Adding some basic theme option for the build-in slider script

##  0.2.6 Dec. 28th 2014
   - CLean up


##  0.2 Dec. 22th 2014
   - Adding Jasny Off-Canvas nav and Owl.Carousel Slider script
   - Enqueue scripts and styled dynamically

##  0.1 Dec. 10th 2014 - First commit

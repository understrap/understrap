            - ** Release 0.6.4.1 August 17h 2017 **
              - Hot fix release - Rebuild new Bootstrap 4 Beta navbar markup into UnderStrap

            - ** Release 0.6.3 August 14h 2017 **
               - Update to Bootstrap 4 Beta
               - Fixing wrong escaping - Thx @ramiy
               - Adding composer.json - Thx @selfagency
               - WooCommerce 3.1 compatibility update - Thx @typeplus
               - WooCommerce Bootstrap buttons - Thx @yeszao
               - theme-settings.php update - Thx @oralunal
               - Update responisve meta tags for Bootstrap 4 - Thx @chuckreynolds


            - ** Release 0.6.2 June 7h 2017 **
               - Hot fix release


            - ** Release 0.6.1 May 18th 2017 **
               - Replacing some older BS3 markup - Thx @typeplus and @Kostas Vrouvas
               - Add basic error handling for `gulp-plumber` - thx @L422Y
               - Correcting woo commerce customer login markup
               - Replacing cssnano with minify-css
               - Fix deprecated product accessor for WooCommerce 3.0 - Thx @willgorham
               - Declare woocommerce support - Thx @typeplus
               - Adding norwegian translation files - Thx @joakimhellum
               - Adding info for GitHub updater plugin
               - Fixing imagemin task
               - Specify correct post templates for jetpack infinite scroll - Thx @typeplus
               - Streamline 404.php and aligning with other page templates
               - Adding gulp-sequence


            - ** Release 0.6.0 (skipping 0.5.8 and 0.5.9 ) Apr. 21th 2017 **
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


            - ** Release 0.5.7  Feb. 13th 2017 **
               - Fixing WooCommerce base layout by reverting custom woocommerce integration and switch back to default integration
               - Adding /js/ folder to watcher task excluding theme.js and theme.min.js
               - Removing duplicate DIV from "both-sidebars" page template - Thx @evandiamond 
               - Fixing sidebar check
               - Remove customizer from theme.min.js
               

            - ** Release 0.5.6 (skipping 0.5.5) Feb. 9th 2017 **
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
               - Updating inc/template-tags.php from _s
               - Fixing W3C validator issues
               - Removing cleancss gulp task from cssnano task sequence due to performance issues


            - ** Release 0.5.4 Jan. 25th 2017 **
               - Fixing problems with dynamic sidebars (footerfull and statichero) - Thx @NayeemNipun
               - Removes Owl Carousel slider and replace it with the BS4 carousel
               - Fixing "both sidebars" problem - Thx @ZXCVLuke
               - SEO improvements - Thx @raisonon
               - CSS cleanup
               - Updating dependencies


            - ** Release 0.5.3 Jan. 12th 2017 **
               - Updating dependencies
               - Adding BS4 styles to editor style formats - Thx @ZXCVLuke
               - Adding theme css to editor
               - Dynamize the full footer and static hero widget area.
               - Custom header preparations
               - adding customizer edit icon support
               - Fixing "no sidebar" problem
               - Update Custom Logo Tags - Thx @jessijean


            - ** Release 0.5.2 Jan. 7th 2017 **
                - Updating to Bootstrap 4 Alpha 6
                - Fixing german translation issues
                - Cleanup navbar code
                - Cleanup underStrap Sass file
                - Fixing browsersync issues
                - Removing one page vertical template
                - Update dependencies


            - ** Release 0.5.1 Dec. 29th 2016 **
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
                - Udating all npm dependencies
                - ARIA roles update
                - Updating hamburger icon behavior


            - ** Release 0.5.0 Nov. 24th 2016 **
                  - Update Owl Carousel to 2.2.0
                  - Update Font Awesome to 4.7.0
                  - Greek language file added - Thx @stef-k
                  - Portugese language file added - Thx @jfig
                  - Adding vertical-one-page template for landingpages - Thx @stef-k
                  - Making all theme functions pluggable to allow child themes to overwrite ´em
                  - French language file added - Thx @tchama
                  - Adding article pagination and page nav BS4 markup  - Thx @stef-k & @Thomas-A-Reinert
                  - Adding dynamic sidebar function - Thx @stef-k
                  - Korean language file added
                  - Basic WooCommerce templates added
                  - Fixing "Gulp dist" Task
                  - Adding masonry layout option to optimizer - Thx @stef-k
                  - Adding fluid/fixed conatiner option to optimizer
                  

            - ** 0.4.9 Oct. 25th 2016 **
                  - Updating to Bootstrap 4 Alpha 5
                  - Using the correct BS4 markup for navbar - Thx @tedgeving
                  - Inject theme name and version into the footer dynamically - Thx @maxdmyers
                  - Adding a blank template for building up a landingpage via WP editor or as blank canvas for Visual Compoeser etc. - Thx @omarusman
                  - Fixing problem with empty folders after "gulp dist" - Thx @alwizo
                  - Fixed custom logo function typo - Thx @willgorham


            - ** 0.4.8 Oct. 10th 2016 **
                  - Removing Bower and replace the dependency managment with npm
                  - Update to Bootstrap 4 Alpha 4
                  - Optimizing WooCommerce loop -  Thx @typeplus
                  - Updating all dependencies
                  - Add WP Theme logo feature - Thx @jessijean


            - ** 0.4.7 Aug. 15th 2016 **
                  - Fixing problem with tag page
                  - Fixing Navbar "hopping"
                  - Global bugfixing and streamlining performance issues


            - ** 0.4.6 Aug. 1st 2016 **
                  - Update to Bootstrap 4 Alpha 3
                  - Adding basic padding to aligned content images
                  - Adding author.php template with author infos
                  - Correct language file + german translation


            - ** 0.4.5 Jun. 20th 2016 **
                  - Adding right sanitizing function for customizer
                  - Fixing some escaping problems
                  - Removing "add script" customizer function
                  - Calling all sidebars with "get_sidebar"
                  - Load hero area on index.php conditionally
                  - Remove unused code, files and dependencies
                  - Adding credits for WP Bootstrap Navwalker by Edward McIntyre


            - ** 0.4.4 Jun. 18th 2016 **
                   - Adding the new empty.php page template. Comes just with header, footer and a content area without markup. Good for build up landingpages. An empty canvas for your Bootstrap markup.
                   - Update bower.json dependencies to latest versions
                   - Update package.json dependencies to latest versions
                   - Adding Theter script as dependency for BS4 tooltip component
                   - Resorting gulpfile.js
                   - Removing BS3 completely as dependency
                   - Smaller bugfixes and code improvements


            - ** 0.4.0 Apr. 29th 2016 **
                   - Switching from Bootstrap 3 to Bootstrap 4
                   - Adding BrowserSync to gulpfile (again thx to @dvlopes)
                   - Preparing the navbar markup so that the current version will work with Bootstrap 3 AND 4
                   - Adding "gulp scripts" command - This uglifies and minifies all JS files (except jQuery...) into one single JS file called theme.min.js
                   - Updating Gulpfile - now "gulp copy-assets" command copies all files from dependency folders into mid-layer folder called "/src"
                   - Load jQuery again as extra script instead of concat it into on single file. After some problems with WooCommerce and other plugins
                   - Checking WordPress 4.5 compatibility
                   - Updating language template
                   - Adding Brazilian Portuguese (pt-BR) translation (thx to @dvlopes).


            - ** 0.3.8 Mar. 9th 2016 **
                   - Adding footer widget area
                   - Adjust Bootstrap markup for searchform and search widget


            - ** 0.3.7 Jan. 8th 2016**
                   - Cleanup for submitting to WordPress.org theme repository:
                        - Fixing sticky post problem
                        - Fixing skip-to-content link
                        - re-activating the admin bar
                        - adding readme.txt
                        - Fixing missing translation strings in comments template


            - ** 0.3.6 Jan. 4th 2016**
                   - Cleanup
                   - Updating dependencies
                   - Upgrade to Bootstrap 3.3.6 and Font Awesome 4.5.0


            - ** 0.3.4 SEP. 9th 2015**
                   - Adding basic WooCommerce support
                   - Cleanup for submitting to wordpress.org
                   - Removing _s SASS ... no need for basic styling. Thats Bootstrap´s job.


            - ** 0.3.1 AUG. 12th 2015**
                   - Adding bower dependency manager and replacing GRUNT taskrunner with GULP

            - ** 0.3.0 Mar. 23th 2015**
                   - Streamlining some code, adding extra "sticky" area (sticky posts above the main content area inside an extra loop). Fixing some child theme issues (now its really child theme ready...really...trust me...)

            - ** 0.2.9 Mar. 10th 2015**
                   - Adding a new theme customizer option. It lets you add a code snippet right before the closing </body> tag.
                   For example for Google Analytics, Google Tag Mananger, Pingdom etc. Just copy and past your code to the input field and save the setting.
                   So you don´t have to edit the theme source file´s directly and your theme stay´s updateable

            - ** 0.2.8 Feb. 6th 2015**
                   - Adding Grunt and Grunt SASS task


            - ** 0.2.7 Jan. 26th 2015**
                   - Adding some basic theme option for the build-in slider script

            - ** 0.2.6 Dec. 28th 2014**
                    - CLean up


            - ** 0.2 Dec. 22th 2014**
                    - Adding Jasny Off-Canvas nav and Owl.Carousel Slider script
                    - Enqueue scipts and styled dynamically

            - ** 0.1 Dec. 10th 2014 - First commit**
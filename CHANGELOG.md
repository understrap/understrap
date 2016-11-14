
            - ** Pre Release 0.5.0 **
                  - Update Owl Carousel to 2.2.0
                  - Update Font Awesome to 4.7.0
                  - Greek language file added - Thx @stef-k
                  - Portugese language file added - Thx @jfig
                  - Adding vertical-one-page template for landingpages - Thx @stef-k
                  - Align code to @mdo ´s coding standards here: http://codeguide.co/ - Thx @maxdmyers
                  - Making all theme functions pluggable to allow child themes to overwrite ´em
                  

            - ** 0.4.9 Oct. 25th 2016 **
                  - Updating to Bootstrap 4 Alpha 5
                  - Using the correct BS4 markup for navbar - Thx @tedgeving
                  - Inject theme name and version into the footer dynamically - Thx @maxdmyers
                  - Adding a blank template for building up a landingpage via WP editor or als blank canvas for Visual Compoeser etc. - Thx @omarusman
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
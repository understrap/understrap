Start talking: [![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/holger1411/understrap?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge)

UnderStrap WordPress Theme Framework
===

Website: http://understrap.com

Child Theme Project: https://github.com/holger1411/understrap-child

Changelog
=
            - **0.3.8 Mar. 9th 2016 Pre-Release**
                   - Adding footer widget area
                   - Adjust Bootstrap markup for searchform and search widget


            - **0.3.7 Jan. 8th 2016**
                   - Cleanup for submitting to WordPress.org theme repository:
                        - Fixing sticky post problem
                        - Fixing skip-to-content link
                        - re-activating the admin bar
                        - adding readme.txt
                        - Fixing missing translation strings in comments template


            - **0.3.6 Jan. 4th 2016**
                   - Cleanup
                   - Updating dependencies
                   - Upgrade to Bootstrap 3.3.6 and Font Awesome 4.5.0
                   

            - **0.3.4 SEP. 9th 2015**
                   - Adding basic WooCommerce support
                   - Cleanup for submitting to wordpress.org
                   - Removing _s SASS ... no need for basic styling. Thats Bootstrap´s job.


            - **0.3.1 AUG. 12th 2015**
                   - Adding bower dependency manager and replacing GRUNT taskrunner with GULP

            - **0.3.0 Mar. 23th 2015**
                   - Streamlining some code, adding extra "sticky" area (sticky posts above the main content area inside an extra loop). Fixing some child theme issues (now its really child theme ready...really...trust me...)

            - **0.2.9 Mar. 10th 2015**
                   - Adding a new theme customizer option. It lets you add a code snippet right before the closing </body> tag.
                   For example for Google Analytics, Google Tag Mananger, Pingdom etc. Just copy and past your code to the input field and save the setting.
                   So you don´t have to edit the theme source file´s directly and your theme stay´s updateable

            - **0.2.8 Feb. 6th 2015**
                   - Adding Grunt and Grunt SASS task


            - **0.2.7 Jan. 26th 2015**
                   - Adding some basic theme option for the build-in slider script

            - **0.2.6 Dec. 28th 2014**
                    - CLean up
                    
                    
            - **0.2 Dec. 22th 2014**
                    - Adding Jasny Off-Canvas nav and Owl.Carousel Slider script
                    - Enqueue scipts and styled dynamically
                                   
            - **0.1 Dec. 10th 2014 - First commit**

About
=
Basically I like the _s WordPress Starter Theme from Automattic and the grid Framework Bootstrap. Additionally I´am a huge SASS fan. Why don´t combine all these three things into a solid WordPress Theme Framework?
That´s what UnderStrap is (or will be...)

At the moment UnderStrap is in a very early stage. But if you wan´t feel free to use it for your own WordPress theme!

Basic Features
=
- Combines the _s WordPress Starter Theme PHP/JS files and Bootstrap´s HTML/CSS/JS
- Comes with Bootstrap (3.3.6) SASS source files and additional scss files. Nicely sorted and ready to add your own variables/customize the Bootstrap variables.
- Uses a single and minified CSS file for all the basic stuff
- Font Awesome Icon Font integrated (V 4.5.0): http://fortawesome.github.io/Font-Awesome/
- Comes with extra slider script - By owl.carousel (V 2.0.0-beta.2.4): http://www.owlcarousel.owlgraphic.com/
- Simple RTL file
- Jetpack ready
- WooCommerce support
- Child Theme ready (A basic starter Child Theme will be released in the future as a separate Repository)
- Translation ready

Starter Theme + HTML Framework = WordPress Theme Framework
=
The _s theme is a good starting point to develope a WordPress theme. But it is "just" a raw starter theme. Means it outputs all the WordPress stuff correctly but without any layout or design.
Why don´t add a well known and supported layout framework to have a solid, clean and responsive foundation? Thats where Bootstrap comes in.

Confused by all the CSS and SCSS files?
=
Some basics about the SCSS and CSS files comes with UnderStrap:
- The theme itself uses the style.css in the root directory just to identify the theme inside of WordPress. The file is not loaded by the theme and did not include any styles
- The theme.css file in /css/ subdirectory provides all styles. It is composed by five different SCSS sets and one variables file from /sass/theme.scss:

                  - 1 "theme/theme_variables";  // <--------- Add your variables into this file. Also add variables to overwrite Bootstrap or UnderStrap variables here
                  - 2 "../bower_components/bootstrap-sass/assets/stylesheets/bootstrap";  // <--------- All the Bootstrap stuff - Don´t edit this!
                  - 3 "understrap/understrap"; // <--------- Some basic WordPress stylings and needed styles to combine Boostrap and Underscores
                  - 4 "../bower_components/fontawesome/scss/font-awesome"; // <--------- Font Awesome Icon styles

                  // Any additional imported files //
                  - 5 "theme/theme";  // <--------- Add your styles into this file

- Don´t edit the files no. 2-4 files/filesets or you aren´t able to update it without overwriting your own work!
- Your design goes into: /sass/theme directory. Add your styles to the theme.scss file and your variables to the _theme_variables.scss. Or add other scss files into it and @import it into theme.scss

Installation
=
- Download the understrap folder
- Upload it into your WordPress installation subfolder here: /wp-content/themes/
- Login to your WordPress backend 
- Go to Appearance -> Themes
- Activate the UnderStrap theme

How to use the build-in Widget Slider?
=
The frontpage slider is widget driven. Simply add more than one widget to widget position "Hero".
- Click on Appearance -> Widgets 
- Add two or more widgets of any kind to widget area "Hero"
- Thats it

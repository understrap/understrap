Start talking: [![Gitter](https://img.shields.io/gitter/room/holger1411/understrap.svg?maxAge=2592000?style=flat-square)](https://gitter.im/holger1411/understrap)

## About

I’m a huge fan of Underscores, Bootstrap, and Sass. Why not combine these into a solid WordPress Theme Framework?
That’s what UnderStrap is.
You can use it as starter theme and build your own theme on top of it. Or you use it as parent theme and create your own child theme for UnderStrap.

At the moment, UnderStrap is in a very early stage. But if you want, feel free to use it for your own WordPress theme!

# UnderStrap WordPress Theme Framework

Website: [http://understrap.com](http://understrap.com)

Child Theme Project: [https://github.com/holger1411/understrap-child](https://github.com/holger1411/understrap-child)

## License
UnderStrap is released under the terms of the GPL version 2 or (at your option) any later version.

http://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html

## Changelog
See [changelog](CHANGELOG.md)


## Basic Features

- Combines Underscore’s PHP/JS files and Bootstrap’s HTML/CSS/JS.
- Comes with Bootstrap (v4) Sass source files and additional .scss files. Nicely sorted and ready to add your own variables and customize the Bootstrap variables.
- Uses a single and minified CSS file for all the basic stuff.
- [Font Awesome](http://fortawesome.github.io/Font-Awesome/) integration (v4.6.3)
- Comes with extra slider script by [Owl Carousel](http://www.owlcarousel.owlgraphic.com/) (v2.1.4)
- Jetpack ready.
- WooCommerce support.
- [Child Theme](https://github.com/holger1411/understrap-child) ready.
- Translation ready.
- Multiple Page Templates

## Starter Theme + HTML Framework = WordPress Theme Framework

The _s theme is a good starting point to develop a WordPress theme. But it is “just” a raw starter theme. That means it outputs all the WordPress stuff correctly but without any layout or design.
Why not add a well known and supported layout framework to have a solid, clean and responsive foundation? That’s where Bootstrap comes in.

## Confused by All the CSS and Sass Files?

Some basics about the Sass and CSS files that come with UnderStrap:
- The theme itself uses the `/style.css`file just to identify the theme inside of WordPress. The file is not loaded by the theme and does not include any styles.
- The `/css/theme.css` and it´s minified little brother `/css/theme.min.css` file(s) provides all styles. It is composed of five different SCSS sets and one variable file at `/sass/theme.scss`:

                  - 1 "theme/theme_variables";  // <--------- Add your variables into this file. Also add variables to overwrite Bootstrap or UnderStrap variables here
                  - 2 "../src/bootstrap-sass/assets/stylesheets/bootstrap";  // <--------- All the Bootstrap stuff - Don´t edit this!
                  - 3 "understrap/understrap"; // <--------- Some basic WordPress stylings and needed styles to combine Boostrap and Underscores
                  - 4 "../src/fontawesome/scss/font-awesome"; // <--------- Font Awesome Icon styles

                  // Any additional imported files //
                  - 5 "theme/theme";  // <--------- Add your styles into this file

- Don’t edit the files no. 2-4 files/filesets or you won’t be able to update it without overwriting your own work!
- Your design goes into: `/sass/theme`. Add your styles to the `/sass/theme/_theme.scss` file and your variables to the `/sass/theme/_theme_variables.scss`. Or add other .scss files into it and `@import` it into `/sass/theme/_theme.scss`.

## Installation

- Download the understrap folder from GitHub or from understrap.com
- IMPORTANT: If you download it from GitHub make sure you rename the "understrap-master.zip" file just to "understrap.zip" or you might have problems using child themes !!
- Upload it into your WordPress installation subfolder here: `/wp-content/themes/`
- Login to your WordPress backend
- Go to Appearance → Themes
- Activate the UnderStrap theme

## Developing With npm, Gulp and SASS and [Browser Sync][1]

### Installing Dependencies
- Make sure you have installed Node.js and Browser-Sync* (* optional, if you wanna use it) on your computer globally
- Then open your terminal and browse to the location of your UnderStrap copy
- Run: `$ npm install` and then: `$ gulp copy-assets`

### Running
To work and compile your Sass files on the fly start:

- `$ gulp watch`

Or, to run with Browser-Sync:

- First change the browser-sync options to reflect your environment in the file `/gulpfile.js` in the beginning of the file:
```javascript
var browserSyncOptions = {
    proxy: "localhost/theme_test/", // <----- CHANGE HERE
    notify: false
};
```
- then run: `$ gulp watch-bs`

## How to Use the Build-In Widget Slider

The front-page slider is widget driven. Simply add more than one widget to widget position “Hero”.
- Click on Appearance → Widgets.
- Add two, or more, widgets of any kind to widget area “Hero”.
- That’s it.

## RTL styles?
Just add a new file to the themes root folder called rtl.css. Add all alignments to this file according to this description:
https://codex.wordpress.org/Right_to_Left_Language_Support

## Page Templates

### Blank Template

The `blank.php` template is useful when working with various page builders and can be used as a starting blank canvas.

### Empty Template

The `empty.php` template displays a header and a footer only. A good starting point for landing pages.

### Full Width Template

The `fullwidthpage.php` template has full width layout without a sidebar.

### Vertical One Page Template

The `vertical-one-page.php` template displays all pages (except the one showing the posts) in a single vertical layout with a sliding navigation.
Additionally enables the user to control the order of each page by using the order page attribute field.

#### One Page Template How to

 1. Assuming that you have the following pages: Home, About and Contact
 2. Go to Appearance → Menus and add one **custom link** for each page
 3. On the URL field type a hash `#` and the name of the page in **lower case** so for example the link for Home becomes `#home`
 4. Edit the Home page and set as template the **Vertical One Page** (you only need to do this for the first page)
 5. Set the order of each page using the **Order** field from **Page Attributes** so for example if you want to display Home,
 Contact, About set the Home page to 1, the Contact to 2 and About to 3

[1] Visit [http://browsersync.io](http://browsersync.io) for more information on Browser Sync

Licenses & Credits
=
- Font Awesome: http://fontawesome.io/license (Font: SIL OFL 1.1, CSS: MIT License)
- Bootstrap: http://getbootstrap.com | https://github.com/twbs/bootstrap/blob/master/LICENSE (Code licensed under MIT documentation under CC BY 3.0.)
- Owl Carousel 2: http://www.owlcarousel.owlgraphic.com/ | https://github.com/smashingboxes/OwlCarousel2/blob/develop/LICENSE (Code licensed under MIT)
and of course
- jQuery: https://jquery.org | (Code licensed under MIT)
- WP Bootstrap Navwalker by Edward McIntyre: https://github.com/twittem/wp-bootstrap-navwalker | GNU GPL

[![Build Status](https://api.travis-ci.org/understrap/understrap.svg?branch=master)](https://travis-ci.org/understrap/understrap)
[![Wordpress Theme Version](https://img.shields.io/wordpress/theme/v/understrap.svg)](https://wordpress.org/themes/understrap)
[![Wordpress Theme Active Installs](https://img.shields.io/wordpress/theme/installs/understrap.svg)](https://wordpress.org/themes/understrap/)
[![Github Last Commit](https://img.shields.io/github/last-commit/understrap/understrap)](https://github.com/understrap/understrap/commits/master)
[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0)

#### See: [Official Demo](https://understrap.com) | Read: [Official Docs Page](https://docs.understrap.com/)

# Understrap WordPress Theme Framework

Website: [https://understrap.com](https://understrap.com)

Child Theme Project: [https://github.com/understrap/understrap-child](https://github.com/understrap/understrap-child)

Premium Child Themes: [https://understrap.com/child-themes/](https://understrap.com/child-themes/)

## About

Understrap is the renowned open-source WordPress starter theme that combines Underscores with Bootstrap. Trusted by more than 100,000 developers.

## License
Copyright 2021 [Howard Development & Consulting, LLC](https://howarddc.com)
Understrap is distributed under the terms of the GNU GPL version 2

http://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html

## Changelog
See [changelog](CHANGELOG.md)

## Documentation

Full documentation for this theme is available at [docs.understrap.com](https://docs.understrap.com).

## Basic Features

- Combines Underscore’s PHP/JS files and Bootstrap’s HTML/CSS/JS.
- Comes with Bootstrap (v4 and/or v5) Sass source files and additional .scss files. Nicely sorted and ready to add your own variables and customize the Bootstrap variables.
- Uses a single minified CSS file for all the basic stuff.
- [Font Awesome](http://fortawesome.github.io/Font-Awesome/) integration (v4.7.0)
- Jetpack ready
- WooCommerce support
- Contact Form 7 support
- [Child Theme](https://github.com/understrap/understrap-child) ready
- Translation ready

## Installation
There are several ways to install Understrap. We'll look at three of them: (1) classic install by uploading Understrap to a WordPress install, (2) using npm, and (3) using the theme directory in WordPress.

### Classic install
- Download the understrap folder from GitHub or from [https://understrap.com](https://understrap.com)
- IMPORTANT: If you download it from GitHub make sure you rename the "understrap-master.zip" file just to "understrap.zip" or you might have problems using child themes!
- Upload it into your WordPress installation theme subfolder: `/wp-content/themes/`
- Login to your WordPress backend
- Go to Appearance → Themes
- Activate the Understrap theme

### npm install
- Open your terminal
- Change to the directory where you want to add Understrap
- Type `npm install understrap`

### WordPress.org install
- Open your WordPress backend
- Click on "Appearance -> Themes"
- Hit the "Add new" button
- Search for "Understrap"
- Hit the "install" button
- Activate the theme

## Developing With npm, postCSS, Rollup, SASS and BrowserSync

This theme uses [sass](https://www.npmjs.com/package/sass) and [postCSS](https://postcss.org) to handle compiling all of the styles into one style sheet. The theme also includes [rollup.js](https://www.rollupjs.org/) to handle javascript compilation and minification. These choices are based on the same libraries and npm commands used in Bootstrap. In addition, it comes with [Browser Sync](http://browsersync.io) to handle live reloading while you develop.

### Confused by All the CSS, SCSS, and SASS Files?

Some basics about the files that come with Understrap:
- The theme itself uses the `/style.css` file only to identify the theme inside of WordPress. The file is not loaded by the theme and does not include any styles.
- The `/css/theme.css` and its minified little brother `/css/theme.min.css` file(s) provides all styles. It is composed of different SCSS sets and one variable file, all imported at `/src/sass/theme.scss`
- Your design goes into: `/src/sass/theme`.
  - Override Bootstrap by addind your variables to the `/src/sass/theme/_theme_variables.scss`
  - Add your custom styles to the `/src/sass/theme/_theme.scss` file
  - Or add other .scss files into it and `@import` it into `/src/sass/theme/_theme.scss`.

The same goes for Javascript. Just add your javascript to `/src/js/custom-javascript.js` and let rollup.js handle the rest.

### Installing Dependencies
- Make sure you have installed Node.js and Browser-Sync (optional) on your computer globally
- Then open your terminal and browse to the location of your Understrap copy
- Run: `$ npm install`

### Running
To work with and compile your Sass and Javascript files on the fly start:

```bash
npm run watch
```

Or, to run with Browser-Sync:

First change the browser-sync options to reflect your environment in the file `/build/browser-sync.config.js` in the beginning of the file:
```javascript
module.exports = {
	"proxy": "localhost/", // Change here
	"notify": false,
	"files": ["./css/*.min.css", "./js/*.min.js", "./**/*.php"]
};
```

then run:

```bash
npm run watch-bs
```

## Bootstrap 4 Legacy Build Process

Some of our build tasks have been duplicated to support both Bootstrap 4 and Boostrap 5 asset generation. The *default* version of tasks will generate v5 assets.

**CSS Tasks** `npm run css` will generate v5 assets, while `npm run css-bs4` will generate necessary assets for v4.

**JS Tasks** `npm run js` will generate v5 assets, while `npm run js-bs4` will generate necessary assets for v4.

**Watch Tasks** `npm run watch` and `npm run watch-bs` will only generate for v5. Once complete, run `npm run dist` to update v4.

**Dist Task** `npm run dist` will generate both v4 & v5 assets.

**Other Assets** This theme also includes a few additional files directories to support Bootstrap 4 in `/src/build-bootstrap4/`, `/src/sass/assets/bootstrap4/`, and `/src/js/bootstrap4.js`

## Block Editor (Gutenberg) Support

As of version 1.0.0, Understrap supports the block editor. The theme include "Bootstrap" styles automatically for default blocks like tables, captions, and blockquotes. Even further, the theme automatically parses your Bootstrap variables to load your custom color palette into the block editor, ensuring that your color choices match the front-end of the site.


*Note: Wide- and full-width blocks will not work with the sidebar templates. They'll simply display in a normal width. They will work, however, with any full width templates or if sidebars are globally disabled in the customizer.*

## How to Use the Built-In Widget Slider

The front-page slider is widget driven. Simply add more than one widget to widget position “Hero”.
- Click on Appearance → Widgets.
- Add two, or more, widgets of any kind to widget area “Hero”.
- That’s it.

## RTL styles?
Add a new file to the themes root folder called rtl.css. Add all alignments to this file according to this description:
https://codex.wordpress.org/Right_to_Left_Language_Support

## Page Templates
Understrap includes several different page template files to render a number of unique layouts.

### Blank Template

The `blank.php` template is useful when working with various page builders and can be used as a starting blank canvas.

### Empty Template

The `empty.php` template displays a header and a footer only. A good starting point for landing pages.

### Sidebar Templates

The theme also includes a number of templates for enabling the right and left sidebars.

### Full Width Template

The `fullwidthpage.php` template has full width layout without a sidebar.


Licenses & Credits
=
- Font Awesome: https://fontawesome.com/v4.7/license/ (Font: SIL OFL 1.1, (S)CSS: MIT)
- Bootstrap: http://getbootstrap.com | https://github.com/twbs/bootstrap/blob/master/LICENSE (MIT)
- WP Bootstrap Navwalker by Edward McIntyre & William Patton: https://github.com/wp-bootstrap/wp-bootstrap-navwalker (GNU GPLv3)

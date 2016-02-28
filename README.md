
[![NPM](https://nodei.co/npm/ink-docstrap.png?downloads=true)](https://nodei.co/npm/ink-docstrap/)

[![Dependency Status](https://david-dm.org/docstrap/docstrap.svg)](https://david-dm.org/docstrap/docstrap) [![devDependency Status](https://david-dm.org/docstrap/docstrap/dev-status.svg)](https://david-dm.org/docstrap/docstrap#info=devDependencies)

# DocStrap [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

DocStrap is [Bootstrap](http://twitter.github.io/bootstrap/index.html) based template for [JSDoc3](http://usejsdoc.org/).
In addition, it includes all of the themes from [Bootswatch](http://bootswatch.com/) giving you a great deal of look
and feel options for your documentation, along with a simple search. Additionally, it adds some options to the conf.json file that gives
you even more flexibility to tweak the template to your needs. It will also make your teeth whiter.

## Features ##

* Right side TOC for navigation in pages
* Integrated offline search
* Themed
* Customizable
* Syntax highlighting

### What It Looks Like ###
Here are examples of this template with the different Bootswatch themes:

+ [Cerulean](http://docstrap.github.io/docstrap/themes/cerulean)
+ [Cosmo](http://docstrap.github.io/docstrap/themes/cosmo)
+ [Cyborg](http://docstrap.github.io/docstrap/themes/cyborg)
+ [Flatly](http://docstrap.github.io/docstrap/themes/flatly)
+ [Journal](http://docstrap.github.io/docstrap/themes/journal)
+ [Lumen](http://docstrap.github.io/docstrap/themes/lumen)
+ [Paper](http://docstrap.github.io/docstrap/themes/paper)
+ [Readable](http://docstrap.github.io/docstrap/themes/readable)
+ [Sandstone](http://docstrap.github.io/docstrap/themes/sandstone)
+ [Simplex](http://docstrap.github.io/docstrap/themes/simplex)
+ [Slate](http://docstrap.github.io/docstrap/themes/slate)
+ [Spacelab](http://docstrap.github.io/docstrap/themes/spacelab)
+ [Superhero](http://docstrap.github.io/docstrap/themes/superhero)
+ [United](http://docstrap.github.io/docstrap/themes/united)
+ [Yeti](http://docstrap.github.io/docstrap/themes/yeti)

To change your theme, just change it in the `conf.json` file. See below for details.

## Ooooh, I want it! How do I get it? ##

If you manage your own version of jsdoc:

```bash
npm install ink-docstrap
```

When using [grunt](http://gruntjs.com/), please look at [grunt-jsdoc](https://github.com/krampstudio/grunt-jsdoc) which you can use with
docstrap.

### Command Line Example ###

```bash
jsdoc -c path/to/conf.json -t ./node_modules/ink-docstrap/template -R README.md -r .
```

The `-c` sets the config, and the docstrap README does talk about the options you can put in templates that docstrap is supposed to look for.

The `-t` sets the template. This is the option you need to set to get the docstrap template to be used.

The `-R` sets a markdown file to be the front page of the documentation.

The `-r` tells jsdoc to run recursively.

The `.` says from current directory.

## Configuring the template ##

DocStrap ships with a `conf.json` file in the template/ directory. It is just a regular old
[JSDoc configuration file](http://usejsdoc.org/about-configuring-jsdoc.html), but with the following new options:

```javascript
"templates": {
	"systemName"            : "{string}",
	"footer"                : "{string}",
	"copyright"             :  "{string}",
	"includeDate"           : "{boolean}",
	"navType"               : "{vertical|inline}",
	"theme"                 : "{theme}",
	"linenums"              : "{boolean}",
	"collapseSymbols"       : "{boolean}",
	"inverseNav"            : "{boolean}",
	"outputSourceFiles"     : "{boolean}" ,
	"outputSourcePath"      : "{boolean}",
	"dateFormat"            : "{string}",
	"syntaxTheme"           : "{string}",
	"sort"					: "{boolean|string}"
}

```
### Options ###

*   __systemName__
	The name of the system being documented. This will appear in the page title for each page
*   __footer__
	Any markup want to appear in the footer of each page. This is not processed at all, just printed exactly as you enter it
*   __copyright__
	You can add a copyright message below the footer and above the JSDoc timestamp at the bottom of the page
*   __includeDate__
	By default, the current date is always shown in the footer of the generated documentation. You can omit the current date by setting this option to `false`
*   __navType__
	The template uses top level navigation with dropdowns for the contents of each category. On large systems these dropdowns
	can get large enough to expand beyond the page. To make the dropdowns render wider and stack the entries vertically, set this
	option to `"inline"`. Otherwise set it to `"vertical"` to make them regular stacked dropdowns.
*   __theme__
	This is the name of the them you want to use **in all lowercase**. The valid options are
	+ `cerulean`
	+ `cosmo`
	+ `cyborg`
	+ `flatly`
	+ `journal`
	+ `lumen`
	+ `paper`
	+ `readable`
	+ `sandstone`
	+ `simplex`
	+ `slate`
	+ `spacelab`
	+ `superhero`
	+ `united`
	+ `yeti`
*   __linenums__
	When true, line numbers will appear in the source code listing. If you have
	[also turned that on](http://usejsdoc.org/about-configuring-jsdoc.html).
*   __collapseSymbols__
	If your pages have a large number of symbols, it can be easy to get lost in all the text. If you turn this to `true`
	all of the symbols in the page will roll their contents up so that you just get a list of symbols that can be expanded
	and collapsed.
*   __analytics__ Add a [Google Analytics](http://www.google.com/analytics) code to the template output
 _e.g._ `"analytics":{"ua":"UA-XXXXX-XXX", "domain":"XXXX"}`
    * __ua__ The google agent (see Google Analytics help for details)
    * __domain__ The domain being served. (see Google Analytics help for details)
*   __inverseNav__
	Bootstrap navbars come in two flavors, regular and inverse where inverse is generally higher contrast. Set this to `true` to
	use the inverse header.
*   __outputSourceFiles__
	When true, the system will produce source pretty printed file listings with a link from the documentation.
*	__outputSourcePath__
	When `outputSourceFiles` is `false`, you may still want to name the file even without a link to the pretty printed output.
	Set  this to `true` when `outputSourceFiles` is `false`. `outputSourceFiles` when `true` takes precedence over this setting.
*   __dateFormat__ The date format to use when printing dates. It accepts any format string understood by [moment.js](http://momentjs.com/docs/#/displaying/format/)
*   __syntaxTheme__ String that determines the theme used for code blocks. Default value is `"default"`. It can be any value supported
    at [sunlight themes](https://github.com/tmont/sunlight/tree/master/src/themes) which right now consists of...uh...`"default"` and `"dark"`,
    but at least you have it if you need it.
*  __sort__ Defaults to true. Specifies whether jsdoc should sort data or use file order. Can also be a string and if so it is passed to jsdoc directly. The default string is `"longname, version, since"`.

## Syntax Highlighting ##

### Language ###

The default language will be JavaScript, but there are a couple of ways to secify the language.

DocStrap support the language specified in the standard way e.g.

```
```html
<html></html>
```

DocStrap also introduces a new documentation tag which can appear inside any example block in source code,
or in any fenced code block in markdown: `{@lang languageName}`, where
_`language`_ can be any of the languages supported by [Sunlight](http://sunlightjs.com/)

When in a doclet, add the tag just after the `@example` tag like this:

`@example {@lang xml}`
`<div>This is the most interesting web site ever</div>`

These are the supported languages.

* ActionScript
* bash
* C/C++
* C♯
* CSS
* Diff
* DOS batch
* Erlang
* Haskell
* httpd (Apache)
* Java
* JavaScript
* Lisp
* Lua
* MySQL
* nginx
* Objective-C
* Perl
* PHP
* PowerShell
* Python
* Ruby
* Scala
* T-SQL
* VB.NET
* XML (HTML)

### Example Caption ###

If you want a caption to your example, add it in a HTML caption before your example e.g.

```
@example <caption>my caption</caption>
{@lang xml}
<mycode></mycode>
```

## Customizing DocStrap ##
No template can meet every need and customizing templates is a favorite pastime of....well, no-one, but you may need to anyway.
First make sure you have [bower](https://github.com/bower/bower) and [grunt-cli](https://github.com/gruntjs/grunt-cli) installed.
Fetch the source using `git` or grab the [zip file from github.](https://github.com/docstrap/docstrap/archive/master.zip) and unzip
it somewhere. Everything that follows happens in the unzip directory.

Next, prepare the environment:

    bower install

and

    npm install

When that is done, you have all of the tools to start modifying the template. The template, like Bootstrap, uses [less](http://lesscss.org/).
The way it works is that `./styles/main.less` pulls in the bootstrap files uncompiled so that you have access to all of bootstraps mixins, colors,
etc, that you would want. There are two more files in that directory, `variables.less`, `bootswatch.less`. These are the
theme files and you can modify them, but keep in mind that if you apply a new theme (see below) those files will be overwritten. It is best
to keep your changes to the `main.less` file.

To compile your changes to `main.less` and any other files it loads up,

	grunt less

The output is will be put in `./template/static/styles/site.<theme-name>.css`. The next time you create your documentation, it
will have the new css file included.

To apply a different template to the `styles` directory to modify, open up the `conf.json` in the template directory and
change the `theme` option to the theme you want. Then

	grunt apply

And the new theme will be in `variables.less`, `bootswatch.less`. Don't forget to compile your changes using `grunt apply` to
get that change into the template.

**NOTE** that these steps are not necessary to just change the theme, this is only to modify the theme. If all you want to do is
change the theme, just update conf.json with the new theme and build your docs!

## Contributing ##
Yes! Contribute! Test! Share your ideas! Report Bugs!

### Contributers ###

*Huge* thanks to all contributors. If your name should be here, but isn't, please let us know

* [marklagendijk](https://github.com/marklagendijk)
* [michaelward82](https://github.com/michaelward82)
* [kaustavdm](https://github.com/kaustavdm)
* [vmeurisse](https://github.com/vmeurisse)
* [bmathern](https://github.com/bmathern)
* [jrkim123us](https://github.com/jrkim123us)
* [shawke](https://github.com/shawke)
* [mar10](https://github.com/mar10)
* [mwcz](https://github.com/mwcz)
* [pocesar](https://github.com/pocesar)
* [hyperandroid](https://github.com/hyperandroid)
* [vmadman](https://github.com/vmadman)
* [whitelynx](https://github.com/whitelynx)
* [tswaters](https://github.com/tswaters)
* [lukeapage](https://github.com/lukeapage)
* [rcosnita](https://github.com/rcosnita)


## History ##

## 1.1.4 ##

 * Remove the unreadable orange on pre/code tags and use a dark red. Remove white background as is readable on black or white.

## 1.1.3 ##

 * Get sort option from navOptions as per docs
 * tweaks from bootswatch

## 1.1.2 ##

 * Allow example captions to contain markdown if configured in the markdown config `includeTags` section.
 * Fixes full path used as source URL for projects with one source file
 * Allow users to update the default template layout file

## 1.1.1 ##

 * Bootswatch update
 * Add viewport meta tag to html for better mobile experience

## 1.1.0 ##

 * Added includeDate option

## 1.0.5 ##

 * Navigation to anchor links now works in IE (with some flicker)
 * links to other pages now work (with some flicker in some browsers)

## 1.0.4 ##

 * Search results no longer erroneously included in side navbar
 * Tutorials now get page titles consistent with everything else
 * Improvements to the highlighted nav heading

## 1.0.3 ##

 * Drop-down shows a scrollbar when too big (regression in 1.0.1)

## 1.0.2 ##

 * Support older jsdoc by not looking in "interfaces"

## 1.0.1 ##

 * Tweak side nav and dropdowns to be the bootswatch style
 * Make the documentation responsive

## 1.0.0 ##

 * Bump to follow semver (initial development is well and truly over)
 * Corrected list of themes
 * Added Search
 * Remove highlightTutorialCode option - it didnt work

## 0.5.4 ##

 * Fix layout glitch on hte bottom of code samples
 * Support for specifying the language for fenced code blocks in the normal way
 * Fix the active item in some themes, which was missing a background
 * Tables get marked as tables
 * Dependency updates

## 0.5.3 ##

 * Removed duplicate headers
 * Remove "Index" header
 * re-fixed navigation
 * removed some dubious features (now pr's that can be re-added with a little polishing)

## 0.5.2 ##
Major update__. Amazing help from [tswaters](https://github.com/tswaters) to solve a bunch of little problems and a to bring the codebase up to Bootstrap3.
Make sure you are running the latest version of JSDoc before using this build.

Again huge, huge thanks to [tswaters](https://github.com/tswaters). Make sure you send him thanks or a tip!!!!!

### v0.4.15 ###
* PR Issue #76
* PR Issue #77

### v0.4.14 ###
* Issue #69

### v0.4.13 ###
* Issue #68

### v0.4.11 ###
* Pull Request #59

### v0.4.8 ###
* Issue #58

### v0.4.7 ###
* Issue #57

### v0.4.5 ###
* Issue #55
* Issue #54
* Issue #52
* Issue #51
* Issue #50
* Issue #45
* Issue #44

### v0.4.3 ###
* Issue #46
* Issue #46
* Issue #47

### v0.4.1-1###
* Issue #44
* Update documentation
* Issue #43
* Issue #42
* Issue #34

### v0.4.0 ###
* Issue #41
* Issue #40
* Issue #39
* Issue #36
* Issue #32

### v0.3.0 ###
* Fixed navigation at page top
* Adds -d switch to example jsdoc command.
* Fixed typo in readme
* Improve search box positioning and styles
* Add dynamic quick search in TOC
* Fix for line numbers styling issue

### v0.2.0 ###

* Added jump to source linenumers - still a problem scrolling with fixed header
* changed syntax highlighter to [sunlight](http://sunlightjs.com/)
* Modify incoming bootswatch files to make font calls without protocol.

### v0.1.0 ###
Initial release


## Notices ##
If you like DocStrap, be sure and check out these excellent projects and support them!

[JSDoc3 is licensed under the Apache License](https://github.com/jsdoc3/jsdoc/blob/master/LICENSE.md)

[So is Bootstrap](https://github.com/twitter/bootstrap/blob/master/LICENSE)

[And Bootswatch](https://github.com/thomaspark/bootswatch/blob/gh-pages/LICENSE)

[TOC is licensed under MIT](https://github.com/jgallen23/toc/blob/master/LICENSE)

[Grunt is also MIT](https://github.com/gruntjs/grunt-cli/blob/master/LICENSE-MIT)

DocStrap [is licensed under the MIT license.](https://github.com/docstrap/docstrap/blob/master/LICENSE.md)

[Sunlight uses the WTFPL](http://sunlightjs.com/)

## License ##
DocStrap Copyright (c) 2012-2015 Terry Weiss & Contributors. All rights reserved.

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

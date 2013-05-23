# DocStrap #

DocStrap is [Bootstrap](http://twitter.github.io/bootstrap/index.html) based template for [JSDoc3](http://usejsdoc.org/).
In addition, it includes all of the themes from [Bootswatch](http://bootswatch.com/) giving you a great deal of look
and feel options for your documentation. Additionally, it adds some options to the conf.json file that gives
you even more flexibility to tweak the template to your needs. It will also make your teeth whiter.

## Features ##
* Fixed navigation at page top
* Right side TOC for navigation in pages
* Themed
* Customizable

### What It Looks Like ###
Here are examples of this template with the different Bootswatch themes:

+ [Amelia](http://terryweiss.github.io/docstrap/themes/amelia)
+ [Cerulean](http://terryweiss.github.io/docstrap/themes/cerulean)
+ [Cosmo](http://terryweiss.github.io/docstrap/themes/cosmo)
+ [Cyborg](http://terryweiss.github.io/docstrap/themes/cyborg)
+ [Flatly](http://terryweiss.github.io/docstrap/themes/flatly)
+ [Journal](http://terryweiss.github.io/docstrap/themes/journal)
+ [Readable](http://terryweiss.github.io/docstrap/themes/readable)
+ [Simplex](http://terryweiss.github.io/docstrap/themes/simplex)
+ [Slate](http://terryweiss.github.io/docstrap/themes/slate)
+ [Spacelab](http://terryweiss.github.io/docstrap/themes/spacelab)
+ [Spruce](http://terryweiss.github.io/docstrap/themes/spruce)
+ [Superhero](http://terryweiss.github.io/docstrap/themes/superhero)
+ [United](http://terryweiss.github.io/docstrap/themes/united)

## Ooooh, I want it! How do I get it?##
First grab the [zip file from github.](https://github.com/terryweiss/docstrap/archive/master.zip) Unzip it
to your favorite hard drive and ask JSDoc to use it. Like so:

	<path/to/jsdoc>/jsoc mysourcefiles/* -t <path.to.unzipped>/template -c <path.to.unzipped>/conf.json  <path.to.output>/

Also take a gander at [JSDoc's command line options](http://usejsdoc.org/about-commandline.html).

## Configuring the template ##

DocStrap ships with a `conf.json` file in the template/ directory. It is just a regular old
[JSDoc configuration file](http://usejsdoc.org/about-configuring-jsdoc.html), but with the following new options:
	"templates": {
		"systemName"      : "{string}",
		"footer"          : "{string}",
		"copyright"       : "{string}",
		"navType"         : "{vertical|inline}",
		"theme"           : "{theme}",
		"linenums"        : {boolean},
		"collapseSymbols" : {boolean},
		"inverseNav"      : {boolean}
	}

### Options ###

*   _systemName_
	The name of the system being documented. This will appear in the page title for each page
*   _footer_
	Any markup want to appear in the footer of each page. This is not processed at all, just printed exactly as you enter it
*   _copyright_
	You can add a copyright message below the _footer_ and above the JSDoc timestamp at the bottom of the page
*   _navType_
	The template uses top level navigation with dropdowns for the contents of each category. On large systems these dropdowns
	can get large enough to expand beyond the page. To make the dropdowns render wider and stack the entries vertically, set this
	option to `"inline"`. Otherwise set it to `"vertical"` to make them regular stacked dropdowns.
*   _theme_
	This is the name of the them you want to use **in all lowercase**. The valid options are
	+ `amelia`
	+ `cerulean`
	+ `cosmo`
	+ `cyborg`
	+ `flatly`
	+ `journal`
	+ `readable`
	+ `simplex`
	+ `slate`
	+ `spacelab`
	+ `spruce`
	+ `superhero`
	+ `united`
*   _linenums_
	When true, line numbers will appear in the source code listing. If you have
	[also turned that on](http://usejsdoc.org/about-configuring-jsdoc.html).
*   _collapseSymbols_
	If your pages have a large number of symbols, it can be easy to get lost in all the text. If you turn this to `true`
	all of the symbols in the page will roll their contents up so that you just get a list of symbols that can be expanded
	and collapsed.
*   _inverseNav_
	Bootstrap navbars come in two flavors, regular and inverse where inverse is generally higher contrast. Set this to `true` to
	use the inverse header.





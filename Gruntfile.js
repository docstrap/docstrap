"use strict";
var path = require( "path" );
var sys = require( "lodash" );
var http = require( "http" );
var async = require( "async" );
var path = require( "path" );
var fs = require( "fs" );

var jsdocPublicApi = {
	src       : ["./node_modules/jsdoc/test/fixtures/*.js"],
	dest      : "./dox",
	tutorials : "./",
	template  : "./template",
	config    : "./template",
	options   : " --lenient --verbose"
};

var jsdocDefaultApi = {
	src       : ["./node_modules/jsdoc/test/fixtures/*.js"],
	dest      : "./jsdox",
	tutorials : "./",
	template  : "./node_modules/jsdoc/templates/default",
	config    : "./template/jsdoc.conf.json",
	options   : " --lenient --verbose"
};

var jsdocCollectorApi = {
	src       : ["../collector/collector.js", "../collector/README.md"],
	dest      : "./collectordox",
	tutorials : "./",
	template  : "./template",
	config    : "./template/jsdoc.conf.json",
	options   : "--recurse --lenient --verbose"
};

function jsdocCommand( jsdoc ) {
	var cmd = [];
	cmd.unshift( jsdoc.options );
//	cmd.unshift( "--private" );
//	cmd.push( "-u " + path.resolve( jsdoc.tutorials ) );
	cmd.push( "-d " + path.resolve( jsdoc.dest ) );
	cmd.push( "-t " + path.resolve( jsdoc.template ) );
	cmd.push( "-c " + path.resolve( jsdoc.config ) );
	sys.each( jsdoc.src, function ( src ) {
		cmd.push( path.resolve( src ) );
	} );
	cmd.unshift( path.resolve( "./node_modules/jsdoc/jsdoc" ) );
	return cmd.join( " " );
}
var tasks = {
	shell : {
		options : {
			stdout : true,
			stderr : true
		},
		docs    : {
			command : jsdocCommand( jsdocPublicApi )
		},
		jsdocs  : {
			command : jsdocCommand( jsdocDefaultApi )
		},
		cdocs   : {
			command : jsdocCommand( jsdocCollectorApi )
		}
	},
	less  : {
		dev : {

			files : {
				"template/static/styles/site.<%= jsdocConf.templates.theme %>.css" : "styles/main.less"
			}
		}
	}
};

module.exports = function ( grunt ) {
	tasks.jsdocConf = grunt.file.readJSON( 'template/jsdoc.conf.json' );
	grunt.initConfig( tasks );


	grunt.loadNpmTasks( 'grunt-contrib-less' );
	grunt.loadNpmTasks( 'grunt-shell' );

	grunt.registerTask( "bootswatch", "", function () {
		var toRun = [];

		var done = this.async();
		getBootSwatchList( function ( err, list ) {
			if ( err ) {return done( err );}

			sys.each( list.themes, function ( entry ) {

				toRun.push( "swatch" + entry.name );
				grunt.registerTask( "swatch" + entry.name, sys.partial( applyTheme, grunt, entry ) );

				var key = "template/static/styles/site." + entry.name.toLowerCase() + ".css";
				var def = {};
				def[key] = "styles/main.less";
				tasks.less["swatch" + entry.name] = {
					files : def
				};
				toRun.push( "less:swatch" + entry.name );
			} );
			grunt.task.run( toRun );
			done();
		} );

	} );
};

function applyTheme( grunt, definition ) {
	var done = this.async();
	async.waterfall( [
		function ( cb ) {
			getBootSwatchComponent( definition.less, function ( err, swatch ) {
				if ( err ) {return cb( err );}
				var fullPath = path.join( __dirname, "styles/bootswatch.less" );
				fs.writeFile( fullPath, swatch, cb );
			} );
		},
		function ( cb ) {
			getBootSwatchComponent( definition.lessVariables, function ( err, swatch ) {
				if ( err ) {return cb( err );}
				var fullPath = path.join( __dirname, "styles/variables.less" );
				fs.writeFile( fullPath, swatch, cb );
			} );
		}
	], done );
}

function getBootSwatchList( done ) {
	var options = {
		hostname : 'api.bootswatch.com',
		port     : 80,
		path     : '/',
		method   : 'GET'
	};
	var body = "";
	var req = http.request( options, function ( res ) {
		res.setEncoding( 'utf8' );
		res.on( 'data', function ( chunk ) {
			body += chunk;
		} );

		res.on( 'end', function () {
			done( null, JSON.parse( body ) );
		} );
		res.on( 'error', function ( e ) {
			done( 'problem with response: ' + e.message );
		} );
	} );

	req.on( 'error', function ( e ) {
		done( 'problem with request: ' + e.message );
	} );
	req.end();
}

function getBootSwatchComponent( url, done ) {
	var body = "";
	var req = http.request( url, function ( res ) {
		res.setEncoding( 'utf8' );
		res.on( 'data', function ( chunk ) {
			body += chunk;
		} );

		res.on( 'end', function () {
			done( null, body );
		} );
		res.on( 'error', function ( e ) {
			done( 'problem with response: ' + e.message );
		} );
	} );

	req.on( 'error', function ( e ) {
		done( 'problem with request: ' + e.message );
	} );
	req.end();
}


/**
 * Created by james on 8/13/14.
 *
 * Inserts @lends tags for backbone.<pseudoclass>.extend and _.extend
 * modules. If you have a module that declasres a class with a @class
 * tag, this will look for a matching '.extend' and then insert the 
 * appropriate @lends tag before object containing prototype or static
 * properties.
 * 
 */
/*jslint node:true, vars:true */
/*global exports */
"use strict";

var _ = require('underscore');

var regexes = {
    BACKBONE_EXTEND: /(\/\*\*(?:[ \S]*\n)(?: *\*[\S ]*\n)* \* @class ([A-Za-z_\.]+) *\n(?: *\*[\S ]*\n)* *\*\/ ?\n(?:var )?(?:[A-Za-z_]+ ?= ?)?(?:module\.exports ?= ?)?[A-Za-z\._]+\.extend\()(\{)/g,
    UNDERSCORE_EXTEND_PROTOTYPE: /(_\.extend\(\s*([A-Za-z_]+)\.prototype\s*,\s*)(\{)/g,
    UNDERSCORE_EXTEND_STATIC: /(_\.extend\(\s*([A-Za-z_]+)\s*,\s*)(\{)/g,
    FILE_CLASS_NAME: /\* ?@class ([A-Za-z]+)/g
};


var BackboneModuleParser = function (filePath, source) {
    this.filePath = filePath;
    this.fileName = this._getFileNameWithPath(filePath);
    this.origSource = source;
    this.newSource = source;
};

_.extend(BackboneModuleParser.prototype, {
    _getFileNameWithPath: function (path) {
        var segs = path.split('/');
        var last = _.last(segs);
        segs = last.split('.');
        return _.first(segs);
    },
    _getAllMatches: function (regex, source) {
        source = source || this.newSource;
        var rawMatches = source.match(regex);
        var i = 0;
        var len = rawMatches ? rawMatches.length : 0;
        var allMatches = [];
        var result;
        for (i; i < len; i++) {
            regex.lastIndex = 0;
            result = regex.exec(rawMatches[i]);
            if (result && result.length === 4) {
                allMatches.push(result);
            }
        }
        return allMatches;
    },
    _findFileClassNames: function () {
        var matches = this.origSource.match(regexes.FILE_CLASS_NAME);
        var classNames = [];
        if (matches && matches.length) {
            _.each(matches, function (match) {
                classNames.push(match.replace(/\* ?@class /, ''));
            });
        }
        return classNames;
    },
    _findPrimaryClassName: function () {
        var self = this;
        var classNames = this.fileClassNames;
        if (classNames.length === 1) {
            return _.first(classNames);
        }
        return _.find(classNames, function (cn) {
            return self.fileName === cn;
        });
    },
    _testExtendMatches: function (matches) {
        return matches && matches.length >= 4 && !!this._getClassNameFromMatches(matches);
    },
    _replaceExtendRegex: function (regex, segs, className, isProto) {
        regex.lastIndex = 0;
        var protoStr = isProto ? '.prototype */' : ' */';
        return this.newSource.replace(regex, segs.join('/** @lends ' + className + protoStr));
    },
    _getSegmentsForMatches: function (matches) {
        return [matches[1], matches[3]];
    },
    _getClassNameFromMatches: function (matches) {
        var className = matches[2];
        if (this.fileClassNames.indexOf(className) > -1) {
            return className;
        }
        return null;
    },
    _replaceExtendTypeForRegex: function (regex, isPrototype) {
        var allMatches = this._getAllMatches(regex);
        var i = 0;
        var source = this.newSource;
        var className;
        for (i; i < allMatches.length; i++) {
            if (this._testExtendMatches(allMatches[i])) {
                className = this._getClassNameFromMatches(allMatches[i]);
                if (className) {
                    source = this._replaceExtendRegex(regex, this._getSegmentsForMatches(allMatches[i]), className, isPrototype);
                }
            }
        }
        return source;
    },
    _replaceBackboneExtend: function () {
        // var segs = this.backboneExtendSegments;
        // return this._replaceExtendRegex(regexes.BACKBONE_EXTEND, segs, true);
        return this._replaceExtendTypeForRegex(regexes.BACKBONE_EXTEND, true);
    },
    _replaceUnderscoreProtoExtend: function () {
        // var segs = this.underscoreProtoExtendSegments;
        // return this._replaceExtendRegex(regexes.UNDERSCORE_EXTEND_PROTOTYPE, segs, true);
        return this._replaceExtendTypeForRegex(regexes.UNDERSCORE_EXTEND_PROTOTYPE, true);
    },
    _replaceUnderscoreStaticExtend: function () {
        // var segs = this.underscoreStaticExtendSegments;
        // return this._replaceExtendRegex(regexes.UNDERSCORE_EXTEND_STATIC, segs, false);
        return this._replaceExtendTypeForRegex(regexes.UNDERSCORE_EXTEND_STATIC, false);
    },
    parse: function () {

        this.fileClassNames = this._findFileClassNames();
        if (!this.fileClassNames.length) {
            return this.newSource;
        }

        this.newSource = this._replaceBackboneExtend();
        this.newSource = this._replaceUnderscoreProtoExtend();
        this.newSource = this._replaceUnderscoreStaticExtend();

        return this.newSource;
    }
});

exports.handlers = {
    beforeParse: function (e) {
        var parser = new BackboneModuleParser(e.filename, e.source);
        var parsed = parser.parse();

        e.source = parsed;
    }
};
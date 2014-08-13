/**
 * Created by james on 8/13/14.
 *
 * Inserts @lends tags for backbone.extend and _.extend
 * modules. If you have a 
 * 
 */
/*jslint node:true, vars:true */
/*global exports */
"use strict";

var _ = require('underscore');

var regexes = {
    BACKBONE_EXTEND: /(\/\*\*[\s\S]+?(?:@class ([A-Za-z_]+)?)[\s\S]+?\*\/\n[\s]*(?:var )?(?:[A-Za-z_]+ ?= ?)?(?:module\.exports ?= ?)?[A-Za-z_]+\.extend\()(\{)/g,
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
    _getMatches: function (regex, source) {
        source = source || this.newSource;
        return regex.exec(source);
    },
    _getFirstMatch: function (regex, source) {
        var matches = this._getMatches(regex, source);
        if (matches && matches.length) {
            return matches[1];
        }
        return null;
    },
    _findFileClassNames: function () {
        var matches = this.origSource.match(regexes.FILE_CLASS_NAME);
        var classNames = [];
        if (matches && matches.length) {
            _.each(matches, function (match) {
                classNames.push(match.replace('/\* ?@class /', ''));
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
    _matchesAreForClassName: function (matches) {
        return matches && matches.length > 1 && matches[2] === this.primaryFileClassName;
    },
    _findBackboneExtendSegments: function () {
        var matches = this._getMatches(regexes.BACKBONE_EXTEND);
        if (this._testExtendMatches(matches)) {
            return [matches[1], matches[3]];
        }
        return null;
    },
    _testExtendMatches: function (matches) {
        return matches && matches.length >= 4 && matches[2] === this.primaryFileClassName;
    },
    _replaceExtendRegex: function (regex, segs, isProto) {
        var protoStr = isProto ? '.prototype */' : ' */';
        return this.newSource.replace(regex, segs.join('/** @lends ' + this.primaryFileClassName + protoStr));
    },
    _replaceBackboneExtend: function () {
        var segs = this.backboneExtendSegments;
        return this._replaceExtendRegex(regexes.BACKBONE_EXTEND, segs, true);
    },
    _replaceUnderscoreProtoExtend: function () {
        var segs = this.underscoreProtoExtendSegments;
        return this._replaceExtendRegex(regexes.UNDERSCORE_EXTEND_PROTOTYPE, segs, true);
    },
    _replaceUnderscoreStaticExtend: function () {
        var segs = this.underscoreStaticExtendSegments;
        return this._replaceExtendRegex(regexes.UNDERSCORE_EXTEND_STATIC, segs, false);
    },
    _findUnderscoreProtoExtendSegments: function () {
        var matches = this._getMatches(regexes.UNDERSCORE_EXTEND_PROTOTYPE);
        if (this._testExtendMatches(matches)) {
            return [matches[1], matches[3]];
        }
        return null;
    },
    _findUnderscoreStaticExtendSegments: function () {
        var matches = this._getMatches(regexes.UNDERSCORE_EXTEND_STATIC);
        if (this._testExtendMatches(matches)) {
            return [matches[1], matches[3]];
        }
        return null;
    },
    parse: function () {

        this.fileClassNames = this._findFileClassNames();
        this.primaryFileClassName = this._findPrimaryClassName();
        if (!this.primaryFileClassName) {
            return this.newSource;
        }

        this.backboneExtendSegments = this._findBackboneExtendSegments();

        if (this.backboneExtendSegments) {
            this.newSource = this._replaceBackboneExtend();
        }

        this.underscoreProtoExtendSegments = this._findUnderscoreProtoExtendSegments();
        if (this.underscoreProtoExtendSegments) {
            this.newSource = this._replaceUnderscoreProtoExtend();
        }

        this.underscoreStaticExtendSegments = this._findUnderscoreStaticExtendSegments();
        if (this.underscoreStaticExtendSegments) {
            this.newSource = this._replaceUnderscoreStaticExtend(this.underscoreStaticExtendSegments);
        }

        return this.newSource;
    }
});

exports.handlers = {
    beforeParse: function (e) {
        var parsed = new BackboneModuleParser(e.filename, e.source).parse();
        e.source = parsed;
    }
};
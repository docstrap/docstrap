"use strict";

var fs = require("fs"),
    parseMarkdown = require('jsdoc/util/markdown').getParser(),
    includeRegex = /@include (.*)/ig,
    INCLUDE_TAG_NAME = "@include";

/**
 * This method replaces @include tags with the actual content from external file passed as parameter.
 * @param {String} content The content in which we want to replace include tags with their actual external links content.
 * param {Boolean} forceMarkdownParse tells if the external content must be parsed using markdown parser.
 * @returns {String} The newly generated content with all include tags replaced by the external content where they point.
 */
function replaceIncludeTag(content, forceMarkdownParse) {
    var includes = content.match(includeRegex),
        includedFiles = [];

    if (content.indexOf(INCLUDE_TAG_NAME) == -1) {
        return content;
    }

    for (var idx = 0; idx < includes.length; idx++) {
        var includedFile = /@include (.*)(}|\\n)/i.exec(includes[idx].trim());

        if (!includedFile) {
            includedFile = /@include (.*)/i.exec(includes[idx].trim())

            if (!includedFile) {
                continue;
            }
        }

        var origInclude = includedFile[0];

        if (origInclude.indexOf("}") != -1) {
            origInclude = "{" + origInclude;
        }

        includedFile = process.cwd() + "/" + includedFile[1].replace("}", "");

        if (includedFiles.indexOf(includedFile) != -1) {
            continue;
        }

        includedFiles.push(includedFile);

        var fileContent = fs.readFileSync(includedFile).toString("utf8");

        if (forceMarkdownParse) {
            fileContent = parseMarkdown(fileContent);
        }

        while (content.indexOf(origInclude) != -1) {
            content = content.replace(origInclude, fileContent);
        }
    }    

    return content;
}

/**
 * This module provides functionality for include tag. @include tag
 * accepts only one argument which is the path relative to the folder
 * where jsdoc is executed (usually root folder of the documented project).
 */
exports.handlers = {
    /**
     * This method is invoked automatically by jsdoc whenever jsdoc comment is found during parsing. It automatically 
     * replaces include tags with the file content passed as parameter.
     */
    jsdocCommentFound: function(e) {
        e.comment = replaceIncludeTag(e.comment, false);
    }
};

exports.replaceIncludeTag = function(content, forceMarkdownParse) {
    return replaceIncludeTag(content, forceMarkdownParse);
};
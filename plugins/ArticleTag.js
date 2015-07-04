"use strict";

var ARTICLE_REGEX = /\{(@article (.*))\}/gi;

/**
 * This method extracts all article tags from the given content and builds a list of links.
 * @param {String} content The content from where we extract all article tags.
 * @returns {Object} a new object containing the content without article tags in it. This object also contains each article name extracted from the given content.
 */
function extractArticleNames(content) {
    var matchedTags = content.match(ARTICLE_REGEX),
        result = {
            "content": content,
            "names": []
        };

    if (!matchedTags) {
        return result;
    }

    matchedTags.forEach(function(match) {
        var groups = /\{(@article (.*))\}/i.exec(match);

        result.names.push(groups[2]);
    });

    return result;
};

exports.extractArticleNames = extractArticleNames;
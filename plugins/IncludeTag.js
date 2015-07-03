"use strict";

var fs = require("fs");

exports.handlers = {
    jsdocCommentFound: function(e) {
        var comment = e.comment,
            includeRegex = /@include (.*)/ig;

        if (comment.indexOf("@include") == -1) {
            return;
        }

        var includes = comment.match(includeRegex),
            includedFiles = [];

        for (var idx = 0; idx < includes.length; idx++) {
            var includedFile = /@include (.*)/i.exec(includes[idx].trim());

            if (!includedFile) {
                continue;
            }

            var origInclude = includedFile[0];
            includedFile = process.cwd() + "/" + includedFile[1];

            if (includedFiles.indexOf(includedFile) != -1) {
                continue;
            }

            includedFiles.push(includedFile);

            var content = fs.readFileSync(includedFile).toString("utf8");

            while (e.comment.indexOf(origInclude) != -1) {
                e.comment = e.comment.replace(origInclude, content);
            }
        }
    }
};
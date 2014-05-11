(function(sunlight, undefined){

	if (sunlight === undefined || sunlight["registerLanguage"] === undefined) {
		throw "Include sunlight.js before including language files";
	}

	sunlight.registerLanguage("diff", {
		doNotParse: /(?!x)x/,
		
		scopes: {
			header: [ ["---", "\n", null, true], ["+++", "\n", null, true], ["***", "\n", null, true] ],
			added: [ ["+", "\n", null, true] ],
			removed: [ ["-", "\n", null, true] ],
			modified: [ ["!", "\n", null, true] ],
			unchanged: [[" ", "\n", null, true]],
			rangeInfo: [ ["@@", "\n", null, true] ],
			mergeHeader: [ ["Index:", "\n", null, true], ["=", "\n", null, true] ]
		},
		
		customTokens: {
			noNewLine: {
				values: ["\\ No newline at end of file"],
				boundary: "\\b"
			}
		}
		
	});
}(this["Sunlight"]));
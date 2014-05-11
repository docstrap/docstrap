(function(sunlight, undefined){

	if (sunlight === undefined || sunlight["registerLanguage"] === undefined) {
		throw "Include sunlight.js before including language files";
	}

	sunlight.registerLanguage("sln", {
		keywords: [
			"Project", "EndProject", 
			"GlobalSection", "Global", "EndGlobalSection", "EndGlobal"
		],
		
		customTokens: {
			sectionName: {
				values: [
					"preSolution", "postSolution"
				],
				boundary: "\\b"
			}
		},
		
		scopes: {
			string: [ ["\"", "\"", ["\\\"", "\\\\"]]],
			comment: [ ["#", "\n", null, true] ],
			guid: [["{", "}"]],
			formatDeclaration: [["Microsoft Visual Studio Solution File, Format Version", "\n", null, true]]
		},
		
		identFirstLetter: /[A-Za-z_\.]/,
		identAfterFirstLetter: /[\w-\.]/,
		
		namedIdentRules: {
			follows: [
				[{ token: "keyword", values: ["GlobalSection"] }, sunlight.util.whitespace, { token: "punctuation", values: ["("] }, sunlight.util.whitespace]
			]
		},

		operators: [
			"=", "|"
		]

	});
}(this["Sunlight"]));
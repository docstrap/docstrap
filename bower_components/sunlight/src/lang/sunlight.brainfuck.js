(function(sunlight, undefined){

	if (sunlight === undefined || sunlight["registerLanguage"] === undefined) {
		throw "Include sunlight.js before including language files";
	}

	sunlight.registerLanguage("brainfuck", {
		customTokens: {
			increment: {
				values: [">"],
				boundary: ""
			},
			decrement: {
				values: ["<"],
				boundary: ""
			},
			incrementPointer: {
				values: ["+"],
				boundary: ""
			},
			decrementPointer: {
				values: ["-"],
				boundary: ""
			},
			write: {
				values: ["."],
				boundary: ""
			},
			read: {
				values: [","],
				boundary: ""
			},
			openLoop: {
				values: ["["],
				boundary: ""
			},
			closeLoop: {
				values: ["]"],
				boundary: ""
			}
		}
	});
}(this["Sunlight"]));
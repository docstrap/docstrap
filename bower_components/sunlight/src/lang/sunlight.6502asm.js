(function(sunlight, undefined){

    if (sunlight === undefined || sunlight["registerLanguage"] === undefined) {
        throw "Include sunlight.js before including language files";
    }
   
    sunlight.registerLanguage("6502asm", {
		keywords: [
			//conditional branch ops
			"BCC", "BCS", "BEQ", "BMI", "BNE", "BPL", "BVC", "BVS",
			//comparison ops
			"CMP", "CPX", "CPY",
			//flag ops
			"CLC", "CLD", "CLI", "CLV", "SEC", "SED", "SEI",
			//register ops
			"DEX", "DEY", "INX", "INY", "TAX", "TAY", "TXA", "TYA",
			//regular ops
			"BRK", "NOP", "RTI", "RTS", "ASL", "LSR", "ROL", "ROR", "ADC", "AND", "BIT", "DEC", "EOR", "INC", "JMP", "JSR", "LDA", "LDX", "LDY", "ORA", "SBC", "STA", "STX", "STY",
			//stack ops
			"PHA", "PHP", "PLA", "PLP", "TSX", "TXS"
		],
		
		scopes: {
			string: [["\"", "\""]],
			comment: [[";", "\n", null, true]]
		},
		
		operators: [
			">>","<<",">=","<=","==","!=","&&","||","~","-","<",">","*","/","%","+","-","=","&","^","|","?"
		],
		
		identFirstLetter: /[A-Za-z]/, //must be alpha
		identAfterFirstLetter: /\w/, //alphanumeric and underscore
		
		customTokens: {
			illegalOpcode: {
				values: [
					//illegal ops
					"SLO", "RLA", "SRE", "RRA", "SAX", "LAX", "DCP", "ISC", "ANC", "ALR", "ARR", "XAA", "AXS", "AHX", "SHY", "SHX", "TAS", "LAS"	
				],
				boundary: "\\b"
			},
			
			pseudoOp: {
				values: [
					//pre-processor pseudo-ops (not a complete list!)
					"BYTE", "WORD", "DS", "ORG", "RORG", "ALIGN", "MAC", "ENDM", "SUBROUTINE"
				],
				boundary: "\\b"
			}
		},
		
		customParseRules: [
			function(context) {
				var current = context.reader.current(), 
					line = context.reader.getLine(), 
					column = context.reader.getColumn(),
					parenCount = 0,
					bracketCount = 0,
					peek,
					value;
					
				if (current !== "#") {
					return null;
				}
				
				//quick and dirty: everything between "#" (inclusive) and whitespace (exclusive) is a constant
                //too dirty.  Need to account for parens and square brackets, whitespace can appear inside them.
                //New routine: once inside () or [], anything goes, but once outside, terminate with whitespace
				peek = context.reader.peek();
				value = current;
                while (parenCount > 0 || bracketCount > 0 || !/\s/.test(peek)) {
                    if (peek === ")" && parenCount > 0) {
						parenCount--;
					}
                    if (peek === "]" && bracketCount > 0) {
						bracketCount--;
					}
                    if (peek === "(") {
						parenCount++;
					}
                    if (peek === "[") {
						bracketCount++;
					}
					
                    value += context.reader.read();   
					peek = context.reader.peek();
                }
				
				return context.createToken("constant", value, line, column);
			},
			
			//labels
			function() {
				var validLabelOps = ["BCC", "BCS", "BEQ", "BMI", "BNE", "BPL", "BVC", "BVS", "JMP", "JSR"]
				
				return function(context) {
					var prevToken,
						label,
						peek,
						line = context.reader.getLine(), 
						column = context.reader.getColumn();
					
					if (!/[A-Za-z]/.test(context.reader.current())) {
						return null;
					}
					
					prevToken = sunlight.util.getPreviousNonWsToken(context.getAllTokens(), context.count())
					if (!prevToken || prevToken.name !== "keyword" || !sunlight.util.contains(validLabelOps, prevToken.value, true)) {
						if (context.count() > 0 && !/\n$/.test(context.defaultData.text)) {
							//just a regular ident
							return null;
						}
					}
					
					//read until the end of the ident
					label = context.reader.current();
					while ((peek = context.reader.peek()) !== context.reader.EOF) {
						if (!/\w/.test(peek)) {
							break;
						}
						
						label += context.reader.read();
					}
					
					return context.createToken("label", label, line, column);
				}	
			}()
		],
		
		caseInsensitive: true,
		
		numberParser: function(context) {
			var current = context.reader.current(), 
				number, 
				line = context.reader.getLine(), 
				column = context.reader.getColumn(),
				peek;
		    
			//is first char a digit?
			if (!/\d/.test(current)) {
				//does it start with "$" (hex) or "%" (binary)?
				if (current !== "$" && current !== "%") {
					return null;
				}
		        
				//hex/binary number
				number = current + context.reader.read();
			} else {
				number = current;
				//is it a decimal?
				if (context.reader.peek() === ".") {
					number += context.reader.read();
				}
			}
		    
			//easy way out: read until it's not a number or letter a-f
			//this will work for hex ($FF), octal (012), decimal and binary
		    
			while ((peek = context.reader.peek()) !== context.reader.EOF) {
				if (!/[A-Fa-f0-9]/.test(peek)) {
					break;
				}
		        
				number += context.reader.read();
			}
		    
			return context.createToken("number", number, line, column);
		}
    });
	
}(this["Sunlight"]));
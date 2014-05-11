if (typeof(console) === "undefined" || typeof(console.log) === "undefined") {
	console = function() {
		var log = function() { 
			var pre = document.createElement("pre");
			document.body.appendChild(pre);
			return function(text) {
				pre.appendChild(document.createTextNode(text));
				pre.appendChild(document.createTextNode("\r\n-------------------\r\n"));
			}
		}();
		
		return {
			log: log,
			error: log
		}
	}();
}

var prefix = "sunlight-";
var start = new Date();
if (typeof(maxHeight) === "undefined") {
	maxHeight = false;
}
Sunlight.highlightAll({ classPrefix: prefix, showMenu: true, enableDocLinks: true, maxHeight: maxHeight });
console.log("highlighting time: " + (new Date().getTime() - start.getTime()) + "ms");

//tests

var nbsp = String.fromCharCode(0xa0);
function exists(className, content, tags) {
	content = content.replace(/ /g, nbsp).replace(/\t/g, nbsp + nbsp + nbsp + nbsp);
	if (!+"\v1") {
		content = content.replace(/\n/g, "\r");
	}
	
	var searched = 0;
	var regex = new RegExp("\\s*" + prefix + className + "\\s*");
	for (var i = 0; i < tags.length; i++) {
		if (regex.test(tags[i].className)) {
			searched++;
			if (tags[i].firstChild && tags[i].firstChild.nodeValue === content) {
				return { nodes: searched, passed: true };
			}
		}
	}
	
	return { nodes: searched, passed: false };
}

var defaultTags = document.getElementById("code").getElementsByTagName("*");
function assertExists(className, content, description, id) {
	var data = exists(className, content, id ? document.getElementById(id).getElementsByTagName("*") : defaultTags);
	description = description + " (found " + data.nodes + " matching nodes)";
	if (data.passed) {
		console.log("pass: " + description);
	} else{
		console.error("fail: " + description);
	}
}
var parseNewick = function(str) {
    "use strict";
    var ptr = 0;
    function parseName() {
	var name = "";
	while (! ";,:)".includes(str[ptr])) {
	    name += str[ptr++];
	}
	return name;
    }
    function parseLength() {
	if (str[ptr] != ':') {
	    return 0;
	} else {
	    ptr ++;
	    var len = "";
	    while (".1234567890".includes(str[ptr])) {
		len += str[ptr++];
	    }
	    return (len.length > 0) ? parseFloat(len) : 0;
	}
    }
    function parse() {
	var node = {};
	switch (str[ptr]) {
	case '(':
	    node.children = [];
	    ptr ++;
	    do {
		node.children.push(parse());
	    } while (str[ptr++] == ',')
	default:
	    node.name = parseName();
	    node.data = { "branch_length" : parseLength() };
	}
	return node;
    }
    return parse();
}

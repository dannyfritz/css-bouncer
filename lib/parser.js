'use strict';

var postcss = require('postcss');

function parser (cssString) {
	var ast = postcss.parse(cssString);
	return ast;
}

module.exports = parser;

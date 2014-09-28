'use strict';

var test = require('tape');
var cssb = require('../');

test('linter', function linterTest(t) {
	t.equal(typeof cssb, 'function', 'cssb should be a Function.');
	var linter = cssb();
	t.equal(typeof linter, 'object', 'linter should return an Object.');
	t.equal(typeof linter.rule, 'function', 'linter.rule should be a Function.');
	t.equal(typeof linter.lint, 'function', 'linter.lint should be a Function.');
	t.equal(linter.rules instanceof Array, true,
		'linter.rules should be an Array.');
	t.end();
});

'use strict';

var test = require('tape');
var cssb = require('../');

test('rule', function linterTest(t) {
	t.plan(1);
	var linter = cssb();
	linter.rule('../test/fixtures/rules/selector', {});
	linter.lint('a { color: black }')
	.then(function lintResult (result) {
		t.equal(result);
	});
});

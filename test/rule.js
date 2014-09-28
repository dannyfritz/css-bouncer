'use strict';

var fs = require('fs');
var test = require('tape');
var cssb = require('../');

test('rule', function linterTest(t) {
	t.plan(1);
	var linter = cssb();
	linter.rule('../test/fixtures/rules/selector', {});
	fs.readFile('./test/fixtures/css/selectors.css', {encoding: 'utf8'}, function readFile (err, data) {
		if (err) {
			t.fail(err);
		}
		var result = linter.lint(data);
		t.equal(result);
	});
});

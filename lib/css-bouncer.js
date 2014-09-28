'use strict';
var parser = require('./parser');
var walker = require('./walker');
var Promise = require('bluebird');

/**
@module CSS-Bouncer
**/

/**
CSS Bouncer is a tool for linting CSS.
@class Linter
**/
function newLinter(options) {
	var linter = {};
	/**
	The rules added to the linter
	@property rules
	@type Array
	@default []
	**/
	var rules = [];
	linter.rules = rules;
	/**
	Add a rule to the linter.
	@method rule
	@param ruleName {String} Name of the rule.
		ex. 'cssb-selector-length'
	@param [ruleOptions] {Object}
	**/
	linter.rule = function rule (ruleName, ruleOptions) {
		var rule = require(ruleName);
		rules.push({runner: rule, options: ruleOptions});
	};
	/**
	Run the linter on a String of CSS.
	@method lint
	@param cssString {String} String of the CSS to lint.
	**/
	linter.lint = function lint (cssString) {
		var deferred = Promise.pending();
		var report = [];
		var ast = parser(cssString);
		walker
			.on('selector', function selector () {})
			.on('selector:exit', function selectorExit () {})
			.on('declaration', function declaration () {})
			.on('declaration:exit', function declarationExit () {})
			.on('end', function end () {deferred.resolve(report);});
		walker.walk(ast);
		return deferred.promise;
	};
	return linter;
}

module.exports = newLinter;

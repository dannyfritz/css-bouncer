'use strict';

var path = require('path');
var _ = require('lodash');
var resolve = require('resolve');
var parser = require('./parser');
var walker = require('./walker');
var newReporter = require('./reporter');

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
	function runOnRules (reporter, eventType, node) {
		_.each(rules, function reduce (rule) {
			if (!_.isFunction(rule.runner[eventType])) {
				return;
			}
			rule.runner[eventType](reporter, node, rule.options);
		}, []);
	}
	/**
	Add a rule to the linter.
	@method rule
	@param rulePath {String} Path of the rule.
		ex. 'cssb-selector-length'
	@param [ruleOptions] {Object}
	**/
	linter.rule = function rule (rulePath, ruleOptions) {
		var resolvedRulePath = resolve.sync(rulePath, { basedir: path.resolve('.') });
		var rule = require(resolvedRulePath);
		rules.push({runner: rule, options: ruleOptions});
	};
	/**
	Run the linter on a String of CSS.
	@method lint
	@param cssString {String} String of the CSS to lint.
	@return Promise {Object}
	**/
	linter.lint = function lint (cssString) {
		var reporter = newReporter();
		var ast = parser(cssString);
		var eventTypes = [
			'selector', 'selector:exiit',
			'declaration', 'declaration:exist'
		];
		walker.off();
		_.each(eventTypes, function setupEvents (eventType) {
			walker.on(eventType, function eventListener (node) {
				runOnRules(reporter.mini(node), eventType, node);
			});
		});
		walker.walk(ast);
		return reporter.getReports();
	};
	return linter;
}

module.exports = newLinter;

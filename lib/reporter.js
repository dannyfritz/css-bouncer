'use strict';

var _ = require('lodash');

function newReporter () {
	var reporter = {};
	var reports = [];
	function createReport (level, node, message) {
		var start = node.source.start;
		return {
			location: start.line + ':' + start.column,
			level: level,
			message: message
		};
	}
	function error (node, message) {
		var errorReport = createReport('error', node, message);
		reports.push(errorReport);
	}
	function warning (node, message) {
		var warningReport = createReport('warning', node, message);
		reports.push(warningReport);
	}
	reporter.getReports = function getReports () {
		return reports;
	};
	reporter.mini = function mini (node) {
		return {
			error: _.partial(error, node),
			warning: _.partial(warning, node)
		};
	};
	return reporter;
}

module.exports = newReporter;

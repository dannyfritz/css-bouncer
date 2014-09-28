'use strict';

var BackboneEvents = require('backbone-events-standalone');

function newWalker () {
	var walker = {};
	BackboneEvents.mixin(walker);
	function walkDeclaration () {

	}
	function walkSelector (node) {
		walker.trigger('selector', node);
		walkDeclaration();
	}
	walker.walk = function walk (ast) {
		ast.each(walkSelector);
		walker.trigger('end');
	};
	return walker;
}

module.exports = newWalker();

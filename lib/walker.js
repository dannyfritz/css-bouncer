'use strict';

var BackboneEvents = require('backbone-events-standalone');

function newWalker () {
	var walker = {};
	BackboneEvents.mixin(walker);
	walker.walk = function walk (ast) {
		walker.trigger('end');
	};
	return walker;
}

module.exports = newWalker();

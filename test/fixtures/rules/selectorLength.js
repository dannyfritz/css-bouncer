'use strict';

module.exports = {
	selector: function selector (reporter, node, options) {
		var descendentLength = node.selector.split(/[\s>]/g).length;
		if (descendentLength >= 3) {
			reporter.error('Descendent length for selector is too long!')
		}
	}
};

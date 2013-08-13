"use strict";

var apis = require('apis');
var resource = apis.resources.res;
var handlers = apis.handlers;
var data = handlers.data;
var impl = handlers.impl;
var ret = handlers.ret;

var createImpl = function (ctrl, method) {
	return function (ctx) {
		ctrl[method](ctx.auth, ctx.data, ctx.cb);
	};
};

var addResources = function(contract, auth, resources, defMethods) {
	var defaultMethods = defMethods || ['get', 'create', 'update', 'del'],
		resRes = [];

	for(var i in resources) {
		var r = resources[i],
			ctrl = r[0],
			methods = r[1] || undefined,
			resourceMethods = {};

		if(methods === 'all' || methods === undefined) {
			methods = defaultMethods;
		}

		for(var j in methods) {
			var mName = methods[j],
				m = resourceMethods[mName] = [];

			if(!(mName === 'create' && ctrl.name === 'user')) {
				if(mName === 'get') {
					m.push(auth().opt); // get auth
				} else {
					m.push(auth()); // other methods auth
				}
			}
			m.push(data(ctrl.validators[mName]));
			m.push(ret.any);
			m.push(impl(createImpl(ctrl, mName) ));
		}

		resRes.push(
			resource('/' + ctrl.name, resourceMethods)
		);
	}

	contract.addItems(resRes);
};

module.exports = addResources;

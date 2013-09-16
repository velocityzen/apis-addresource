"use strict";

var apis = require('apis');
var res = apis.resources.res;
var handlers = apis.handlers;
var data = handlers.data;
var impl = handlers.impl;
var ret = handlers.ret;

var defaultImpl = function (ctrl, method) {
	return function (ctx) {
		ctrl[method](ctx.auth, ctx.data, ctx.cb);
	};
};

var add = function(contract, auth, authFunc, resource, base) {
	var methods = resource.methods,
		resourceMethods = {};

	base = base || '';

	for(var method in methods) {
		var m = resourceMethods[method] = [];

		if(!(method === 'create' && resource.name === 'user')) {
			if(method === 'get') {
				m.push(auth(authFunc).opt); // get auth
			} else {
				m.push(auth(authFunc)); // other methods auth
			}
		}
		m.push(data(methods[method]));
		m.push(ret.any);

		if(resource.implements) {
			m.push(impl( resource.implements(method) ));
		} else {
			m.push(impl( defaultImpl(resource, method) ));
		}
	}

	contract.add(res( base + '/' + resource.name, resourceMethods));
};

var addItems = function(contract, auth, authFunc, resources, base) {
	for(var i in resources) {
		add(contract, auth, authFunc, resources[i], base);
	}
};


module.exports = {
	add: add,
	addItems: addItems
};

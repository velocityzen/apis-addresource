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

var add = function(contract, authOpts, resOpts) {
	var auth = authOpts.handler,
		authFunc = authOpts.authFunc,
		resource = resOpts.api,
		methods = resource.methods,
		resourceMethods = {},

		base = resOpts.base || '',
		settings = resOpts.settings;

	for(var method in methods) {
		var m = resourceMethods[method] = [];

		if(!(method === 'create' && resource.name === 'user')) {
			if(method === 'get') {
				m.push(auth(authFunc).opt); // get auth
			} else {
				m.push(auth(authFunc)); // other methods auth
			}
		}

		if(methods[method] !== false) {
			m.push(data( methods[method](settings) ));
		}

		m.push(ret.any);

		if(resource.implements) {
			m.push(impl( resource.implements(method) ));
		} else {
			m.push(impl( defaultImpl(resource, method) ));
		}
	}

	contract.add(res( base + '/' + resource.name, resourceMethods));
};

//var addItems = function(contract, auth, authFunc, resources, base) {
var addItems = function(contract, authOpts, resesOpts) {
	for(var i in resesOpts) {
		add(contract, authOpts, resesOpts[i]);
	}
};


module.exports = {
	add: add,
	addItems: addItems
};

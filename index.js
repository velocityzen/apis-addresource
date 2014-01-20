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
		api = resOpts.api,
		request = resOpts.request,
		response = resOpts.response || {},
		resourceMethods = {},

		base = resOpts.base || '',
		options = resOpts.options;

	for(var method in request) {
		var m = resourceMethods[method] = [];

		if(!(method === 'create' && api.name === 'user')) {
			if(method === 'get') {
				m.push(auth(authFunc).opt); // get auth
			} else {
				m.push(auth(authFunc)); // other methods auth
			}
		}

		if(request[method] !== false) {
			m.push(data( request[method](options) ));
		}

		if(response[method]) {
			m.push(ret( response[method](options) ));
		} else {
			m.push(ret.any);
		}

		if(api.implements) {
			m.push(impl( api.implements(method) ));
		} else {
			m.push(impl( defaultImpl(api, method) ));
		}
	}

	contract.add(res( base + '/' + api.name, resourceMethods));
};


module.exports = {
	add: add
};

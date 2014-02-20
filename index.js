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

var methods = ["get", "create", "update", "del", "call"];

var add = function(contract, authOpts, resOpts) {
	var auth = authOpts.handler,
		authFunc = authOpts.authFunc,
		api = resOpts.api,
		request = resOpts.request,
		response = resOpts.response || {},
		resourceMethods = {},
		base = resOpts.base || '';

	for(var i in methods) {
		var method = methods[i];
		if(request[method] === undefined) {
			continue;
		}

		var m = resourceMethods[method] = [];

		if(!(method === 'create' && api.resource === 'user')) {
			if(method === 'get') {
				m.push(auth(authFunc).opt); // get auth
			} else {
				m.push(auth(authFunc)); // other methods auth
			}
		}

		if(request[method] !== false) {
			m.push(data( request[method]() ));
		}

		if(response[method]) {
			m.push(ret( response[method]() ));
		} else {
			m.push(ret.any);
		}

		if(api.implements) {
			m.push(impl( api.implements(method) ));
		} else {
			m.push(impl( defaultImpl(api, method) ));
		}
	}

	contract.add(res( base + '/' + api.resource, resourceMethods));
};


module.exports = {
	add: add
};

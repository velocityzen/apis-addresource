apis-resource
================

Add resource helper for [apis](https://github.com/dimsmol/apis) lib

## Resource
```js
res.name = 'user',
res.get = function(auth, data, cb) {};
res.create = function(auth, data, cb) {};
```

## request or response
```js
request = {
    get: function() {
        return {email: email}
    },

    create: function() {
        return {
            email: email,
            password: str,
            name: opt(str),
        }
    }
}
```

## Usage
```js
add(
    contract,       //contract handler 
    {
        handler     //auth handler
        authFunc    //auth function
    },           
    {
        base,       //api base path, ex. '/api'
        api,        //resource api unit
        request,    //request validators
        response    //optional, response validators
    }
)
```

**Example**

```js
var addResource = require('apis-resource').add;
...

Contract.prototype.unitInit = function (units) {
    var auth =  units.require('auth').handler;
    var userApi =  units.require('user.api');
    var userRequest =  units.require('user.request');

    add(this, {handler: auth}, {
        base: '/api/1', 
        api: userApi, 
        request: userRequest
    });
};
```

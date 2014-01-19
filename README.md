apis-resource
================

Add resource helper for [apis](https://github.com/dimsmol/apis) lib

## Resource
```js
res.name = 'user',

res.methods = {
    get: function(options) {
        return {email: email}
    },

    create: function(options) {
        return {
            email: email,
            password: str,
            name: opt(str),
        }
    }
}

res.get = function(auth, data, cb) {};
res.create = function(auth, data, cb) {};
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
        api,        //resource array [user, ['get', 'create']]
        options     //some options
    }
)
```

**Example**

```js
var addResource = require('apis-resource').add;
...

Contract.prototype.unitInit = function (units) {
    var auth =  units.require('auth').handler;
    var user =  units.require('user');
    var post =  units.require('post');

    add(this, {handler: auth}, {base: '/api/1', api: user});
    add(this, {handler: auth}, {base: '/api/1', api: post});
};
```

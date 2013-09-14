apis-resource
================

Add resource helper for [apis](https://github.com/dimsmol/apis) lib

## Resource
```js
res.name = 'user',

res.methods = {
    get: {username: str},
    create: {
        username: str,
        password: str,
        email: email,
        displayName: opt(str),
    }
}

res.get = function(auth, data, cb) {};
res.create = function(auth, data, cb) {};
```

## Usage
```js
add(
    contract,       //contract handler 
    auth,           //auth handler
    rolesHandler    //user roles handler
    resource,       //resource array [user, ['get', 'create']]
    apiBase         //api base path, ex. '/api'
)

addItems() // same as **add** but resources is an array of reresources
```

**Example**

```js
var addResources = require('apis-resource').addItems;
...

Contract.prototype.unitInit = function (units) {
    var auth =  units.require('auth').handler;
    var user =  units.require('user');

    addResources(this, auth, null, [user, post], '/api/1');
};
```

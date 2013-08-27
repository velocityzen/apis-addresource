apis-resource
================

Add resource helper for [apis](https://github.com/dimsmol/apis) lib

## Resource
```js
res.name = 'user',

res.method = {
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
    contract,  //contract handler 
    auth,      //auth handler
    resource,  //resource array [user, ['get', 'create']]
    apiBase    //api base path, ex. '/api'
)

addItems() // same as **add** but resources is an array of reresources
```

**Example**

```js
var addResources = require('apis-resources').addItems;
...

Contract.prototype.unitInit = function (units) {
    var auth =  units.require('auth').handler;
    var user =  units.require('user');

    addResources(this, auth, [user, post], '/api');
};
```

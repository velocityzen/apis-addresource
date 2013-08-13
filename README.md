apis-addresource
================

Add resource helper for [apis](https://github.com/dimsmol/apis) lib

## Resource
```js
res.name = 'user',

res.validators = {
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
addResourse(
    contract,   //contract handler 
    auth,       //auth handler
    resources,  //resource array [user, ['get', 'create']]
    [defaultMethods]    //array of default methods 
                        //['get', 'create', 'update', 'del']
)
```

**Example**

```js
var addResources = require('apis-addresources');
...

Contract.prototype.unitInit = function (units) {
    var auth =  units.require('auth').handler;
    var user =  units.require('user');

    addResources(this, auth, [
        [user, 'all']
    ]);
};
```

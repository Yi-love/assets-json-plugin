# Assets json Plugin
assets json for webpack.

## npm 

```
```

```js
new AssetsJsonPlugin({})
```

## example

```json
{
    "hash": "a7e4bb42fb766c8a42f3", 
    "publicPath": "http://www.test.com/dist/", 
    "entry": {
        "header": {
            "entry": true, 
            "js": "header.js?v=a7e4bb42fb766c8a42f3", 
            "hash": "2c131466fb262ee7dfd9", 
            "css": [
                "header.css?v=0dff772c498d08034dce"
            ], 
            "siblings": [
                "vue"
            ]
        }, 
        "main": {
            "entry": true, 
            "js": "main.js?v=a7e4bb42fb766c8a42f3", 
            "hash": "19706f4776e9d61278f5", 
            "css": [
                "main.css?v=5e1eaee80abd41742afb"
            ], 
            "siblings": [
                "vue"
            ]
        }, 
        "vue": {
            "entry": false, 
            "js": "vue.js?v=a7e4bb42fb766c8a42f3", 
            "hash": "75afae3dc4435bd37a5a", 
            "css": [ ], 
            "siblings": [
                "header", 
                "main"
            ]
        }
    }
}
```
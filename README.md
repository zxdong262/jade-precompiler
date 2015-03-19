# jade-precompiler

comile a folder of jade template to javascript code text so you can insert them to jade template later.

## install
```bash
npm install jade-precompiler
```

## use

```javascript
/*
 * folder structure
 -jade-templates
 --t1 d-g.h.jade
 --t2.jade
*/
var assert = require('assert')
var syncCompiler = require('jade-precompiler').syncCompile


var temps1 = syncCompiler(__dirname + '/jade-templates')
assert(temps1.runtimejs && temps1._t1_d_g_h_jade && temps1._t2_jade && /function _t2_jade/.test(temps1._t2_jade))

var prefix = 'kk_' //default prefix = '_'
var temps2 = syncCompiler(__dirname + '/jade-templates', prefix)
assert(temps2.runtimejs && temps2.kk_t1_d_g_h_jade && temps2.kk_t2_jade && /function kk_t2_jade/.test(temps2.kk_t2_jade))

/*
temps1 = {

    _t1_d_g_h_jade: 'function _t1_d_g_h_jade(e){var t=[],n={},r,i=e||{};return function(e){t.push(\'<div id="a"><span>jade-precompiler</span>\');var n=" ok ";t.push("<span>"+jade.escape((r=n)==null?"":r)+"</span><span>"+jade.escape((r=e)==null?"":r)+"</span></div>")}.call(this,"gg"in i?i.gg:typeof gg!="undefined"?gg:undefined),t.join("")}'

    ,_t2_jade: 'function _t2_jade(e){var t=[],n={},r,i=e||{};return function(e){t.push(\'<div id="a"><span>jade-precompiler</span>\');var n=" ok ";t.push("<span>"+jade.escape((r=n)==null?"":r)+"</span><span>"+jade.escape((r=e)==null?"":r)+"</span></div>")}.call(this,"gg1"in i?i.gg1:typeof gg1!="undefined"?gg1:undefined),t.join("")}'

    ,runtimejs: '!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;"undefined"!=typeof window?t=window:"undefined"!=typeof global?t=global:"undefined"!=typeof self&&(t=self),t.jade=e()}}(function(){var define,module,exports;return function e(t,n,r){function i(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(s)return s(o,!0);var f=new Error("Cannot find module \'"+o+"\'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return i(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var s=typeof require=="function"&&require;for(var o=0;o<r.length;o++)i(r[o]);return i}({1:[function(require,module,exports){"use strict";function e(e){return e!=null&&e!==""}function t(n){return(Array.isArray(n)?n.map(t):n&&typeof n=="object"?Object.keys(n).filter(function(e){return n[e]}):[n]).filter(e).join(" ")}exports.merge=function n(t,r){if(arguments.length===1){var i=t[0];for(var s=1;s<t.length;s++)i=n(i,t[s]);return i}var o=t["class"],u=r["class"];if(o||u)o=o||[],u=u||[],Array.isArray(o)||(o=[o]),Array.isArray(u)||(u=[u]),t["class"]=o.concat(u).filter(e);for(var a in r)a!="class"&&(t[a]=r[a]);return t},exports.joinClasses=t,exports.cls=function(n,r){var i=[];for(var s=0;s<n.length;s++)r&&r[s]?i.push(exports.escape(t([n[s]]))):i.push(t(n[s]));var o=t(i);return o.length?\' class="\'+o+\'"\':""},exports.style=function(e){return e&&typeof e=="object"?Object.keys(e).map(function(t){return t+":"+e[t]}).join(";"):e},exports.attr=function(t,n,r,i){return t==="style"&&(n=exports.style(n)),"boolean"==typeof n||null==n?n?" "+(i?t:t+\'="\'+t+\'"\'):"":0==t.indexOf("data")&&"string"!=typeof n?(JSON.stringify(n).indexOf("&")!==-1&&console.warn("Since Jade 2.0.0, ampersands (`&`) in data attributes will be escaped to `&amp;`"),n&&typeof n.toISOString=="function"&&console.warn("Jade will eliminate the double quotes around dates in ISO form after 2.0.0")," "+t+"=\'"+JSON.stringify(n).replace(/\'/g,"&apos;")+"\'"):r?(n&&typeof n.toISOString=="function"&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+t+\'="\'+exports.escape(n)+\'"\'):(n&&typeof n.toISOString=="function"&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+t+\'="\'+n+\'"\')},exports.attrs=function(n,r){var i=[],s=Object.keys(n);if(s.length)for(var o=0;o<s.length;++o){var u=s[o],a=n[u];"class"==u?(a=t(a))&&i.push(" "+u+\'="\'+a+\'"\'):i.push(exports.attr(u,a,!1,r))}return i.join("")},exports.escape=function(t){var n=String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");return n===""+t?t:n},exports.rethrow=function r(e,t,n,i){if(e instanceof Error){if((typeof window!="undefined"||!t)&&!i)throw e.message+=" on line "+n,e;try{i=i||require("fs").readFileSync(t,"utf8")}catch(s){r(e,null,n)}var o=3,u=i.split("\\n"),a=Math.max(n-o,0),f=Math.min(u.length,n+o),o=u.slice(a,f).map(function(e,t){var r=t+a+1;return(r==n?"  > ":"    ")+r+"| "+e}).join("\\n");throw e.path=t,e.message=(t||"Jade")+":"+n+"\\n"+o+"\\n\\n"+e.message,e}throw e}},{fs:2}],2:[function(require,module,exports){},{}]},{},[1])(1)})' 

}

*/

```

## insert js in jade template(use lodash as _ )
```jade
doctype html
html
    head
        title jade-precompiler test
    body
        #wrapper
            h1 jade-precompiler test
            h2 output templates
            #out1
            #out2

        - _.each(temps1, function(value, key) {
            script.
                !{value}
        - })
        
        script.
            var dt1 = {
                gg: ' template1 loaded'
            }
            ,dt2 = {
                gg1: ' template2 loaded'
            }
            ,ht1 = _t1_d_g_h_jade(dt1)
            ,ht2 = _t2_jade(dt2)

            document.getElementById('out1').innerHTML = ht1
            document.getElementById('out2').innerHTML = ht2
```

## will render html like this
```html
<!DOCTYPE html>
<html>
<head>
<title>jade-precompiler test</title>
</head>
<body>
<div id="wrapper">
    <h1>jade-precompiler test</h1>
    <h2>output templates</h2>
    <div id="out1"></div>
    <div id="out2"></div>
</div>

<!-- compressed by uglify-js -->
<script>
function _t1_d_g_h_jade(e){var t=[],n={},r,i=e||{};return function(e){t.push('<div id="a"><span>jade-precompiler</span>');var n=" ok ";t.push("<span>"+jade.escape((r=n)==null?"":r)+"</span><span>"+jade.escape((r=e)==null?"":r)+"</span></div>")}.call(this,"gg"in i?i.gg:typeof gg!="undefined"?gg:undefined),t.join("")}
</script>

<!-- compressed by uglify-js -->
<script>
function _t2_jade(e){var t=[],n={},r,i=e||{};return function(e){t.push('<div id="a"><span>jade-precompiler</span>');var n=" ok ";t.push("<span>"+jade.escape((r=n)==null?"":r)+"</span><span>"+jade.escape((r=e)==null?"":r)+"</span></div>")}.call(this,"gg1"in i?i.gg1:typeof gg1!="undefined"?gg1:undefined),t.join("")}
</script>

<!-- jade runtime.js compressed by uglify-js -->
<script>
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;"undefined"!=typeof window?t=window:"undefined"!=typeof global?t=global:"undefined"!=typeof self&&(t=self),t.jade=e()}}(function(){var define,module,exports;return function e(t,n,r){function i(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(s)return s(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return i(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var s=typeof require=="function"&&require;for(var o=0;o<r.length;o++)i(r[o]);return i}({1:[function(require,module,exports){"use strict";function e(e){return e!=null&&e!==""}function t(n){return(Array.isArray(n)?n.map(t):n&&typeof n=="object"?Object.keys(n).filter(function(e){return n[e]}):[n]).filter(e).join(" ")}exports.merge=function n(t,r){if(arguments.length===1){var i=t[0];for(var s=1;s<t.length;s++)i=n(i,t[s]);return i}var o=t["class"],u=r["class"];if(o||u)o=o||[],u=u||[],Array.isArray(o)||(o=[o]),Array.isArray(u)||(u=[u]),t["class"]=o.concat(u).filter(e);for(var a in r)a!="class"&&(t[a]=r[a]);return t},exports.joinClasses=t,exports.cls=function(n,r){var i=[];for(var s=0;s<n.length;s++)r&&r[s]?i.push(exports.escape(t([n[s]]))):i.push(t(n[s]));var o=t(i);return o.length?' class="'+o+'"':""},exports.style=function(e){return e&&typeof e=="object"?Object.keys(e).map(function(t){return t+":"+e[t]}).join(";"):e},exports.attr=function(t,n,r,i){return t==="style"&&(n=exports.style(n)),"boolean"==typeof n||null==n?n?" "+(i?t:t+'="'+t+'"'):"":0==t.indexOf("data")&&"string"!=typeof n?(JSON.stringify(n).indexOf("&")!==-1&&console.warn("Since Jade 2.0.0, ampersands (`&`) in data attributes will be escaped to `&amp;`"),n&&typeof n.toISOString=="function"&&console.warn("Jade will eliminate the double quotes around dates in ISO form after 2.0.0")," "+t+"='"+JSON.stringify(n).replace(/'/g,"&apos;")+"'"):r?(n&&typeof n.toISOString=="function"&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+t+'="'+exports.escape(n)+'"'):(n&&typeof n.toISOString=="function"&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+t+'="'+n+'"')},exports.attrs=function(n,r){var i=[],s=Object.keys(n);if(s.length)for(var o=0;o<s.length;++o){var u=s[o],a=n[u];"class"==u?(a=t(a))&&i.push(" "+u+'="'+a+'"'):i.push(exports.attr(u,a,!1,r))}return i.join("")},exports.escape=function(t){var n=String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");return n===""+t?t:n},exports.rethrow=function r(e,t,n,i){if(e instanceof Error){if((typeof window!="undefined"||!t)&&!i)throw e.message+=" on line "+n,e;try{i=i||require("fs").readFileSync(t,"utf8")}catch(s){r(e,null,n)}var o=3,u=i.split("\n"),a=Math.max(n-o,0),f=Math.min(u.length,n+o),o=u.slice(a,f).map(function(e,t){var r=t+a+1;return(r==n?"  > ":"    ")+r+"| "+e}).join("\n");throw e.path=t,e.message=(t||"Jade")+":"+n+"\n"+o+"\n\n"+e.message,e}throw e}},{fs:2}],2:[function(require,module,exports){},{}]},{},[1])(1)})
</script>

<script>
var dt1 = {
    gg: ' template1 loaded'
}
,dt2 = {
    gg1: ' template2 loaded'
}
,ht1 = _t1_d_g_h_jade(dt1)
,ht2 = _t2_jade(dt2)
document.getElementById('out1').innerHTML = ht1
document.getElementById('out2').innerHTML = ht2
</script>
</body>
</html>
```

## koa example
```javascript

/**
 * Module dependencies.
 */

var
koa = require('koa')
,jade = require('koa-jade')
,_ = require('lodash')
,port = 8523

// all environments
,app = koa()

var comp = require('./').syncCompile

var temps = comp(__dirname + '/test/jade-templates')

//view engine
app.use(jade.middleware({
    viewPath: __dirname + '/test/views'
    ,debug: false
    ,pretty: false
    ,compileDebug: true
    ,locals: { _:_ } //use loash as _
}))

app.use(function* (next) {
    yield this.render('index', {
        temps: temps
    })
})

//start
app.listen(port, function() {
    console.log(new Date() + 'site runs on port ' + port)
})


```

## test
```bash
$ git clone https://github.com/zxdong262/jade-precompiler.git
$ cd jade-precompiler
$ sudo npm install
$ sudo npm install mocha -g
$ mocha --reporter spec
```

## test in browser
```bash
node --harmony app
```

then visit <a href='http://localhost:8523' target='_blank'>http://localhost:8523</a>

## license

MIT
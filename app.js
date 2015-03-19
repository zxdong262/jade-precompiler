
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
	,locals: { _:_ }
}))

console.dir(temps)
app.use(function* (next) {
	yield this.render('index', {
		temps: temps
	})
})

//start
app.listen(port, function() {
	console.log(new Date() + 'site runs on port ' + port)
})

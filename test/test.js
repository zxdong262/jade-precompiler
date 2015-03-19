
var assert = require('assert')
var syncCompiler = require('..').syncCompile

describe('jade-precompiler', function() {

	it('basic', function() {
		var temps = syncCompiler(__dirname + '/jade-templates')
		assert(temps.runtimejs && temps._t1_d_g_h_jade && temps._t2_jade && /function _t2_jade/.test(temps._t2_jade))
	})

	it('with custom prefix and include file', function() {
		var prefix = 'kk_'
		var temps = syncCompiler(__dirname + '/jade-templates', prefix)
		assert(temps.runtimejs && temps.kk_t1_d_g_h_jade && temps.kk_t2_jade && /function kk_t2_jade/.test(temps.kk_t2_jade))
	})


	//end
})


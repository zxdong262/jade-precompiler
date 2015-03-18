/*!
 * jade-precompiler
 */

//globs
var
jade = require('jade')
,_ = require('lodash')
,uglify = require('uglify-js')
,fs = require('fs')

function minify(src) {

	var jsp = uglify.parser
	,pro = uglify.uglify
	,ast = jsp.parse(src)

	ast = pro.ast_mangle(ast, {
		except: ['exports', 'module', 'require', 'define']
	})

	ast = pro.ast_squeeze(ast)
	ast = pro.gen_code(ast)

	return ast

}

exports.syncCompile = function(folderPath) {

	var files = fs.readdirSync(folderPath)
	,len = files.length
	,i = 0
	,fpath = ''
	,res = {}
	,ftxt
	,file
	,runtimejs
	,fname
	for(;i < len;i ++) {
		file = files[i]
		fname = file.split('.')[0]
		if(file !== '.' && file !== '..') {
			fpath = folderPath + '/' + file
			ftxt = fs.readFileSync(fpath)
			res[fname] = jade.compileClient(ftxt, { name: fname })
		}
		
	}
	runtimejs = fs.readFileSync(__dirname + '/node_modules/jade/runtime.js').toString()
	res.runtimejs = minify(runtimejs)

	return res

}

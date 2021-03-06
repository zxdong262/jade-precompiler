/*!
 * jade-precompiler
 */

//globs
var
jade = require('jade')
,uglify = require('uglify-js')
,fs = require('fs')
,path = require('path')

function minify(src, beautify) {

	var jsp = uglify.parser
	,pro = uglify.uglify
	,ast = jsp.parse(src)

	ast = pro.ast_mangle(ast, {
		except: ['exports', 'module', 'require', 'define']
	})

	ast = pro.ast_squeeze(ast)
	ast = pro.gen_code(ast, {
		beautify: beautify || false
	})

	return ast

}

exports.syncCompile = function(folderPath, prefix, beautify) {

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
		fname = (prefix || '_') + file.replace(/[\.\-\s]/g, '_')
		if(file !== '.' && file !== '..') {
			fpath = folderPath + '/' + file
			ftxt = fs.readFileSync(fpath)
			res[fname] = minify(jade.compileClient(ftxt, {
				name: fname
				,filename: fpath
			}), beautify)
		}
		
	}
	runtimejs = fs.readFileSync(__dirname + '/node_modules/jade/runtime.js').toString()
	res.runtimejs = minify(runtimejs, beautify)

	return res

}

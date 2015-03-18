/*!
 * jade-precompiler
 */

//globs
var
jade = require('jade')
,_ = require('lodash')
,fs = require('fs')
,toPromiseFunc = function(thunk) {
	return function() {

		//arguments to array
		var $_len = arguments.length
		var args = new Array($_len)
		for(var $_i = 0; $_i < $_len; ++$_i) {
			args[$_i] = arguments[$_i]
		}

		var ctx = this
		return new Promise(function(resolve, reject) {
			args.push(function(err, val){
				if(err) reject(err)
				else resolve(val)
			})
			thunk.apply(ctx, args)
		})
	}
}


exports.syncCompile = function(folderPath) {

	var files = fs.readdirSync(folderPath)
	,len = files.length
	,i = 0
	,fpath = ''
	,res = {}
	,ftxt
	,file
	for(;i < len;i ++) {
		file = files[i]
		if(file !== '.' && file !== '..') {
			fpath = folderPath + '/' + file
			ftxt = fs.readFileSync(fpath)
			res[file] = jade.compile(ftxt).toString()
		}
		
	}
	return res

}

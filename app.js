

var comp = require('./').syncCompile

var tx = comp(__dirname + '/test/jade-templates')

console.log(tx)
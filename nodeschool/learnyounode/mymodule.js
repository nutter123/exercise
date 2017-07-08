var fs = require('fs')
var path = require('path')

module.exports = function(folder,ext,callback){
  fs.readdir(folder,function(err,files){
    if(err)
      return callback(err)
    files=rfiles.filter(function(file){
      return path.extname(file)==='.'+ext
    })
    callback(null,files)
  })
}

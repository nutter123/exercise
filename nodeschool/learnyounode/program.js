//婴儿学步
// var a=0;
// for(var i=2;i<=process.argv.length-2;i++){
//   a+=Number(process.argv[i]);
// }
// console.log(a);
//第一个I/O
// var fs = require('fs')
// var buf=fs.readFileSync(process.argv[2])
// var str=buf.toString()
// console.log(str.split('\n').length-1)
//第一个异步I/O
// var fs = require('fs')
// var a=process.argv[2]
// var buf=fs.readFile(a,function(err,content){
//   console.log(content.toString().split('\n').length-1)
// })
//ls过滤器
    // var fs = require('fs')
    // var a=process.argv[2]
    // fs.readdir(a,function(err,list){
    //   for(var i=0;i<list.length;i++){
    //     if(list[i].split('.')[1]==process.argv[3]){console.log(list[i])}
    //   }
    // })

    // var fs = require('fs')
    // var path = require('path')
    // var folder = process.argv[2]
    // var ext='.'+process.argv[3]
    //
    // fs.readdir(folder,function(err,files){
    //   if(err) return console.log(err)
    //   files.forEach(function(file){
    //     if(path.extname(file) === ext){
    //       console.log(file)
    //     }
    //   })
    // })

//使其模块化
// var mymodule = require('./mymodule.js')
// var folder = process.argv[2]
// var ext =process.argv[3]
// mymodule(folder,ext,function(err,content){
//   if(err){return console.log(err)}
//   content.forEach(function(file){
//     console.log(file)
//   })
// })

//http 客户端
// var http = require('http')
// var url = process.argv[2]
// http.get(url,function(response){
//   response.setEncoding('utf8');
//   response.on("data",console.log)
//   response.on('error',console.error)
// })

//http收集器
// var http = require('http')
// var cc = require('concat-stream')
// http.get(process.argv[2],function(response){
//   response.pipe(cc(function(data){
//     console.log(data.length)
//     console.log(data.toString())
//   }))
// })

//玩转异步
// var http = require('http')
// var cc = require('concat-stream')
// var count = 0
// var results = []
// function httpget(index){
//   http.get(process.argv[2+index],function(response){
//     response.pipe(cc(function(data){
//       results[index]=data.toString()
//       count++
//       if(count==3)
//         for(var i = 0;i<3;i++)
//           console.log(results[i])
//     }))
//   })
// }
// for(var i =0;i<3;i++)
//   httpget(i)

//tcp 时间服务器
// var net = require('net')
// function zerofill(i){
//   return (i<10?'0':'')+i
// }
// var server = net.createServer(function(socket){
//   var date=new Date()
//   var data = date.getFullYear()+"-"+zerofill(date.getMonth()+1)+"-"+zerofill(date.getDate())+" "+zerofill(date.getHours())+":"+zerofill(date.getMinutes())+"\n"
//   socket.write(data)
//   socket.end()
// })
// server.listen(process.argv[2])

//http 文件服务器
// var http = require('http')
// var fs = require('fs')
// var root = process.argv[2]
// var file = process.argv[3]
// var server = http.createServer(function(req,res){
//   res.writeHead(200,{'content-type':'text/plain'})
//   fs.createReadStream(file).pipe(res)
// })
// server.listen(root)

//http 大写转换器
// var http = require('http')
// var map = require('through2-map')
// var root = process.argv[2]
// var server = http.createServer(function(req,res){
//   if(req.method != 'POST')
//     return res.end('send me a post \n')
//
//   req.pipe(map(function(chunk){
//     return chunk.toString().toUpperCase()
//   })).pipe(res)
// })
// server.listen(root)

//json api 服务器
var http = require('http')
var url = require('url')

function parsetime(time){
  return {
    hour:time.getHours(),
    minute:time.getMinutes(),
    second:time.getSeconds()
  }
}

function unixtime(time){
  return {unixtime:time.getTime()}
}
var server = http.createServer(function(req,res){
  var Url = url.parse(req.url,true)
  var time = new Date(Url.query.iso)
  var result

  if(/^\/api\/parsetime/.test(req.url))
    result = parsetime(time)
  else if(/^\/api\/unixtime/.test(req.url))
    result = unixtime(time)

  if(result){
    res.writeHead(200,{'content-type':'application/json'})
    res.end(JSON.stringify(result))
  }else{
    res.writeHead(404)
    res.end()
  }
})
server.listen(8080)

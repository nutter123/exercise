var express = require('express')
var path=require('path')
var mongoose = require('mongoose')
var session = require('express-session')
var mongoStore=require('connect-mongo')(session)
var _=require('underscore')
var Movie = require('./app/models/movie')
var User = require('./app/models/users')
var port = process.env.PORT||3000
var app = express()
var bodyParser = require('body-parser')
var dbUrl='mongodb://localhost/imooc'
var logger = require('morgan')
var fs = require('fs')

mongoose.connect('mongodb://localhost/imooc')
//models loading
var models_path = __dirname+'/app/models'
var walk = function(path){
  fs
    .readdirSync(path)
    .forEach(function(file){
      var newPath = path + '/' + file
      var stat = fs.statSync(newPath)

      if(stat.isFile()){
        if(/(.*)\.(js|coffee)/.test(file)){
          require(newPath)
        }
      }
      else if(stat.isDirectory()){
        walk(newPath)
      }
    })
}
walk(models_path)

app.set('views','./app/views/pages')
app.set('view engine','jade')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,'public')))
app.locals.moment = require('moment')
app.use(session({
  secret:'imooc',
  store:new mongoStore({
    url:dbUrl,
    collection:'sessions'
  }),
  resave: false,
  saveUninitialized: true
})) 

if('development'==app.get('env')){
  app.set('showStackError',true)
  app.use(logger(':method :url :status'))
  app.locals.pretty = true
  mongoose.set('debug',true)
}
require('./config/routes')(app)
app.listen(port)

console.log('imooc started on port '+port)

var Movie=require('../app/controller/movie')
var Index = require('../app/controller/index')
var User = require('../app/controller/user')

module.exports = function(app){
//pre handle user
  app.use(function(req,res,next){
    var _user=req.session.user
    app.locals.user=_user
    next()
  })
  //Index
  app.get('/',Index.index)
  //User
  app.post('/user/signup',User.signup)
  app.post('/user/signin',User.signin)
  app.get('/logout',User.logout)
  app.get('/signin',User.showSignin)
  app.get('/signup',User.showSignup)
  app.get('/admin/user/list',User.signinRequired,User.adminRequired,User.list)
  //Movie
  app.get('/movie/:id',Movie.detail)
  app.post('/admin/movie/new',User.signinRequired,User.adminRequired,Movie.new)
  app.get('/admin/movie/update/:id',User.signinRequired,User.adminRequired,Movie.update)
  app.post('/admin/movie',User.signinRequired,User.adminRequired,Movie.save)
  app.get('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.list)
  app.delete('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.del)
}

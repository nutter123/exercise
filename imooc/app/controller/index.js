var Movie = require('../models/movie')

exports.index = function(req,res){
  console.log('session数据是：')
  console.log(req.session.user)


  Movie.fetch(function(err,movies){
    if(err){
      console.log(err)
    }
    res.render('index',{
      title:'imooc 首页',
      movies:movies
    })
  })
}

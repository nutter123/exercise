var _=require('underscore')
var Movie = require('../models/movie')
var User = require('../models/users')

exports.detail=function(req,res){
  var id = req.params.id

  Movie.findById(id,function(err,movie){
    res.render('detail',{
      title:'imooc'+movie.title,
      movie:movie
    })
  })
}

exports.save = function(req,res){
  res.render('admin',{
    title:'imooc 后台页',
    movie:{
      title:'',
      doctor:'',
      country:'',
      year:'',
      poster:'',
      flash:'',
      summary:'',
      language:''
    }
  })
}
//admin update page
exports.update = function(req,res){
  var id =req.params.id

  if(id){
    Movie.findById(id,function(err,movie){
      res.render('admin',{
        title:'imooc 后台更新页',
        movie:movie
      })
    })
  }
}

//admin post movie
exports.new=function(req,res){
//console.log(req.body)
  var id = req.body.movie._id
  var movieObj = req.body.movie
  var _movie

  if(id !=='undefined'){
    Movie.findById(id,function(err,movie){
      if(err){
        console.log(err)
      }
      _movie=_.extend(movie,movieObj)
      _movie.save(function(err,movie){
        if(err){
          console.log(err)
        }
        res.redirect('/movie/'+movie._id)
      })
    })
  }
  else{
    _movie = new Movie({
      doctor:movieObj.doctor,
      title:movieObj.title,
      country:movieObj.country,
      language:movieObj.language,
      year:movieObj.year,
      poster:movieObj.poster,
      summary:movieObj.summary,
      flash:movieObj.flash,
    })
    _movie.save(function(err,movie){
      if(err){
        console.log(err)
      }
      res.redirect('/movie/'+movie._id)
    })
  }
}


exports.list = function(req,res){
    Movie.fetch(function(err,movies){
      if(err){
        console.log(err)
      }
      res.render('list',{
        title:'imooc 列表页',
        movies:movies
      })
    })
  }

  //list delete movie
exports.del = function(req,res){
    var id = req.query.id
    if(id){
      Movie.remove({_id:id},function(err,movie){
        if(err){
          console.log(err)
        }else{
          res.json({success:1})
        }
      })
    }
  }

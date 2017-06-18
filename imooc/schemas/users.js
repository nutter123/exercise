var mongoose=require('mongoose')
var bcrypt = require('bcrypt-nodejs')
var SALT_WORK_FACTOR=10

var UserSchema=new mongoose.Schema({
  name:{
    unique:true,
    type:String
  },
  password:String,
  meta:{
    createAt:{
      type:Date,
      default:Date.now()
    },
    updataAt:{
      type:Date,
      default:Date.now()
    }
  }
})
UserSchema.pre('save',function(next){
  var user = this
  if(this.isNew){
    this.meta.createAt = this.meta.updataAt=Date.now()
  }
  else{
    this.meta.updateAt = Date.now()
  }
  bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
    if(err)return next(err)
    bcrypt.hash(user.password,salt,null,function(err,hash){
      if(err)return next(err)
      user.password = hash
      next()
    })
  })
})
UserSchema.statics = {
  fetch:function(cb){
    return this
    .find({})
    .sort('meta.updataAt')
    .exec(cb)
  },
  findById:function(id,cb){
    return this
    .findOne({_id:id})
    .exec(cb)
  }
}
module.exports = UserSchema

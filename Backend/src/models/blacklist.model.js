const mongoose=require('mongoose')


const blacklistTokenSchema=new mangoose.Schema({token:{
  type:String,
  required:[true,"token is required to be added to blacklist"]
}},{
  timestamps:true
})

const tokenBlacklistModel=mongoose.model("blacklistTokens",blacklistTokenSchema)


module.exports=tokenBlacklistModel
const userModel=require("../models/user.model")

const bcryptjs=require("bcryptjs")

const jwt =require("jsonwebtoken")

/**
 * @name registerUserController
 * @description register a new user , expects username,email and password in the rewuest
 * @access Public
 */


async function registerUserController(req,res) {
  const {username,email,password}=req.body

  if(!username ||!email||!password){
    return res.status(400).json({
      message:"Please Provide username ,email and password"
    })
  }
  const isUseralreadyExists=await userModel.findOne({
    $or:[{username},{email}]
  })
  if(isUseralreadyExists){
    return res.status(400).json({
      meassage:"Account already exists with this enail address and username "
    })
  }
  const hash =await bcryptjs.hash(password,10)
  const user =await userModel.create({
    username,email,password:hash
  })
  const token = jwt.sign({
    id:user._id,username:user.username
  },
process.env.JWT_SECRET,{
  expiresIn:"1d"
})
res.cookie("token",token)

res.status(201).json({
  message:"user registered successfully",
  user:{
    _id:user._id,
    username:user.username,
    email:user.email
  }

})
}


async function loginUserController(req,res) {
  const {email,password}=req.body
  const user=await userModel.findOne({email})
  if(!user){
    return res.status(400).json({
      message:"Invalid email or password"
    })
  }
  const isPasswordValid = await bcryptjs.compare(password,user.password);
  if(!isPasswordValid){
    return res.status(400).json({
      message:"Invalid email or password"
    })
  }
  const token =jwt.sign({
    id:user._id,username:user.username
  },
process.env.JWT_SECRET,{expiresIn:"1d"})
res.cookie("token",token)
res.status(200).json({
  message:"User Logged in successfully",
  user:{
    _id:user._id,
    username:user.username,
    email:user.email
  }
})
}


// async function loginUserController(req,res) {
  
// }
async function logoutUserController(req, res) {
  res.clearCookie("token");

  res.status(200).json({
    message: "User logged out successfully"
  });
}
async function getMeController(req,res){
  const user=await userModel.findById(req.user.id)

  res.status(200).json({
    message:"User fetched Successfully",
    user
  })
}
module.exports={registerUserController,
  loginUserController,
  logoutUserController,getMeController
}
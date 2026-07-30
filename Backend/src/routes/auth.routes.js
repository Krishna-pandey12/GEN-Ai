const {Router}=require('express')
const authController=require("../controllers/auth.controller")
const authMiddlewware=require("../middlewares")

const authRouter=Router()


// app.use(express.json())
/**
 * @route Post /api/aut/register
 * @description Register a new user
 * @access Public
 */


authRouter.post("/register",authController.registerUserController)

authRouter.post("/login",authController.loginUserController)

authRouter.get("/logout",authController.logoutUserController)

authRouter.get("/get-me",authMiddlewware.authUser,authController.getMeController)

module.exports=authRouter
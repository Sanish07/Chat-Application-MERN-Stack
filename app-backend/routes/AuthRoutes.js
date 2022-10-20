const express = require("express");
const router = express.Router();
const authController = require("../controllers/authRoutes/AuthController");
const verifyToken = require("../middleware/TokenAuth");

const joi = require("joi");
const validator = require("express-joi-validation").createValidator({}); 
//We have passed empty object as config as we are passing joi object to its body in further code.

const validateSignup = joi.object({
    username : joi.string().min(4).max(12).required(),
    user_email : joi.string().email().required(),
    password : joi.string().min(6).max(12).required()
})
// .required() used for any field represents, validating that field is necessary to proceed further.
const validateLogin = joi.object({
    user_email : joi.string().email().required(),
    password : joi.string().min(6).max(12).required()
})

router.post('/signup', validator.body(validateSignup), authController.controllers.signup); 
router.post('/login', validator.body(validateLogin), authController.controllers.login);

router.get('/test', verifyToken, (req,res)=>{
    return res.send("Token validated and user authentication was done successfully!!");
})
//Login and Register routes
//Both the routes will never pass the request to the controller in case validation hasn't been passed.

module.exports = router;

//Contains all the backend code for Sign Up functionality 
const UserModel = require("../../models/Users"); 
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req,res)=>{
    
    try{
        const {username, user_email, password} = req.body; //Getting inputs from client side.
        const userExists = await UserModel.exists({user_email : user_email.toLowerCase()}); //To check if the entered email account is already registered with the app or not.
        
        if(userExists){ //If user already exists.
           return res.send("This user already exists. Try to login with same user email or register with another email account.");
        } 

        const encryptedPassword = await bcryptjs.hash(password,10); //Instead of plaintext, password will be encypted in a random string. 
        //The 10 value represents the hashing algorithm power. Higher the value, less the chance of cracking it.
        // encryptedPassword = hashed password + salt(random string) - added automatically by bcrypt.

        const newUser = await UserModel.create({ //Creating user object for saving new user document to DB collection.
            username : username,
            user_email : user_email.toLowerCase(),
            password : encryptedPassword
        });

        const jwtToken = jwt.sign(
            {
               userID : newUser._id,
               user_email : newUser.user_email
            }, 
            process.env.PRIVATE_TOKEN_KEY,
            {
                expiresIn : "24h"
            }
          );

        console.log(`New user : ${newUser.username}, has signed up successfully!`);

        return res.json({ //Sending created user details.
            newUserDetails : {
                username : newUser.username,
                user_email : newUser.user_email,
                token : jwtToken
            }
        });

    } catch(error){
        res.send(`Error Occured in signing up new account. Error : ${error}`);
    }
};

module.exports = signup;
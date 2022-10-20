//Contains all the backend code for Login functionality
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../../models/Users");

const login = async (req, res) => {
  try {
    const { user_email, password } = req.body;
    const user = await UserModel.findOne({ user_email: user_email.toLowerCase() }); 
    //Finding if the email is registered in DB collection(in app).
    
    const matchPasswordFlag = await bcryptjs.compare(password, user.password); 
    //Matching the password with the one saved in DB.
    
    if (user && matchPasswordFlag) { //If user is found and password is matched
      const jwtToken = jwt.sign(
        {
           userID : user._id,
           user_email : user.user_email
        }, 
        process.env.PRIVATE_TOKEN_KEY,
        {
            expiresIn : "24h"
        }
      );
      console.log(`User : ${user.username}, has logged in successfully!`);
      return res.json({
        userDetails : {
            user_email : user.user_email,
            token : jwtToken
        }
      });

    }
    return res.send(`Entered Email/Password were invalid or Email hasn't been registered yet!`); //In case credentials were invalid.
  } catch (error) {
    res.send(`There was problem in connecting with servers. Please try again later.`);
  }
};

module.exports = login;

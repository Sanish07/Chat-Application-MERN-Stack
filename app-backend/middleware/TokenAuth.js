const jwt = require("jsonwebtoken");

const verifyJwtToken = (req, res, nextRequestStep)=>{
    let token = req.body.token || req.query.token || req.headers['authorization'];
    if(!token){
        return res.status(403).send("Token validation is required for Authentication. Please pass a valid token and login again.");
    }

    try{
        token = token.replace(/^Bearer\s+/,"");
        //Tokens come in string like : Bearer <TokenString>, above line is to remove the Bearer\s (Bearer & Blankspace) from token string.
        const verify = jwt.verify(token, process.env.PRIVATE_TOKEN_KEY);
        req.users = verify;
    } catch(error){
        return res.status(401).send(`Token Invalid, the user token didn't matched with app's auth token. Error : ${error}`);
    }
    return nextRequestStep();
}

module.exports = verifyJwtToken;
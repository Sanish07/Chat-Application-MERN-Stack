//Used at ChatServer.js
const jwt = require('jsonwebtoken');

const verifyToken = (socket,next)=>{
    let token = socket.handshake.auth?.token;
    
    try{
        const decodedToken = jwt.verify(token, process.env.PRIVATE_TOKEN_KEY);
        socket.user = decodedToken;
    } catch(error){
        console.log(error);
        const socketError = new Error('NOT_AUTHORIZED');
        return next(socketError);
    }

    next();
} 

module.exports = verifyToken;

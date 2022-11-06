const authSocket = require('./middleware/SocketAuth');
const handleNewConnection = require('./socketHandlers/NewConnection');
const handleDisconnection = require('./socketHandlers/DisconnectHandler');

const signupServer = (server)=>{
    const io = require("socket.io")(server, {
        cors : {
            origin : "*",
            methods : ["GET","POST"]
        }
    });

    io.use((socket, next)=>{ //Validating JWT Token
        authSocket(socket, next);
    });

    io.on('connection',(socket)=>{ //Handling New User Connection
        console.log('User has connected to Nitrochat Server.');
        console.log(socket.id);

        handleNewConnection(socket, io);

        socket.on('disconnect', ()=>{
            handleDisconnection(socket);
        })
    });
}

module.exports = {
    signupServer
};
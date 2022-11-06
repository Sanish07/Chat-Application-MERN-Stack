const serverStore = require('../ServerStore');

const handleNewConnection = async (socket, io) => {
    const userDetails = socket.user;
    serverStore.addNewConnectedUser({
        socketId : socket.id,
        userId : userDetails.userID,
    });
};

module.exports = handleNewConnection;
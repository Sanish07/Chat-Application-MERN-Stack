const serverStore = require('../ServerStore');

const disconnectHandler = (socket) => {
    serverStore.removeConnectedUser(socket.id);
};

module.exports = disconnectHandler;
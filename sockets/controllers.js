

const socketController = (socket) => {
    
    console.log('cliente conectado', socket.id);
    
    socket.on('disconnect', () => {
        console.log('cliente desconectado', socket.id);
    });

    //? El segundo paramentro es el id de la funcion del msj recibido del servidor callback(id)
    socket.on('enviar-mensaje', (payload, callback) => {

        const id = 123129789;//socket.request.user.id;
        callback(id)

        socket.broadcast.emit('enviar-mensaje', payload);

    });
}

module.exports = {
    socketController
}
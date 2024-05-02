const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controllers');


class Server {

    constructor() {
        this.app    = express();
        this.port   = process.env.PORT;
        // ? este app es de express que funciona con el de socket
        this.server = require('http').createServer( this.app );
        // ? configuracion de socket
        this.io     = require('socket.io')( this.server );
        
        this.paths = {}

        // ? Middlewares
        this.middlewares();

        // * rutas de mi aplicacion
        this.routes();

        //? Sockets
        this.sockets();
    }

    middlewares() {

        // CORS
        this.app.use( cors() )

        //? Directorio publico 
        this.app.use( express.static('public') )

    }

    async conectarDB() {
        await dbConnection();
    }


    routes() {

        // this.app.use( this.paths.auth, require('../routes/auth') );

    }

    sockets() {

        this.io.on('connection', socketController);
    }

    listen() {
        //? este this.server es el que esta dentro del constructor referente a sockert
        this.server.listen( this.port, () => {
            console.log('Servidor en puerto ', this.port)
        });
    }

}

module.exports = Server;
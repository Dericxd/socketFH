//? Referencia del HTML
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const message = document.querySelector('#message');
const btnSend = document.querySelector('#btnSend');


const socket = io();

//? El on en socket es para escuchar un evento
socket.on('connect', () => {

    //console.log('Connectado');

    lblOnline.style.display = "";
    lblOffline.style.display = "none";
    
});

socket.on('disconnect', () => {

    //console.log('Disconnectado');

    lblOnline.style.display = "none";
    lblOffline.style.display = "";
    
});

socket.on('enviar-mensaje', (payload) => {
    console.log(payload);
})

btnSend.addEventListener('click', () => {

    const msj = message.value;
    const payload = {
        msj,
        id: socket.id,
        date: new Date().getTime()
    }

    //? El emit en socket es para emitir un evento
    //? El tercer algumento en emit ese un callback
    socket.emit( 'enviar-mensaje', payload, ( id ) => {
        console.log('desde el server',id);
    });
});
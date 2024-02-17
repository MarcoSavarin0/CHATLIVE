import express from 'express'
import logger from 'morgan'
import { Server as SocketServer } from 'socket.io';
import http from 'http'
import { log } from 'console';

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server,{
    cors:{
        origin: "http://localhost:5173"
    }
});


io.on('connection', socket =>{
    console.log('Client Connected', socket.id);
    socket.on('message', (body)=> {
        socket.broadcast.emit('message',{
            body,
            from: socket.id.slice(6)
        })
        console.log(body);
    })
})


server.listen(3000);
console.log('listen on 3000');
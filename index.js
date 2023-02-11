const express=require('express');
const socket=require('socket.io');

const app=express();
let server=app.listen(4000,()=>{
    console.log("Server started on port 4000");
});

app.use(express.static('public'));


const io=socket(server);

io.on('connection',function(socket){
    console.log("contact light", socket.id);

    socket.on('chat',function(data){
        io.sockets.emit('chat',data);
        console.log(data);
    });
    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data);
    });
});
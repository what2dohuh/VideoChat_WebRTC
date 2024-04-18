const express = require('express')
const app = express()
const server = require('http').createServer(app)
const cors = require('cors')

app.use(cors())
const io = require('socket.io')(server,{
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
})

io.on('connection',(socket)=>{
    console.log('a user connected')
    socket.emit('me',socket.id)
    console.log(socket.id)
    socket.on('disconnect',()=>{
        console.log('user disconnected')
        socket.broadcast.emit('user-disconnected')
    })
    socket.on('calluser',({UserToCall,from,name,singnaldata})=>{
        io.to(UserToCall).emit('calluser',{signal:singnaldata,from:from,name:name})
        console.log(from)
    })
    socket.on('answercall',(data)=>{
        io.to(data.to).emit('callaccepted',data.signal)
        console.log(data.to)
    })
})
app.get('/', (req,res)=>{
    res.send("Ok")
})

const PORT = process.env.PORT || 4000;

server.listen(PORT,()=>console.log(`listening on ${PORT}`))
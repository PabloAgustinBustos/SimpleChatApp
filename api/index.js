require("dotenv").config({path: `${__dirname}/.env`})
const express = require("express")
const {createServer} = require("http")
const {Server} = require("socket.io")
const cors = require("cors")
const connectDB = require("./db")

const user = require("./routes/user")

const app = express()
const server = createServer(app)

app.use(cors())
app.use(express.json())

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
})

io.on("connect", socket => {
    console.log("se conectó un usuario")

    socket.on("disconnect", () => {
        console.log("se desconectó")
    })
})

app.use("/user", user)

async function start(){
    try{
        await connectDB(process.env.URI)
        
        app.listen(process.env.SERVER_PORT, () => console.log(`server listening on port ${process.env.SERVER_PORT}`))
        server.listen(process.env.CHAT_PORT, () => console.log(`server listening on port ${process.env.CHAT_PORT}`))
    }catch(e){
        console.log("error en función start")
    }
}

start()
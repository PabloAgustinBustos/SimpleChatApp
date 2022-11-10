require("dotenv").config({path: `${__dirname}/.env`})
const express = require("express")
const {createServer} = require("http")
const {Server} = require("socket.io")
const cors = require("cors")
const connectDB = require("./db")

const user = require("./routes/user")
const friends = require("./routes/Dashboard")

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

    socket.on("new-friend", (token) => {
        console.log("se añadió un nuevo amigo")
        io.emit("update-list", token)
    })
})

app.use((req, res, next) => {
    console.log("se hizo petición", req.method, req.url)

    next()
})

app.use("/user", user)
app.use("/friends", friends)

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
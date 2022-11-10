const User = require("../models/User")
const jwt = require("jsonwebtoken")

async function createUser(req, res){
    
    const {username, password} = req.body

    console.log(req.body)

    if(!username || !password) return res.status(400).json({status: false, message: "faltan credenciales"})

    try{
        await User.create({username, password})
    }catch(e){
        console.log("error en la bd al crear un user", e)
    }

    res.status(200).json({new: true, username, password})
}

async function logIn(req, res){
    // console.log("holaaaa")
    const {username, password} = req.body

    let user = undefined
    let token = undefined

    // console.log("recibí",req.body)

    if(!username || !password) return res.status(400).json({status: false, message: "faltan credenciales"})

    try{
        user = await User.findOne({username, password})

        token = jwt.sign(
            {_id: user._id, username},
            process.env.SECRET,
            {expiresIn: "30d"}
        )
    }catch(e){
        console.log("error en la bd al iniciar sesión")
        return res.status(404).json({status: "error", message: "usuario no registrado o no encontrado"})
    }
    
    res.status(200).json({
        message: "logged",
        token
    })
}

async function getUsers(req, res){
    let users = undefined

    try{
        users = await User.find()
        
    }catch(e){
        console.log("error en la bd al crear un user")
    }
    
    res.status(200).json(users)
}

async function get(req, res){
    let users = undefined
    const {_id, username: myUsername} = req.body

    console.log(_id)

    try{
        users = await User.find({
            "$and": [
                {
                    _id: {
                        "$ne": _id
                    }
                },
                {
                    friends: {
                        "$nin": [_id]
                    }
                },
            ]
        })
        
    }catch(e){
        console.log("error en la bd al crear un user")
    }
    
    res.status(200).json(users)
}

async function addFriend(req, res){
    console.log("recibí", req.body)
    const {friendId, _id, username} = req.body


    try{
        const me = await User.updateOne(
            {username, _id}, 
            {
                $push: {
                    friends: {_id: friendId}
                }
            }
        )
            
        console.log(me)

        const newFriend = await User.updateOne(
            {_id: friendId}, 
            {
                $push: {
                    friends: {_id}
                }
            }
        )

        console.log(newFriend)
        
    }catch(e){
        console.log("error en la bd al agregar amigo", e)
    }

    res.status(200).json(req.body)
}

async function cleanDatabase(req, res){
    try{
        await User.deleteMany()
    }catch(e){
        console.log("error en la bd al crear un user")
    }
    
    res.status(200).json({message: "eliminado"})
}

module.exports = {
    createUser,
    logIn,
    addFriend,
    cleanDatabase,
    getUsers,
    get
}
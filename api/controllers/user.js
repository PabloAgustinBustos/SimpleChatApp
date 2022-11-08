const User = require("../models/User")
const jwt = require("jsonwebtoken")

async function createUser(req, res){
    const {username, password} = req.body

    if(!username || !password) return res.status(400).json({status: false, message: "faltan credenciales"})

    try{
        await User.create({username, password})
    }catch(e){
        console.log("error en la bd al crear un user")
    }

    res.status(200).json({new: true, username, password})
}

async function logIn(req, res){
    const {username, password} = req.body

    let user = undefined
    let token = undefined

    if(!username || !password) return res.status(400).json({status: false, message: "faltan credenciales"})

    try{
        user = await User.findOne({username, password})

        token = jwt.sign(
            {id: user.id, username},
            process.env.SECRET,
            {expiresIn: "30d"}
        )
    }catch(e){
        console.log("error en la bd al crear un user")
    }
    
    res.status(200).json({
        message: "logged",
        token
    })
}

// todo: añadir amigo
async function addFriend(req, res){
    const {friendId, user} = req.body

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
    cleanDatabase
}
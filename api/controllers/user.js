const User = require("../models/User")

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

    if(!username || !password) return res.status(400).json({status: false, message: "faltan credenciales"})

    try{
        user = await User.findOne({username, password})

    }catch(e){
        console.log("error en la bd al crear un user")
    }
    
    res.status(200).json(user)
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
    cleanDatabase
}
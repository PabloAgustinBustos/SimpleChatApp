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
    res.send("loguearse")
}

async function cleanDatabase(req, res){
    res.send("clean")
}

module.exports = {
    createUser,
    logIn,
    cleanDatabase
}
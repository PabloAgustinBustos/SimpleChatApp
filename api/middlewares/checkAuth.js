const jwt = require("jsonwebtoken")

function checkAuth(req, res, next){
    
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer")) throw new Error("falta el header")

    const token = authHeader.split(" ")[1]

    try{
        const decoded = jwt.verify(token, process.env.SECRET)
        
        req.body.user = decoded
    }catch(e){
        console.log("error al decodificar")
    }
    
    next()
}

module.exports = checkAuth
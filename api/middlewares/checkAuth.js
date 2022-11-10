const jwt = require("jsonwebtoken")

function checkAuth(req, res, next){
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer")) return res.status(400).json({status: "error-token"})

    console.log("autheader", authHeader)
    
    const token = authHeader.split(" ")[1]

    try{
        const decoded = jwt.verify(token, process.env.SECRET)
        
        console.log("decoded",decoded)

        req.body._id = decoded._id
        req.body.username = decoded.username
    }catch(e){
        console.log("error al decodificar", e)
        return res.status(400).json({status: "error-token"})
    }
    
    next()
}

module.exports = checkAuth
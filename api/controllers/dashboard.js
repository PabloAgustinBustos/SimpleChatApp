const User = require("../models/User")

async function getFriends(req, res){
    const {_id} = req.body
    let friends = []

    

    if(!_id) return res.status(400).json({message: "falta el id"})

    try{
        const {friends: friendsList} = await User.findById(_id)

        

        for(let _id of friendsList){
            const friend = await User.findById(_id, "username")

            friends.push(friend)
        }
    }catch(e){
        console.log(e)
    }

    res.status(200).json(friends)
}

module.exports = {
    getFriends
}
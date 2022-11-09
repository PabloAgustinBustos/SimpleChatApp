const User = require("../models/User")

async function getFriends(req, res){
    const {id} = req.params
    let friends = []

    if(!id) return res.status(400).json({message: "falta el id"})

    try{
        const {friends: friendsList} = await User.findById(id)

        for(let {_id} of friendsList){
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
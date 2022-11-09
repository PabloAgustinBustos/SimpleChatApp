const { Schema, model, SchemaTypes } = require("mongoose")
const uuid = require("uuid")

const User = new Schema({
    _id : {
        type: SchemaTypes.String,
        default: () => uuid.v4()
    },

    username: {
        type: SchemaTypes.String,
        required: [true, "se debe proveer el username"]
    },

    password: {
        type: SchemaTypes.String,
        required: [true, "se debe proveer la contraseña"]
    },

    friends: [{
        _id : SchemaTypes.String
    }]
})

module.exports = model("User", User)
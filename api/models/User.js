const { Schema, model, SchemaTypes } = require("mongoose")
const uuid = require("uuid")

const User = new Schema({
    id: {
        type: SchemaTypes.UUID,
        default: () => uuid.v4()
    },

    username: {
        type: SchemaTypes.String,
        required: [true, "se debe proveer el username"]
    },

    password: {
        type: SchemaTypes.String,
        required: [true, "se debe proveer la contraseña"]
    }
})

module.exports = model("User", User)
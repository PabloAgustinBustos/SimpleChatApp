const { createUser, logIn, cleanDatabase, addFriend, getUsers, get } = require("../controllers/user")
const checkAuth = require("../middlewares/checkAuth")

const router = require("express").Router()

router.post("/create", createUser)
router.post("/logIn", logIn)
router.get("/getAll", getUsers)
router.get("/get", checkAuth, get)
router.post("/addFriend", checkAuth, addFriend)
router.delete("/cleanAll", cleanDatabase)

module.exports = router
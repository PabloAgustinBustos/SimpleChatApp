const { createUser, logIn, cleanDatabase, addFriend, getUsers } = require("../controllers/user")
const checkAuth = require("../middlewares/checkAuth")

const router = require("express").Router()

router.post("/create", createUser)
router.post("/logIn", logIn)
router.get("/getAll", getUsers)
router.post("/addFriend", checkAuth, addFriend)
router.delete("/cleanAll", cleanDatabase)

module.exports = router
const { createUser, logIn, cleanDatabase, addFriend } = require("../controllers/user")
const checkAuth = require("../middlewares/checkAuth")

const router = require("express").Router()

router.post("/create", createUser)
router.post("/logIn", logIn)
router.post("/addFriend", checkAuth, addFriend)
router.delete("/cleanAll", cleanDatabase)

module.exports = router
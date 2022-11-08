const { createUser, logIn, cleanDatabase } = require("../controllers/user")

const router = require("express").Router()

router.post("/create", createUser)
router.post("/logIn", logIn)
router.delete("/cleanAll", cleanDatabase)

module.exports = router
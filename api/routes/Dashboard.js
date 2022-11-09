const { getFriends } = require("../controllers/dashboard")
const router = require("express").Router()

router.get("/get/:id", getFriends)

module.exports = router
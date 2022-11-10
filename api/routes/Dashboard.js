const { getFriends } = require("../controllers/dashboard")
const checkAuth = require("../middlewares/checkAuth")
const router = require("express").Router()

router.get("/get", checkAuth, getFriends)

module.exports = router
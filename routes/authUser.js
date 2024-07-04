let express = require("express")
let router = express.Router()
const authUserController = require("../controllers/authUser.js")

router.post("/login", authUserController.login)

router.post('/signup', authUserController.signup)

module.exports = router;
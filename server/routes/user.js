

const express = require('express')
const router = express.Router()

const {user} = require("../controllers/user")
const auth = require("../middleware/auth-middleware")

router.get("/user",auth,user)

module.exports = router;
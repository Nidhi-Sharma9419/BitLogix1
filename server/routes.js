const express = require("express")
const { createuser } = require("./controllers")

const router = express.Router()

router.route('/user').post(createuser)
// router.route('/posts/:id').get(getPost).put(updatePost)
module.exports = router
const express = require("express")
const { createuser, getUser, createproduct, updateProduct, getRecProduct, getEntProduct } = require("./controllers")

const router = express.Router()

router.route('/user').post(createuser)
router.route('/user/:address').get(getUser)
router.route('/product').post(createproduct)
router.route('/recipient/:address').get(getRecProduct)
router.route('/enterprise/:address').get(getEntProduct)
router.route('/product/:id').put(updateProduct)
// router.route('/posts/:id').get(getPost).put(updatePost)
module.exports = router
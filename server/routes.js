const express = require("express")
const { createuser, getUser, createproduct, updateProduct, getRecProduct, getEntProduct, getProduct, updateUser, getUsers, getDetFromEnt } = require("./controllers")

const router = express.Router()

router.route('/user').post(createuser).get(getUsers)
router.route('/user/:address').get(getUser).put(updateUser)
router.route('/product').post(createproduct)
router.route('/product/:id').get(getProduct).put(updateProduct)
router.route('/recipient/:address').get(getRecProduct)
router.route('/enterprise/:address').get(getEntProduct)
router.route('/qaent/:address').get(getDetFromEnt)
module.exports = router
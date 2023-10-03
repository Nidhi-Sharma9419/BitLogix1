const express = require("express")
const { createuser, getUser, createproduct, updateProduct, getRecProduct, getEntProduct, getProduct, updateUser, getUsers, getDetFromEnt, createReward, getRewards, getToRec, getToRecFromSpecEnt, createInventory, updateInventory } = require("./controllers")

const router = express.Router()

router.route('/user').post(createuser).get(getUsers)
router.route('/user/:address').get(getUser).put(updateUser)
router.route('/product').post(createproduct)
router.route('/product/:id').get(getProduct).put(updateProduct)
router.route('/recipient/:address').get(getRecProduct)
router.route('/enterprise/:address').get(getEntProduct)
router.route('/qaent/:address').get(getDetFromEnt)
router.route('/reward').post(createReward)
router.route('/rewards/:address').get(getRewards)
router.route('/inventoryrec/:address').get(getToRec)
// router.route('/inventory/:recipientaddress/:enterpriseaddress').get(getToRecFromSpecEnt)
router.route('/inventory/:recipientaddress/:enterpriseaddress').post(createInventory)
router.route('/inventory/:id').put(updateInventory)

module.exports = router
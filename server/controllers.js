const User = require("./usermodal");
const Product = require("./productmodal");
const Reward = require("./rewardmodal")
const createuser = async (req, res) => {
  const { address, type, name, place, govtid } = req.body;
  const totald = {
    address: address,
    type: type,
    name: name,
    place: place,
    govtid: govtid,
  };
  try {
    const response = await User.create(totald);
    res.status(201).json({ response });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getUser = async (req, res) => {
  try {
    const { address: address } = req.params;
    const response = await User.findOne({ address: address });
    if (!response) {
      return res
        .status(404)
        .json({ msg: `no user found with address ${address}` });
    }
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getUsers = async (req, res) => {
  try {
    const response = await User.find({});
    if (!response) {
      return res.status(404).json({ msg: `no users found` });
    }
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { address: useraddress } = req.params;
    const response = await User.findOneAndUpdate(
      { address: useraddress },
      req.body,
      {
        new: true,
      }
    );
    if (!response) {
      return res
        .status(404)
        .json({ msg: `no user found with id ${useraddress}` });
    }
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createproduct = async (req, res) => {
  try {
    const response = await Product.create(req.body);
    res.status(201).json({ response });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getRecProduct = async (req, res) => {
  try {
    const { address: address } = req.params;
    const response = await Product.find({ recipientaddress: address });
    if (!response) {
      return res
        .status(404)
        .json({ msg: `no products found for address ${address}` });
    }
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getEntProduct = async (req, res) => {
  try {
    const { address: address } = req.params;
    const response = await Product.find({ enterpriseaddress: address });
    if (!response) {
      return res
        .status(404)
        .json({ msg: `no products found for address ${address}` });
    }
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id: productID } = req.params;
    const response = await Product.findOne({ _id: productID });
    if (!response) {
      return res
        .status(404)
        .json({ msg: `no product found with id ${productID}` });
    }
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id: productID } = req.params;
    const response = await Product.findOneAndUpdate(
      { _id: productID },
      req.body,
      {
        new: true,
      }
    );
    if (!response) {
      return res
        .status(404)
        .json({ msg: `no product found with id ${productID}` });
    }
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const getDetFromEnt = async (req, res) => {
  let response = [];
  try {
    // to get the products which are sent from an enterprise
    const { address: address } = req.params;
    const resp = await Product.find({ enterpriseaddress: address });

    for(let i=0;i<resp.length;i++) {
      //to get the data of each recipient (to which enterprise sent atleast a single product)
      const rec = await User.findOne({ address: resp[i].recipientaddress });
      if(rec && !(response.some(el => el.address ===resp[i].recipientaddress)) ) {
        response.push(rec)
      }

    }
    res.status(200).json({response})
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createReward = async (req, res) => {
  const { enterpriseaddress,recipientaddress } = req.body;
  const resp = await User.findOne({ address: enterpriseaddress });
  const totald = {
    enterpriseaddress: enterpriseaddress,
    enterprisename: resp.name,
    recipientaddress:recipientaddress
  };
  try {
    const response = await Reward.create(totald);
    res.status(201).json({ response });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getRewards = async (req, res) => {
  try {
    const { address: address } = req.params;
    const response = await Reward.find({ recipientaddress: address });
    if (!response) {
      return res
        .status(404)
        .json({ msg: `no rewards found for address ${address}` });
    }
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  createuser,
  getUser,
  getUsers,
  updateUser,
  createproduct,
  getProduct,
  getRecProduct,
  getEntProduct,
  updateProduct,
  getDetFromEnt,
  createReward,
  getRewards,
};

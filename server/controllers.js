const User = require("./usermodal");
const Product = require("./productmodal");
const Reward = require("./rewardmodal");
const Inventory = require("./inventorymodal");
const { transporter, mailOptions } = require("./nodemailer");

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
  // quality assurance
  let response = [];
  try {
    // to get the products which are sent from an enterprise
    const { address: address } = req.params;
    const resp = await Product.find({ enterpriseaddress: address });

    for (let i = 0; i < resp.length; i++) {
      //to get the data of each recipient (to which enterprise sent atleast a single product)
      const rec = await User.findOne({ address: resp[i].recipientaddress });
      if (
        rec &&
        !response.some((el) => el.address === resp[i].recipientaddress)
      ) {
        response.push(rec);
      }
    }
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const getToRec = async (req, res) => {
  //inverntory management
  let response = [];
  try {
    // to get the products which are sent to a recipient
    const { address: address } = req.params;
    const resp = await Product.find({ recipientaddress: address });

    for (let i = 0; i < resp.length; i++) {
      //to get the data of each enteorise (from which enterprise sent atleast a single product)
      const rec = await User.findOne({ address: resp[i].enterpriseaddress });
      if (
        rec &&
        response.some(
          (el) => el.enterpriseaddress === resp[i].enterpriseaddress
        )
      ) {
        const prod = response.find(
          (ent) => ent.enterpriseaddress === resp[i].enterpriseaddress
        );
        if (prod) {
          prod.sumqty += resp[i].quantity;
        }
      } else {
        response.push({
          enterpriseaddress: rec.address,
          enterprisename: rec.name,
          sumqty: resp[i].quantity,
        });
      }
    }

    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getToRecFromSpecEnt = async (req, res) => {
  const {
    recipientaddress: recipientaddress,
    enterpriseaddress: enterpriseaddress,
  } = req.params;
  // let response = [];
  try {
    // to get the products which are sent to a recipient
    const resp = await Product.find({
      recipientaddress: recipientaddress,
      enterpriseaddress: enterpriseaddress,
    });
    const user = await User.findOne({ address: enterpriseaddress });
    let sum = 0;
    for (let i = 0; i < resp.length; i++) {
      sum += resp[i].quantity;
    }
    const response = {
      enterpriseaddress: enterpriseaddress,
      enterprisename: user.name,
      enterprisemail: user.email,
      productsavailable: sum,
      products: resp,
    };
    // const rec = await User.findOne({ address: enterpriseaddress });
    // for (let i = 0; i < resp.length; i++) {
    //   //to get the data of each enteorise (from which enterprise sent atleast a single product)
    //   if (
    //     response.some(
    //       (el) => el.enterpriseaddress === resp[i].enterpriseaddress
    //     )
    //   ) {
    //     const prod = response.find(
    //       (ent) => ent.enterpriseaddress === resp[i].enterpriseaddress
    //     );
    //     if (prod) {
    //       prod.sumqty += resp[i].quantity;
    //     }
    //   } else {
    //     response.push({
    //       enterpriseaddress: rec.address,
    //       enterprisename: rec.name,
    //       sumqty: resp[i].quantity,
    //     });
    //   }
    // }

    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const createReward = async (req, res) => {
  const { enterpriseaddress, recipientaddress } = req.body;
  const resp = await User.findOne({ address: enterpriseaddress });
  const totald = {
    enterpriseaddress: enterpriseaddress,
    enterprisename: resp.name,
    recipientaddress: recipientaddress,
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

const createInventory = async (req, res) => {
  const {
    recipientaddress: recipientaddress,
    enterpriseaddress: enterpriseaddress,
  } = req.params;
  try {
    const pro = await Inventory.findOne({
      recipientaddress: recipientaddress,
      enterpriseaddress: enterpriseaddress,
    });
    if (pro) {
      const response = pro;
      res.status(200).json({ response });
    } else {
      const resp = await Product.find({
        recipientaddress: recipientaddress,
        enterpriseaddress: enterpriseaddress,
      });
      const user = await User.findOne({ address: enterpriseaddress });

      let sum = 0;
      for (let i = 0; i < resp.length; i++) {
        sum += resp[i].quantity;
      }
      const totald = {
        productsavailable: sum,
        recipientaddress: recipientaddress,
        enterpriseaddress: enterpriseaddress,
        enterprisename: user.name,
        enterprisemail: user.email,
      };
      const response = await Inventory.create(totald);
      res.status(200).json({ response });
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateInventory = async (req, res) => {
  try {
    const { id: inventoryID } = req.params;
    const response = await Inventory.findOneAndUpdate(
      { _id: inventoryID },
      req.body,
      {
        new: true,
      }
    );
    if (!response) {
      return res
        .status(404)
        .json({ msg: `no inventory found with id ${productID}` });
    }
    if (req.body.date) {
      try {
        await transporter.sendMail({
          from: "bitlogix.vercel@gmail.com",
          to: `${response.enterprisemail}`,
          subject: "Date wise Recurring Order",
          text: `Hello ${response.enterprisename},\nYour recipient ${response.recipientaddress} wants you to send products on the date of ${response.date} every month`,
        });
        // return res.status(200).json({ success: true });
      } catch (error) {
        // return res.status(400).json({ msg: error.message });
      }
    }
    if (response.triggerlevel >= response.productsavailable) {
      try {
        await transporter.sendMail({
          from: "bitlogix.vercel@gmail.com",
          to: `${response.enterprisemail}`,
          subject: "Trigger Level Reached",
          text: `Hello ${response.enterprisename},\nYour recipient ${response.recipientaddress}'s trigger level is reached.\nPlease Reorder the product`,
        });
        // return res.status(200).json({ success: true });
      } catch (error) {
        // return res.status(400).json({ msg: error.message });
      }
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
  getToRec,
  getToRecFromSpecEnt,
  createInventory,
  updateInventory,
};

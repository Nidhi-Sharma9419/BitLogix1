const User = require("./usermodal");
const Product = require("./productmodal");


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

const createproduct = async (req, res) => {
  try {
    const response = await Product.create(req.body);
    res.status(201).json({ response });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getProduct = async (req, res) => {
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

  const updateProduct = async (req,res) => {
    try {
        const {id:productID} = req.params
        const response = await Product.findOneAndUpdate({_id:productID},req.body, {
            new:true,
        })
        if(!response) {
            return res.status(404).json({msg:`no product found with id ${productID}`})
        }
        res.status(200).json({response})
    } catch (error) {
        res.status(500).json({ msg:error})
    }
}

module.exports = {
  createuser,
  getUser,
  createproduct,
  getProduct,
  updateProduct,
};

const User = require("./usermodal")

const createuser = async (req,res) => {
    const {address,type,name,place,govtid} = req.body;
    const totald = {
        address:address,
        type:type,
        name:name,
        place:place,
        govtid:govtid,
    }
    try {
        const response = await User.create(totald)
        res.status(201).json({response})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}


module.exports = {
    createuser,
}
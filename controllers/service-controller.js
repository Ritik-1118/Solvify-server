const Service = require("../models/service-model.js");

const services = async (req,res)=>{
    try {
        const response = await Service.find();
        if(!response){
            return res.status(404).json({msg: "no service found"});
        }else{
            res.status(200).json({response});
        }
    } catch (error) {
        return res.status(500).json({message: error});
    }
};


module.exports = services;
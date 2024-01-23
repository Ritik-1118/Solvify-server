const Contact = require("../models/contact-model.js");

const contactForm = async (req,res)=>{
    try {
        const response = req.body;
        const messageSended = await Contact.create(response);
        if(messageSended){
            return res.status(200).json({message: "message send successfully"});
        }
    } catch (error) {
        return res.status(500).json({message: "Message not delivered"});
    }
};


module.exports = contactForm;
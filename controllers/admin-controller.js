const User = require("../models/user-model.js");
const Contact = require('../models/contact-model.js')

const getAllUsers = async (req,res,next)=>{
    try {
        const users = await User.find({}, {password:0});
        if(!users || users.length === 0){
            console.log(users);
            return res.status(404).json({message:"No Users Found!"});
        }
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}
// Delete by admin
const deleteUserById = async(req,res)=>{
    try {
        const id = req.params.id;
        await User.deleteOne({_id:id});
        return res.status(200).json({message:"User deleted successfully."});
    } catch (error) {
        next(error);
    }
}
// Single user for Edit by admin
const getUserById = async(req,res,next)=>{
    try {
        // console.log("GetUserById called")
        const id = req.params.id;
        const data = await User.findOne({_id:id}, {password:0});
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}
// User Update Logic
const updateUserById = async(req,res,next)=>{
    try {
        const id = req.params.id;
        const updatedUserData = req.body;
        const updatedData = await User.updateOne({_id:id}, {
            $set: updatedUserData,
        })
        return res.status(200).json(updatedData)
    } catch (error) {
        next(error);
    }
}


// For Contacts
const getAllContacts = async(req,res)=>{
    try {
        const contacts = await Contact.find();
        if(!contacts || contacts.length === 0){
            console.log(contacts);
            return res.status(404).json({message:"No Message Found!"});
        }
        return res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
}
// Delete Contact by admin
const deleteContactById = async(req,res)=>{
    try {
        const id = req.params.id;
        await Contact.deleteOne({_id:id});
        return res.status(200).json({message:"Contacts deleted successfully."});
    } catch (error) {
        next(error);
    }
}
// Single contact for Edit by admin
const getContactById = async(req,res,next)=>{
    try {
        // console.log("GetUserById called")
        const id = req.params.id;
        const data = await Contact.findOne({_id:id}, {password:0});
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}
// Contacts Update Logic
const updateContactById = async(req,res,next)=>{
    try {
        const id = req.params.id;
        const updatedContactData = req.body;
        const updatedData = await Contact.updateOne({_id:id}, {
            $set: updatedContactData,
        })
        return res.status(200).json(updatedData)
    } catch (error) {
        next(error);
    }
}


// Exporting All modules
module.exports = {
    getAllUsers,
    getAllContacts,
    getUserById,
    deleteUserById, 
    updateUserById, 
    deleteContactById,
    getContactById,
    updateContactById
};
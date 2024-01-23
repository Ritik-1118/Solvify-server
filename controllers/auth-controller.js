const User = require("../models/user-model.js")
const bcrypt = require("bcrypt");

const home = async(req,res)=>{
    try{
        res.status(200).send({message:"Home"});
    }catch(error){
        console.log("Error: ",error);
    }
}
const register = async(req,res,next)=>{
    try {
        const {userName, email, phone, password} = req.body;
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(404).json({message:"user already exists"});
        }else{
            // Password hashing
            // const saltRound = 10;
            // const hash_password = await bcrypt.hash(password,saltRound);
            const userCreated = await User.create({
                userName,
                email,
                phone,
                password
            });
            res.status(201).json({
                msg: "Registration successful", 
                token: await userCreated.generateToken(),
                userId: userCreated._id.toString(),
            });
        }
    } catch (error) {
        // res.status(500).json({msg:"internal server error.",error});
        next(error);
    }
};

const login = async (req,res)=>{
    try {
        const {email,password} = req.body;

        const userExist = await User.findOne({email});
        if(!userExist){
            return res.status(500).json({msg:"Invalid credentials."});
        }
        const user = await userExist.Comparepswd(password);
        console.log(user,userExist);
        if(user){
            res.status(200).json({
                msg: "Login Successful", 
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            });
        }else{
            res.status(401).json({msg:"Invalid email or password"});
        }
    } catch (error) {
        res.status(500).json({msg:"internal server error.",error});
    }
}


// TO send user data on frontend
const user = async (req,res)=>{
    try {
        const userData = req.user;
        return res.status(200).json({userData});
    } catch (error) {
        console.log(`Error fro the user Route ${error}`);
    }
}

module.exports = {home, register, login, user};
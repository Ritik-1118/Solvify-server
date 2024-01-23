const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
});

// Hashing the password with bcrypt
userSchema.pre("save", async function (next) {
    const user = this;
    if(!user.isModified("password")){
        next();
    }
    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password,saltRound);
        user.password = hash_password;
    } catch (error) {
        next(error);
    }
});

// Json web token(JWT)
userSchema.methods.generateToken = async function(){
    try {
        const jwtSign = jwt.sign(
            {
                userId:this._id.toString(),
                email:this.email,
                isAdmin:this.isAdmin,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn:"30d",
            }
        );
        return jwtSign;
    } catch (error) {
        console.error(error);
    }
};

userSchema.methods.Comparepswd = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Define the model or collection name
const User = new mongoose.model("User",userSchema);

module.exports = User;
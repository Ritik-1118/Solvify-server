const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI;


const connectDb = async(req,res)=>{
    try {
        await mongoose.connect(URI);
        console.log("Connection successful.");
    } catch (error) {
        console.error("database connection failed!");
        process.exit(0);
    }
}


module.exports = connectDb;
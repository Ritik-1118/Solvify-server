require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authRoute = require("./router/auth-router.js");
const contactRoute = require("./router/contact-router.js");
const serviceRoute = require("./router/service-router.js");
const connectDb = require("./utils/db.js");
const errorMiddleware = require( "./middlewares/error-middleware.js" );
const adminRoute = require("./router/admin-router.js");

// For cors policy
const corsOptions = {
    origin:"*",
    methods:"POST,GET,PATCH,PUT,DELETE,HEAD",
    Credential:true,
}
app.use(cors(corsOptions));
// For allow json
app.use(express.json());

// For admin
app.use("/api/admin",adminRoute);

app.use("/api/auth", authRoute);
app.use("/api/form",contactRoute);
app.use("/api/data",serviceRoute);

app.get("/", (req,res)=>{
    res.status(200).send("HEY, Welcome!<br>This our home page.");
})

app.use(errorMiddleware);
connectDb().then(()=>{
    const PORT = 8000;
    app.listen(PORT,()=>{
        console.log(`Server running at http://localhost:${PORT}`);
    });
});
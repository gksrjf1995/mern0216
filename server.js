const expres= require("express");
require("dotenv").config();
const app = expres();
const PORT =  process.env.PORT || 4500
const path = require("path");
const home = require("./routes/root")
const {logger , logEvent} = require('./middleware/logger.js');
const {errorHandler} = require("./middleware/errorHandler.js");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const mongoose = require("mongoose");
const ConnectDB = require("./config/dbConn.js");
const CorsOption = require("./config/corsOptions.js");
const userRouter = require("./routes/userRoutes");
const bodyParser = require("body-parser");


ConnectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors(CorsOption));
app.use(cookieParser());
app.use(expres.json());
app.use(logger); 
app.use("/",expres.static(path.join(__dirname,"/public")));




app.use('/',home)
app.use("/users",userRouter)



app.all('*',(req,res)=>{
    res.status(404);
    res.sendFile(path.join(__dirname,"/views","404.html"));
})

// app.use(errorHandler);

mongoose.connection.once("open",()=>{
    app.listen(PORT ,()=>{
        console.log(`SERVER RUNING on ${PORT} number`);
    })
});

mongoose.connection.on("error",(err)=>{
    console.log(err);
    logEvent(`${err.no} : ${err.code}\t ${err.syscall}\t ${err.hostname}`,"mongoErrLog.log");
});




const expres= require("express");
const employesscontroller = require("./routes/employessrouter.js");
require("dotenv").config();
const app = expres();
const PORT =  process.env.PORT || 4500
const path = require("path");

console.log(process.env.PORT);
app.use("/",expres.static(path.join(__dirname,"/public")));
console.log(__dirname);



app.use("/employess",employesscontroller)



app.listen(PORT ,()=>{
    console.log(`SERVER RUNING on ${PORT} number`);
})



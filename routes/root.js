const express = require("express");
const router = require("express").Router();
const path = require("path");

const home = router.get("^/$|/index(.html)?",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","views","index.html"))
});

module.exports =   home  
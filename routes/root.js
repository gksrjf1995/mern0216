const express = require("express");
const router = require("express").Router();
const path = require("path");

router("^/$|/index(.html)?",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","views","index.html"))
});

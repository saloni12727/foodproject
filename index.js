const express=require("express");
const app=express();
const port=5050;

app.get("/",(req,res)=>{
    res.send("hello saloni...............");
})

app.listen(port,()=>{
    console.log("running on port number"+port);
})
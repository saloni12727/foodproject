const express=require('express')
const router=express.Router();
const MyOrder=require('../model/orders')

router.post('/myorderdata',async(req,res)=>{

    try{
        let myData= await MyOrder.findOne({'email':req.body.email})
        res.json({orderdarta:myData})
    }catch(error)
    {
        res.send("server Error",error.message)
    }
})

module.exports=MyOrder
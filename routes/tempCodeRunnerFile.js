const express=require('express');
const router=express.Router();

router.post('/foodData',(req,res)=>{
    try{
        console.log(global.food_items)
        res.send([global.food_items])
    }catch(err){
   console.log(err)
   res.send("server Eror");
    }
})
console.log(global.food_items)
module.exports=router
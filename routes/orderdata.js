const express=require('express')
const router=express.Router();
const Order=require('../model/orders')

router.post('/orderdata',async(req,res)=>{
    let data= req.body.order_data
    await data.splice(0,0,{order_date: req.body.order_date})

    let eid = await Order.findOne({'email':req.body.email})
    // console.log(eid)
    if(eid === null)
    {
        try{
            await Order.create({
                email:req.body.email,
                order_data:[data]
            }).then(()=>{
                res.json({success:true})
            })
        }catch(error)
        {
            console.log(error.message)
            res.send("server Errore",error.message)
        }
    }
    else{
        try{
            await Order.findOneAndUpdate({email:req.body.email},
                {
                    $push:{order_data:data}}).then(()=>{
                        res.json({success:true})
                    })
                }catch(error)
                {
                    res.send("server Erore",error.message)
                }
    } 
})


// router.post('/myorderdata', async (req, res) => {
//     try {
//         let myData = await Order.findOne({ 'email': req.body.email });
//         res.json({ orderData: myData });
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error: error.message });
//     }
// });


module.exports=router


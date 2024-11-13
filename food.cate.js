var mongoose=require("mongoose");
const Schema=mongoose.Schema;
var food_category=new Schema({
    // scode:{type:Number},
    // sname:{type:String},
    // ccode:{type:Number},
    // cname:{type:String}
},
{
    collection:"food_category"
}
);
module.exports=mongoose.model("food_category",food_category);
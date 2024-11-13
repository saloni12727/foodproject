var mongoose=require("mongoose");
const Schema=mongoose.Schema;
var food_item=new Schema({
    // scode:{type:Number},
    // sname:{type:String},
    // ccode:{type:Number},
    // cname:{type:String}
},
{
    collection:"food_item"
}
);
module.exports=mongoose.model("food_item",food_item);
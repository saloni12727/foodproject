var express = require("express");
// var bodyParser = require('body-parser');
// var cors = require('cors');
var mongoose = require('mongoose');
var db = require('./db');
var app = express();
const PORT = 5000;

const food = require('./food.model');
const foodcatg = require('./food.cate');
const orders=require('./model/orders')
const user=require('./model/user')

const createuser = require('./routes/createuser');
const router = require('./routes/createuser')
// const router = require('./routes/orderdata')
// const display=require('./routes/displayData')

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type, Accept"
    );
    next();
})

app.use(express.json());
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api',router)
app.use('/api',require("./routes/createuser"))
app.use('/api',require("./routes/DisplayData"))
app.use('/api',require("./routes/orderdata"))
app.use('/api',require("./routes/myorderdata"))




const mongoDB = async () => {
    try {
        await mongoose.connect(db.URL);
        console.log("Database is connected: " + db.URL);

        const fetchitem = await mongoose.connection.db.collection("food_item").find({}).toArray();
       const fetchcate = await mongoose.connection.db.collection("food_category").find({}).toArray();
        global.food_items=fetchitem;
        global.food_catg=fetchcate
        // console.log(global.food_items)
        // console.log(global.food_catg)
    } catch (err) {
        console.error("An error occurred while connecting to the database:", err);
    }
};


app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});

mongoDB(); // Call the function to connect to the database
module.exports = mongoDB;

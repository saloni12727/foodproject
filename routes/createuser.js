const express = require("express");
const router = express.Router();
const User = require("../model/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt =require('jsonwebtoken')
const jwtSecret="MyNameIsEndYoEndEncyptedYoutube1$"

router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name", "length minimum 6").isLength({ min: 6 }),
    body("password", "invalid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt)
    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
   
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);
router.post(
    "/loginuser",  [
        body("email").isEmail(),
        body("password", "invalid password").isLength({ min: 5 })]
      ,async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        let email=req.body.email
      try {
      let userData=  await User.findOne({email})
        if(!userData)
        {
            return res.status(400).json({ errors: "Invalid Email"});
        }
        const pwdCompare =await bcrypt.compare(req.body.password,userData.password)
        if(!pwdCompare)
        {
            return res.status(400).json({ errors: "Invalid Password"});
        }
        const data={
          user:{
            id:userData.id
          }
        }
        const authToken=jwt.sign(data,jwtSecret)
        return res.json({success:true,authToken:authToken})
    }catch (err) {
            console.log(err);
            res.json({ success: false });
        }
    })
module.exports = router;


const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");



router.post("/" , async(req , res) => {


try {

  const newUser = await new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  
  const user = await newUser.save();

  jwt.sign({user : newUser} , 'secretKey' , (err , token) => {
    res.status(200).json(token);

  })

} catch (e) {
console.log(e);

}



})



module.exports = router

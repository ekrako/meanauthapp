const express = require('express');
const router = express.Router();

//register
router.get('/register',(req,res,next)=>{
  res.send('REGISTER Route');
});

//authenticate
router.get('/authenticate',(req,res,next)=>{
  res.post('AUTHENTICATE Route');
});

//Profile
router.get('/profile',(req,res,next)=>{
  res.send('PROFILE Route');
});
//Validate
router.get('/validate',(req,res,next)=>{
  res.send('VALIDATE Route');
});

module.exports = router;

const { Router, query } = require('express');
const express = require('express');
const app = express();
const userRoute = express.Router();
var User= require('../models/users')
var passport=require('passport')


// Get single route
userRoute.route('/get-route/:email').get((req, res,next) => {
  User.findOne( {'users.email':req.params.id},
    function(err, data) {
      if (err) {
        return next(err)
      } else {
        res.json(data);
      }
    })
})



userRoute.post('/register', function(req,res,next){
addToDB(req,res);
});

async function addToDB(req,res){
  var user=new User({
    name: req.body.name,
    lastname:req.body.lastname,
    phone:req.body.phone,
    email:req.body.email,
    password: User.hashPassword(req.body.password),
    creation_dt:Date.now()
  });

  try{
    doc= await user.save()
    return res.status(201).json(doc)

  } catch(err){
    return res.status(501).json(err)

  }
}

userRoute.post('/login', function(req,res,next){
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.status(501).json(err); }
    if (!user) { return res.status(501).json(info); }
    req.logIn(user, function(err) {
      if (err) { return res.status(501).json(err); }
      return res.status(200).json({message:'Login success'})
    });
  })(req, res, next);
});

userRoute.get('/home', isValidUser, function(req,res,next){
  return res.status(200).json(req.user);
});

userRoute.get('/logout', isValidUser, function(req,res,next){

  req.logout();
  return res.status(200).json({message: 'Logout success'});
})


function isValidUser(req,res,next){
  if(req.isAuthenticated()) next();
  else return res.status(401).json({message:'Unauthorized Request'})
}

module.exports = userRoute;
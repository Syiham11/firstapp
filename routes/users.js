var express = require('express');
var router = express.Router();
var User = require("../models/UserSchema");
var bcrypt = require("bcrypt");
const passport = require("passport");
const {forwardAuth} = require("../config/auth");
/* GET users listing./ login */
router.get('/login', forwardAuth, function(req, res, next) {
  res.render('login',{title:"halaman login"});
});

// registrasi
router.get('/register', forwardAuth, function(req, res, next){
  res.render('register',{title:"halaman register"});
});

//action login
router.post("/login", forwardAuth, function(req,res, next){
  // console.log(req.body);
  const{email,password} = req.body;
  let errors = [];
  if( !email || !password ){
    errors.push({msg:"Silahkan Lengkapi Data Anda"});
    console.log("Silahkan Lengkpi Data anda");
    }
    if(errors.length > 0){
      res.render("register",{
        errors,
        
        email,
        password
        
      })
      }else{

        // User.findOne({email:email}).then(user=>{
        //   if(user){
        //     if(bcrypt.compareSync(password,user.password)){
        //       res.redirect("/dashboard");
        //     }else{
        //       errors.push({msg:"pass salah"});
        //       res.render("login",{
        //         errors
        //       });

        //     }
        //   }else{
        //     errors.push({msg:"Email Belum terdaftar"});
        //     res.render("login",{
        //       errors
        //     });
        //   }
        // })
        passport.authenticate('local', { successRedirect: '/dashboard',
                                   failureRedirect: '/auth/login',
                                   failureFlash: true })(req,res,next)
      }
});

//action register 
router.post('/register', forwardAuth, function(req,res){
  // console.log(req.body);
  const {name, email, password, password2} = req.body;
  let errors = [];


if(!name || !email || !password || !password2){
errors.push({msg:"Silahkan Lengkapi Data Anda"});
console.log("Silahkan Lengkpi Data anda");
}
if(password != password2){
errors.push({msg:"password konfimasi salah"});
console.log("password konfimasi salah");
}
if(errors.length > 0){
res.render("register",{
  errors,
  name,
  email,
  password,
  password2
})
}else{

  User.findOne({email:email}).then(
    user =>{
      if(user){
        console.log("email sudah ada");

errors.push({msg:"email sudah ada"});
res.render("register",{
  errors,
  name,
  email,
  password,
  password2
})
      }
      else{
const newUser = new User({
  name,
  email,
  password
});
newUser
.save()
.then(user => {
  console.log("yehh");
  res.redirect("/auth/login");
})
.catch(err => console.log(err));
      }
    }
  )
}
});

//logout
router.get("/logout", function(req,res){
  req.logout();
  res.redirect("/");
})
module.exports = router;

var LocalStrategy = require('passport-local').Strategy;
var Users = require("../models/users");
var bcrypt = require("bcryptjs");

module.exports = function(passport){


    // if we have different name for "username and password"
     
        passport.use(new LocalStrategy({
            usernameField : "email",
            passwordField : "password"
        },function(username, password, done){
        console.log(username + " " + password);
        Users.findOne({email: username}, (err, user)=>{
            if(err){
                console.log(err)
            }
            if(!user){
                return done(null, false, {message : "No user found"});
            }

            bcrypt.compare(password, user.password, function(err, isMatch){
                if(err){
                    console.log(err)
                }
                if(isMatch){
                    return done(null, user);
                }else{
                    return done(null, false, {message : "Wrond password"});
                }
            });
        });
    }));

    passport.serializeUser(function(user, done){
        console.log("serializeUser");
        console.log(user);
        return done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        console.log("deserializeUser")
        console.log(id);
        Users.findById(id,(err, user)=>{
            done(err, user);
        });
    });
}
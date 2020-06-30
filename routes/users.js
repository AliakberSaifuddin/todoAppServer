var express = require('express');
const bodyParser = require('body-parser');
var passport = require("passport");
var bcrypt = require("bcryptjs");

// set User model
var Users = require('../models/users');
var router = express.Router();
router.use(bodyParser.json());

/*
    Post Register
 */
router.post('/register', function(req, res, next){
    
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    Users.findOne({email: email})
    .then((user)=>{
        if(user){
            res.status(500).json({status:"error", resCode: 500, msg:"users Already exist"});
        }
        else{
            var user = new Users({
                name : name,
                email : email,
                password : password
            });

            bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(user.password, salt, (err, hash)=>{
                    if(err){
                            console.log(err);
                    }
                    user.password = hash;
                    
                    Users.create(user)
                    .then((user) => {
                        console.log('User Created ', user);
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(user);
                    }, (err) => next(err))
                    .catch((err) => next(err));
                })
            });
        }
    }, (err)=>{
        next(err);
    })
    .catch((err)=>{
        next(err)
    }) 
});

/*
    Post Login page
*/

router.post("/login", passport.authenticate('local'), 
    (req, res, next)=>{
    //    res.header("csrfToken", req.csrfToken());
            console.log('User Created ', req.user);
            res.json(req.user);
    }
);
            
/*
    get Logout
*/

router.get("/logout", function(req, res, next){
    req.logOut();
    res.json("logout successfull");
});

module.exports = router;
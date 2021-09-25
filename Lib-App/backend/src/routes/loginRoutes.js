const express = require("express");
const bcrypt = require('bcryptjs');
const loginRouter = express.Router();
const credData = require('../model/credentialData');

function lRouter(nav, redirectHome){
    loginRouter.get('/', redirectHome, function(req,res){

        if(!req.session.userId){
            var nav=[{link:'/books', name:'Books'},{link:'/authors', name:'Authors'},{link:'/login', name:'Login'},{link:'/signup', name:'Sign Up'}];
        }else{
            var nav=[{link:'/books', name:'Books'},{link:'/authors', name:'Authors'},{link:'/edit', name:'Post'},{link:'/logout', name:'Logout'}];
        }

        res.render('login',{
            nav,
            title: 'Login'
        });
    });

    loginRouter.post('/auth', redirectHome, function(req,res){
        var mail= req.body.email;
        var pwd= req.body.password;
        credData.findOne({email: mail})
        .then(function (credential){
            if(bcrypt.compareSync(pwd, credential.password)){
                req.session.isAuth = true;
                req.session.userId = credential._id;
                res.redirect('/books');
            }
            else{
                res.redirect('/login');
            }
        }); 
    });
    
    return loginRouter;
};

module.exports = lRouter;
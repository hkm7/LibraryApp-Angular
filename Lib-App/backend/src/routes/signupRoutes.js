const express = require("express");
const bcrypt = require('bcryptjs');
const signupRouter = express.Router();
const credData = require('../model/credentialData');

function sRouter(nav,redirectHome){
    signupRouter.get('/', redirectHome, function (req, res){

        if(!req.session.userId){
            var nav=[{link:'/books', name:'Books'},{link:'/authors', name:'Authors'},{link:'/login', name:'Login'},{link:'/signup', name:'Sign Up'}];
        }else{
            var nav=[{link:'/books', name:'Books'},{link:'/authors', name:'Authors'},{link:'/edit', name:'Post'},{link:'/logout', name:'Logout'}];
        }

        res.render('signup',{
            nav,
            title : 'Signup'
        })
    });

    signupRouter.post('/auth', redirectHome, async (req,res)=>{
        var passwordHash = bcrypt.hashSync(req.body.pwd, 10);
        var mail = req.body.mailId;
        var item = {
            phone:req.body.phoneNum,
            email: mail,
            password: passwordHash
        };
        let cred = await credData.findOne({email: mail});
        if(!cred){
            var creds = credData(item);
            await creds.save();
            req.session.userId = creds._id;
            req.session.isAuth = true;
            res.redirect('/books');     
        }  
        else{
            res.redirect('/login');
        }
        return res.redirect('/');
        
             
    });
    
    return signupRouter;
};

module.exports= sRouter;
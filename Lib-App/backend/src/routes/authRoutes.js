const express = require('express');
const authData = require('../model/authData');
const authRouter = express.Router();

function authR(nav){
    authRouter.get('/',function(req, res){

        if(!req.session.userId){
            var nav=[{link:'/books', name:'Books'},{link:'/authors', name:'Authors'},{link:'/login', name:'Login'},{link:'/signup', name:'Sign Up'}];
        }else{
            var nav=[{link:'/books', name:'Books'},{link:'/authors', name:'Authors'},{link:'/edit', name:'Post'},{link:'/logout', name:'Logout'}];
        }

        authData.find()
        .then(function(auth){
            res.render("authors",{
                nav,
                title:'Authors',
                auth
            });
        });
    });

    authRouter.get('/:id',function(req,res){

        if(!req.session.userId){
            var nav=[{link:'/books', name:'Books'},{link:'/authors', name:'Authors'},{link:'/login', name:'Login'},{link:'/signup', name:'Sign Up'}];
        }else{
            var nav=[{link:'/books', name:'Books'},{link:'/authors', name:'Authors'},{link:'/edit', name:'Post'},{link:'/logout', name:'Logout'}];
        }

        const id = req.params.id;
        authData.findOne({_id: id})
        .then(function(auth){
            res.render('author',{
                nav,
                title: auth.name,
                auth
            });
        });
    });

    return authRouter;

}

module.exports = authR;
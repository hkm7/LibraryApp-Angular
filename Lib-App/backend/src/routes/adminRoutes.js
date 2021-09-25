const express = require('express');
const adminRouter = express.Router();
const bookData = require('../model/BookData');
const authData = require('../model/authData');

function router(nav, redirectLogin){
    adminRouter.get('/', redirectLogin,function(req, res){

        if(!req.session.userId){
            var nav=[{link:'/books', name:'Books'},{link:'/authors', name:'Authors'},{link:'/login', name:'Login'},{link:'/signup', name:'Sign Up'}];
        }else{
            var nav=[{link:'/books', name:'Books'},{link:'/authors', name:'Authors'},{link:'/edit', name:'Post'},{link:'/logout', name:'Logout'}];
        }

        var auth='',book='';
        res.render('edit',{
            nav,
            auth,
            book,
            title: 'Edit Data',
            act1:'/edit/addBook',
            act2:'/edit/addAuth'
        })
    });

    adminRouter.post('/addBook', redirectLogin,function(req,res){
        var item = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            image: req.body.image,
            bio: req.body.bio,
        };

        var book = bookData(item);
        book.save(); //saving to db
        res.redirect('/books');
    });

    adminRouter.post('/addAuth', redirectLogin, function(req,res){
        var item = {
            name: req.body.name,
            image: req.body.image,
            bio: req.body.bio,
            bio2: req.body.bio2
        };

        var auth = authData(item);
        auth.save();
        res.redirect('/authors');
    });

    adminRouter.get('/editbook/:id', redirectLogin,function(req,res){

        if(!req.session.userId){
            var nav=[{link:'/books', name:'Books'},{link:'/authors', name:'Authors'},{link:'/login', name:'Login'},{link:'/signup', name:'Sign Up'}];
        }else{
            var nav=[{link:'/books', name:'Books'},{link:'/authors', name:'Authors'},{link:'/edit', name:'Post'},{link:'/logout', name:'Logout'}];
        }

        // res.send("yay");
        const id = req.params.id; 
        var auth='';
        bookData.findOne({_id: id})
        .then(function(book){
           res.render('edit',{
                nav,
                title: "Edit data",
                book,
                auth,
                act1:'/edit/editbook/'+id,
                act2:'/edit/addAuth'
            });
        });
    });

    adminRouter.get('/editauth/:id', redirectLogin,function(req,res){

        if(!req.session.userId){
            var nav=[{link:'/books', name:'Books'},{link:'/authors', name:'Authors'},{link:'/login', name:'Login'},{link:'/signup', name:'Sign Up'}];
        }else{
            var nav=[{link:'/books', name:'Books'},{link:'/authors', name:'Authors'},{link:'/edit', name:'Post'},{link:'/logout', name:'Logout'}];
        }

        const id = req.params.id;
        var book='';
        authData.findOne({_id: id})
        .then(function(auth){
            res.render('edit',{
                nav,
                title: "Edit data",
                book,
                auth,
                act1:'/edit/addBook',
                act2:'/edit/editauth/'+id
            });
        });
    });

    adminRouter.post('/editbook/:id',(req,res)=> {
        const id = req.params.id;
        filter= { _id : id };
        var item = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            image: req.body.image,
            bio: req.body.bio,
        };
        
        bookData.findOneAndUpdate(filter, {$set:item})
        .then(function(){
            res.redirect('/books');
        });

        res.redirect('/books');
    });

    adminRouter.post('/editauth/:id',(req,res)=> {
        const id = req.params.id;
        filter= { _id : id };
        var item = {
            name: req.body.name,
            image: req.body.image,
            bio: req.body.bio,
            bio2: req.body.bio2
        };
        
        authData.findOneAndUpdate(filter, {$set:item})
        .then(function(){
            res.redirect('/authors');
        });

        res.redirect('/authors');
    });

    adminRouter.post('/deletebook/:id',redirectLogin, function(req,res){
        const id = req.params.id;
        bookData.deleteOne({_id: id})
        .then(function(x){
            res.redirect('/books');
        });
        
    });

    adminRouter.post('/deleteauth/:id',redirectLogin, function(req,res){
        const id = req.params.id;
        authData.deleteOne({_id: id})
        .then(function(x){
            res.redirect('/authors');
        });
    });

    return adminRouter;
};

module.exports = router;

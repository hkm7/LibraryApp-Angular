const express = require('express');
const booksRouter = express.Router();
const bookData = require('../model/BookData');

function router(nav){   
    booksRouter.get('/',function(req, res){

        if(!req.session.userId){
            var nav=[{link:'/books', name:'Books'},{link:'/authors', name:'Authors'},{link:'/login', name:'Login'},{link:'/signup', name:'Sign Up'}];
        }else{
            var nav=[{link:'/books', name:'Books'},{link:'/authors', name:'Authors'},{link:'/edit', name:'Post'},{link:'/logout', name:'Logout'}];
        }

        bookData.find()
        .then(function(books){
            res.render("books",{
                nav,
                title:'Books',
                books
            });
        });   
    });

    booksRouter.get('/:id',function(req,res){

        if(!req.session.userId){
            var nav=[{link:'/books', name:'Books'},{link:'/authors', name:'Authors'},{link:'/login', name:'Login'},{link:'/signup', name:'Sign Up'}];
        }else{
            var nav=[{link:'/books', name:'Books'},{link:'/authors', name:'Authors'},{link:'/edit', name:'Post'},{link:'/logout', name:'Logout'}];
        }

        const id = req.params.id;
        bookData.findOne({_id: id})
        .then(function(book){
            res.render('book',{
                nav,
                title: book.title,
                book
            });
        });
    });

    return booksRouter;

}

module.exports = router;
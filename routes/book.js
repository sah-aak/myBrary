var express= require('express');
var router=express.Router();
const book=require('../models/book');
const author=require('../models/author');

router.get('/', async (req,res,next)=>{
   res.send('all books'); 
   
});

router.get('/new',async (req,res,next)=>{
    try{
    const authors = await author.find({});
    const book=new book();
    res.render('book/new',{
        authors:authors,
        books:books
    });
    }
    catch{
        res.redirect('/books');
    }

});

router.post('/',async (req,res,next)=>{

    const book=new book({
        title:req.body.title,
        author:req.body.author,
        publishDate:new Date(req.body.publishDate),
        pageCount:req.body.pageCount,
        cover:req.body.cover,
        description:req.body.description
    });
    try{
        const newBook=await book.save();
        res.redirect('/books');
    }
    catch{
        res.render('/books/new',{
            book:book,
            errorMessage:'Error during creation !!!'
        });
    }
    
});



module.exports=router;
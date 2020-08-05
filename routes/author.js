var express= require('express');
var router=express.Router();
const author=require('../models/author');


router.get('/', async (req,res,next)=>{
    let searchOptions={};
    if(req.query.name!=null&&req.query.name!='')
    {
        searchOptions.name=new RegExp(req.query.name,'i'); 
    }
    try{
        const authors=await author.find(searchOptions);
        res.render('authors/index',{
            authors:authors,
            searchOptions:req.query
        });
    }catch{
        res.redirect('/');
    }
   
});

router.get('/new',(req,res,next)=>{
    res.render('author/new',{author:new author()});
});

router.post('/',async (req,res,next)=>{
    const author=new author({
        name:req.body.name
    });
    try{
        const newAuthor=await author.save();
        //res.redirect(`/authors/${newAuthor.id}`);
        res.redirect('/authors');
    }catch(error){
        
        res.render('/authors/new',{
            author:author,
            errorMessage:'Error during creation !!!'
        });
    
    }
    
});



module.exports=router;
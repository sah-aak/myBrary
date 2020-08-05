const mongoose=require('mongoose');
var Schema=mongoose.Schema;

var bookSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    publishDate:{
        type:Date,
        required:true
    },
    pageCount:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    },
    coverImageName:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Author'
    }
});

var book=mongoose.model('Book',bookSchema);
module.exports=book;
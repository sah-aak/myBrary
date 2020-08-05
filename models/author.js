const mongoose=require('mongoose');
var Schema=mongoose.Schema;

var authorSchema=new Schema({
    name:{
        type:String,
        required:true
    }
});

var author=mongoose.model('Author',authorSchema);
module.exports=author;
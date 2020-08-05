if(process.env.NODE_ENV != 'production')
{
    require('dotenv').config();  //'dotenv' let us load environment variables in our application.
}

const express=require('express');
const app= express();
const expressLayouts= require('express-ejs-layouts');
const bodyParser=require('body-parser');

app.set('view engine','ejs');
app.set('views',__dirname+'/views');
app.set('layouts','layouts/layout');    //to set a same layout for all pages eg: header & footer
app.use(expressLayouts);
app.use(express.static('public'));  //for static files

const indexRouter=require('./routes/index');
const authorRouter=require('./routes/author');
const bookRouter=require('./routes/book');

const mongoose=require('mongoose');
mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser:true,useUnifiedTopology: true });//useNewUrlParser is needed as mongoose by default an older parser which is now deprecated.
const db=mongoose.connection;
db.on('error',error => console.error(error));
db.once('open',()=>{
    console.log('connected to mongodb');
});


app.use('/',indexRouter);
app.use('/authors',authorRouter);
app.use('/books',bookRouter);



app.listen(process.env.PORT||4001,()=>{
    console.log('server running !');
});
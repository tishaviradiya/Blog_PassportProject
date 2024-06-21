const express=require('express');
// what we offer
const port=8001;
const db=require('./config/mongoose');
const path=require('path');
const passport=require('passport');
const passportLocal=require('./config/passportLocal');
const session=require('express-session');
const cookieParser=require('cookie-parser');
const connectFlash=require('connect-flash');
const customFlash=require('./config/customFlash');
const app=express();
app.use(cookieParser());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname,'assets')));
app.use(express.static(path.join(__dirname,'user_assets')));
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(session({
    name:'AdminPanel',
    secret:'abc',
    resave:true,
    saveUninitialized:true,
    cookie:{
        maxAge:1000*100*60,
    }

}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(connectFlash());
app.use(customFlash.setFlash);
app.use('/',require('./routes'));
app.listen(port,async(err)=>{
    err?console.log(err):console.log(`port is running on server ! ${port}`);
});
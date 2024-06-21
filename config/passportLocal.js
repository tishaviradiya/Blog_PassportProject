const passport=require('passport');
const passportLocal=require('passport-local').Strategy;
const Admin=require('../models/adminModel');
passport.use(new passportLocal({
    usernameField:'email',
},async(email,password,done)=>{
    let checkEmail=await Admin.findOne({email:email});
    if(checkEmail){
       if(checkEmail.password==password){
        return done(null,checkEmail);
       }
       else{
        return done(null,false);
       }
    }
    else{
        return done(null,false);
    }
}));
passport.serializeUser((user,done)=>{
    return done(null,user.id);
});
passport.deserializeUser(async(id,done)=>{
    let findId=await Admin.findById(id);
    if(findId){
        return done(null,findId);
    }
    else{
        return done(null,false);
    }
});
passport.setAuthenticatedUser=(req,res,next)=>{
    if(req.isAuthenticated()){
        res.locals.admin=req.user;
    }
    next();
}
passport.checkAuth=(req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }
    else{
        return res.redirect('/admin/');
    }
}
module.exports=passport;
module.exports.getUserAuth = (req,res,next)=>{
    if(!req.session.isUserLogin){
        return res.redirect('/user/login');
    }
    next();
}
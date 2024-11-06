module.exports.getAdminAuth = (req,res,next)=>{
    if(!req.session.isAdminLogin){
        return res.redirect('/admin/login');
    }
    next();
}
const User = require('../models/user');

module.exports.getAdminLogin = (req,res,next)=>{
    res.render('adminlogin');
}

module.exports.getUserLogin = (req,res,next)=>{
    res.render('userlogin');
}

module.exports.postUserLogin = (req,res,next)=>{
    const reg = req.body.reg;
    const password = req.body.password;

    User.findOne({reg:reg,password:password})
        .then(user=>{
            if(user){
                req.session.isUserLogin = true;
                req.session.user = user;
                return req.session.save((err)=>{
                    return res.redirect('/user/timetable');
                }); 
            }
            else{
                return res.redirect('/user/login');
            }
        })
        .catch(err=>console.log(err));
}

module.exports.postAdminLogin = (req,res,next)=>{
    const username = req.body.username;
    const password = req.body.password;

    if(username.toString() == 'admin' && password.toString()=='admin'){
        req.session.isAdminLogin = true;
        req.session.save((err)=>{
            return res.redirect('/admin/timetable');
        })
    }
    else{
        res.redirect('/admin/login');
    }
}

module.exports.getUserRegister = (req,res,next)=>{
    res.render('userregister');
}

module.exports.postUserRegister = (req,res,next)=>{
    const reg = req.body.reg;
    const password = req.body.password;

    User.findOne({reg:reg})
        .then(res_user=>{
            if(res_user){
                return res.redirect('/user/login');
            }
            
            const user = new User({reg:reg,password:password});

            user.save()
                .then(result=>{
                    res.redirect('/user/login');
                })
                .catch(err=>console.log(err));
        })
        .catch(err=>console.log(err));
}
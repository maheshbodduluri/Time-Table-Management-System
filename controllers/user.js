const Timetable = require('../models/timetable');

module.exports.getTimeTable = (req,res,next)=>{
    Timetable
        .find()
        .then(timetables=>{
            console.log(timetables);
            res.render('usertime',{timetables:timetables});
        })
        .catch(err=>console.log(err));
}

module.exports.postUserLogout  = (req,res,next)=>{
    delete req.session.isUserLogin;
    delete req.session.user;
    res.redirect('/user/login');
}
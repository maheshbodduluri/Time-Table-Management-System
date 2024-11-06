const Timetable = require('../models/timetable');

module.exports.getTimeTable = (req,res,next)=>{

    Timetable
        .find()
        .then(timetables=>{
            console.log(timetables);
            res.render('admintime',{timetables:timetables});
        })
        .catch(err=>console.log(err));
}

module.exports.getAddTimeTable = (req,res,next)=>{
    res.render('addtimetable');
}

module.exports.postAddTimeTable = (req,res,next)=>{
    const sectionName = req.body.sectionName;

    const mon = [], tue = [], wed = [],thurs = [], fri = [], sat = [];
    for(let i=1;i<=7;i++){

        if(i==3 || i==6){
            mon.push('BREAK');
            tue.push('BREAK');
            wed.push('BREAK');
            thurs.push('BREAK');
            fri.push('BREAK');
            sat.push('BREAK');
        }

        mon.push(req.body[`monday_${i}`]);
        tue.push(req.body[`tuesday_${i}`]);
        wed.push(req.body[`wednesday_${i}`]);
        thurs.push(req.body[`thursday_${i}`]);
        fri.push(req.body[`friday_${i}`]);
        sat.push(req.body[`saturday_${i}`]);
    }

    const day = {
        mon: mon,
        tue:tue,
        wed:wed,
        thurs: thurs,
        fri: fri,
        sat: sat
    }

    const faculty = {};
    for(let i=1;i<=6;i++){

        const fac = {
            facultyName : req.body[`subject${i}_faculty`],
            facultyId : req.body[`subject${i}_id`]
        }
        
        faculty[req.body[`subject${i}_name`]] = fac
    }
    
    
    Timetable.findOne({sectionName:sectionName})
    .then(res_table=>{
        if(res_table){
            return res.redirect('/admin/timetable');
        }

        console.log(faculty);
        const table = {
            sectionName: sectionName,
            day: day,
            faculty: faculty
        }
        const timetable = new Timetable(table);
        return timetable.save()
            .then(result=>{
                res.redirect('/admin/timetable');
            });
    })
    .catch(err=>console.log(err));
    
}

module.exports.getEditTimeTable = (req,res,next)=>{
    const timeTableId = req.params.timeTableId;
    console.log(timeTableId);

    Timetable.findOne({_id:timeTableId})
        .then(timetable=>{
            res.render('edittimetable',{timetable:timetable,_id:timeTableId});
        })
        .catch(err=>console.log(err));
}

module.exports.postEditTimeTable = (req,res,next)=>{
    console.log(req.body.timeTableId);
    const timeTableId = req.body.timeTableId;

    const mon = [], tue = [], wed = [],thurs = [], fri = [], sat = [];
    for(let i=1;i<=7;i++){

        if(i==3 || i==6){
            mon.push('BREAK');
            tue.push('BREAK');
            wed.push('BREAK');
            thurs.push('BREAK');
            fri.push('BREAK');
            sat.push('BREAK');
        }

        mon.push(req.body[`mon_${i}`]);
        tue.push(req.body[`tue_${i}`]);
        wed.push(req.body[`wed_${i}`]);
        thurs.push(req.body[`thurs_${i}`]);
        fri.push(req.body[`fri_${i}`]);
        sat.push(req.body[`sat_${i}`]);
    }

    const day = {
        mon: mon,
        tue:tue,
        wed:wed,
        thurs: thurs,
        fri: fri,
        sat: sat
    }
    
    Timetable.findOne({_id:timeTableId})
    .then(res_table=>{
        if(!res_table){
            return res.redirect('/admin/timetable');
        }

        res_table.day = day;
        res_table.save()
            .then(result=>{
                return res.redirect('/admin/timetable');
            })
            .catch(err=>console.log(err));
        
    })
    .catch(err=>console.log(err));
}

module.exports.postDeleteTimeTable = (req,res,next)=>{
    
    const timeTableId = req.body.timeTableId;
    Timetable.findOneAndDelete({_id:timeTableId})
        .then(result=>{
            if(result){
                res.redirect('/admin/timetable');
            }
        })
        .catch(err=>console.log(err));
}

module.exports.postAdminLogout = (req,res,next)=>{
    delete req.session.isAdminLogin;
    res.redirect('/admin/login');
}
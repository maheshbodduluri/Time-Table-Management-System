const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimetableSchema = new Schema({
    sectionName: {
        type: String,
        required: true
    },
    day: {
        type: Object,
        required: true
    },
    // faculty: [
    //     {
    //         subjectName : {type: String,required:true},
    //         facultyName : {type: String,required:true},
    //         facultyId : {type: String,required:true}
    //     }
    // ]
    faculty :{
        type: Object,
        required: true
    }
});

module.exports = mongoose.model('Timetable', TimetableSchema);

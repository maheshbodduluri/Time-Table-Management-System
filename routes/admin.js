const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

const adminAuth = require('../middleware/adminauth');

router.get('/admin/timetable',adminAuth.getAdminAuth,adminController.getTimeTable);

router.get('/admin/add-timetable',adminAuth.getAdminAuth,adminController.getAddTimeTable);

router.post('/admin/add-timetable',adminAuth.getAdminAuth,adminController.postAddTimeTable);

router.get('/admin/edit-timetable/:timeTableId',adminAuth.getAdminAuth,adminController.getEditTimeTable);

router.post('/admin/edit-timetable',adminAuth.getAdminAuth,adminController.postEditTimeTable);

router.post('/admin/delete-timetable',adminAuth.getAdminAuth,adminController.postDeleteTimeTable);

router.post('/admin/logout',adminAuth.getAdminAuth,adminController.postAdminLogout);

module.exports = router;
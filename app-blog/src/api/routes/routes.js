module.exports = app => {
    const router = require('express').Router();
    const postController= require('../controllers/post.controllers');
    const employeeController= require('../controllers/employeeController');
    const attendanceController= require('../controllers/attendanceController');
    const absenceController= require('../controllers/absenceController');
    const leaveController= require('../controllers/leaveController');
    const userController= require('../controllers/userController');

    router.post('/employee', employeeController.createEmployee)
    router.get('/employee', employeeController.findAll);
    router.get('/employee/:id', employeeController.findOne);
    router.delete('/employee/:id', employeeController.delete);
    router.put('/employee/:id', employeeController.update);


    router.post('/attendance', attendanceController.createAttendance)
    router.get('/attendance', attendanceController.findAll);
    router.get('/attendance/:id', attendanceController.findOne);
    router.delete('/attendance/:id', attendanceController.delete);
    router.put('/attendance/:id', attendanceController.update);

    router.post('/absence', absenceController.createAbsence)
    router.get('/absence', absenceController.findAll);
    router.get('/absence/:id', absenceController.findOne);
    router.delete('/absence/:id', absenceController.delete);
    router.put('/absence/:id', absenceController.update);



    router.post('/leave', leaveController.createLeave)
    router.get('/leave', leaveController.findAll);
    router.get('/leave/:id', leaveController.findOne);
    router.delete('/leave/:id', leaveController.delete);
    router.put('/leave/:id', leaveController.update);

    router.post('/login', userController.login);
    router.post('/register', userController.register);



    router.post('/posts', postController.create)
    router.get('/posts', postController.findAll);
    router.get('/posts/:id', postController.findOne);
    router.delete('/posts/:id', postController.delete);
    app.use('/api/',router);
}

const express = require('express');
const auth = require('../middlewares/auth');
const employeeController = require('../controllers/employeeController');
const attendanceController = require('../controllers/attendanceController');
const absenceController = require('../controllers/absenceController');
const leaveController = require('../controllers/leaveController');
const userController = require('../controllers/userController');

module.exports = (app) => {
  const router = express.Router();

  // Routes publiques
  router.post('/login', userController.login);
  router.post('/register', userController.register);

  // Toutes les routes suivantes exigent un jeton valide
  router.use(auth);
  router.get('/me', userController.me);

  router.post('/employee', employeeController.createEmployee);
  router.get('/employee', employeeController.findAll);
  router.get('/employee/:id', employeeController.findOne);
  router.put('/employee/:id', employeeController.update);
  router.delete('/employee/:id', employeeController.delete);

  router.post('/attendance', attendanceController.createAttendance);
  router.get('/attendance', attendanceController.findAll);
  router.get('/attendance/:id', attendanceController.findOne);
  router.put('/attendance/:id', attendanceController.update);
  router.delete('/attendance/:id', attendanceController.delete);

  router.post('/absence', absenceController.createAbsence);
  router.get('/absence', absenceController.findAll);
  router.get('/absence/:id', absenceController.findOne);
  router.put('/absence/:id', absenceController.update);
  router.delete('/absence/:id', absenceController.delete);

  router.post('/leave', leaveController.createLeave);
  router.get('/leave', leaveController.findAll);
  router.get('/leave/:id', leaveController.findOne);
  router.put('/leave/:id', leaveController.update);
  router.delete('/leave/:id', leaveController.delete);

  app.use('/api', router);
};

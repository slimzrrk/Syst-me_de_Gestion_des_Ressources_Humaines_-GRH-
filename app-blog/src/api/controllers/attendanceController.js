const Attendance = require('../models/attendanceModel');
const crudController = require('./crudController');

const crud = crudController(Attendance, {
  fields: ['date', 'heuresTravaillees', 'employe'],
  populate: { path: 'employe', select: 'nom prenom' },
  messages: {
    created: 'Pointage enregistré avec succès.',
    updated: 'Le pointage a été mis à jour avec succès.',
    deleted: 'Pointage supprimé avec succès.',
    notFound: 'Pointage introuvable.',
  },
});

exports.createAttendance = crud.create;
exports.findAll = crud.findAll;
exports.findOne = crud.findOne;
exports.update = crud.update;
exports.delete = crud.delete;

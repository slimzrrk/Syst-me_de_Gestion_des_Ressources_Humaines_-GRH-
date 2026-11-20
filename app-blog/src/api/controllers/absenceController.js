const Absence = require('../models/absenceModel');
const crudController = require('./crudController');

const crud = crudController(Absence, {
  fields: ['date', 'motif', 'heuresManquees', 'employe'],
  populate: { path: 'employe', select: 'nom prenom' },
  messages: {
    created: 'Absence enregistrée avec succès.',
    updated: "L'absence a été mise à jour avec succès.",
    deleted: 'Absence supprimée avec succès.',
    notFound: 'Absence introuvable.',
  },
});

exports.createAbsence = crud.create;
exports.findAll = crud.findAll;
exports.findOne = crud.findOne;
exports.update = crud.update;
exports.delete = crud.delete;

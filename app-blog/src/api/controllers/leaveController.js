const Leave = require('../models/leaveModel');
const crudController = require('./crudController');

const crud = crudController(Leave, {
  fields: ['type', 'dateDebut', 'dateFin', 'statut', 'employe', 'dateDemande'],
  populate: { path: 'employe', select: 'nom prenom' },
  messages: {
    created: 'Demande de congé créée avec succès.',
    updated: 'La demande de congé a été mise à jour avec succès.',
    deleted: 'Demande de congé supprimée avec succès.',
    notFound: 'Demande de congé introuvable.',
  },
});

exports.createLeave = crud.create;
exports.findAll = crud.findAll;
exports.findOne = crud.findOne;
exports.update = crud.update;
exports.delete = crud.delete;

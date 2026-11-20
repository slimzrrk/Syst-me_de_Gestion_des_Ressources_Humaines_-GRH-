const mongoose = require('mongoose');
const Employee = require('../models/employeeModel');
const Leave = require('../models/leaveModel');
const Absence = require('../models/absenceModel');
const Attendance = require('../models/attendanceModel');
const crudController = require('./crudController');
const asyncHandler = require('../middlewares/asyncHandler');

const crud = crudController(Employee, {
  fields: ['nom', 'prenom', 'email', 'poste', 'departement', 'dateEmbauche', 'soldeConges'],
  messages: {
    created: 'Employé créé avec succès.',
    updated: "L'employé a été mis à jour avec succès.",
    deleted: 'Employé supprimé avec succès.',
    notFound: 'Employé introuvable.',
  },
});

exports.createEmployee = crud.create;
exports.findAll = crud.findAll;
exports.findOne = crud.findOne;
exports.update = crud.update;

// Supprimer un employé supprime aussi ses congés, absences et pointages
// (sinon ces enregistrements resteraient orphelins dans les listes).
exports.delete = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Identifiant invalide.' });
  }
  const employee = await Employee.findByIdAndDelete(id);
  if (!employee) {
    return res.status(404).json({ message: 'Employé introuvable.' });
  }
  await Promise.all([
    Leave.deleteMany({ employe: id }),
    Absence.deleteMany({ employe: id }),
    Attendance.deleteMany({ employe: id }),
  ]);
  res.json({ message: 'Employé supprimé avec succès, ainsi que ses congés, absences et pointages.' });
});

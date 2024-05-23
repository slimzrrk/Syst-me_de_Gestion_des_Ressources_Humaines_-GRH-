const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  poste: {
    type: String,
    required: true
  },
  departement: {
    type: String,
    required: true
  },
  dateEmbauche: {
    type: String,
    required: true
  },
  soldeConges: {
    type: Number,
    default: 0
  },
  heuresTravailees: {
    type: Number,
    default: 0
  },
  absences: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Absence'
  }],
  conges: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conge'
  }]
});

module.exports = mongoose.model('Employee', employeeSchema);

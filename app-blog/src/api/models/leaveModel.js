const mongoose = require('mongoose');

const STATUTS = ['En attente', 'Approuvé', 'Rejeté'];

const leaveSchema = new mongoose.Schema({
  type: { type: String, required: [true, 'Le type de congé est obligatoire.'], trim: true },
  dateDebut: { type: Date, required: [true, 'La date de début est obligatoire.'] },
  dateFin: {
    type: Date,
    required: [true, 'La date de fin est obligatoire.'],
    validate: {
      validator(value) { return !this.dateDebut || value >= this.dateDebut; },
      message: 'La date de fin doit être postérieure ou égale à la date de début.',
    },
  },
  statut: {
    type: String,
    enum: { values: STATUTS, message: 'Statut invalide (En attente, Approuvé ou Rejeté).' },
    default: 'En attente',
  },
  employe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: [true, "L'employé est obligatoire."],
    validate: {
      validator: async (id) => Boolean(await mongoose.model('Employee').exists({ _id: id })),
      message: 'Employé introuvable.',
    },
  },
  dateDemande: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Leave', leaveSchema);
module.exports.STATUTS = STATUTS;

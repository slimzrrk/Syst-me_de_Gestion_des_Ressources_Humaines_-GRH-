const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  dateDebut: {
    type: Date,
    required: true
  },
  dateFin: {
    type: Date,
    required: true
  },
  statut: {
    type: String,
    enum: ['En attente', 'Approuvé', 'Rejeté'],
    default: 'En attente'
  },
  employe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  dateDemande: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Leave', leaveSchema);

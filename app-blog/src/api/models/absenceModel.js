const mongoose = require('mongoose');

const absenceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  motif: {
    type: String,
    required: true
  },
  heuresManquees: {
    type: Number,
    required: true
  },
  employe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  }
});

module.exports = mongoose.model('Absence', absenceSchema);

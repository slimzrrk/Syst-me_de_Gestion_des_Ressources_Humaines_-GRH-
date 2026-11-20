const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  date: { type: Date, required: [true, 'La date est obligatoire.'] },
  heuresTravaillees: {
    type: Number,
    required: [true, 'Le nombre d\'heures travaillées est obligatoire.'],
    min: [0, 'Le nombre d\'heures ne peut pas être négatif.'],
    max: [24, 'Le nombre d\'heures ne peut pas dépasser 24.'],
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
});

module.exports = mongoose.model('Attendance', attendanceSchema);

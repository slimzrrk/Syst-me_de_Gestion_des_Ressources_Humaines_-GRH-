const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  heuresTravaillees: {
    type: Number,
    required: true
  },
  employe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  }
});

module.exports = mongoose.model('Attendance', attendanceSchema);
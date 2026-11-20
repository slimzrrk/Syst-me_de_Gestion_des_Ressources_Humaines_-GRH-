const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  nom: { type: String, required: [true, 'Le nom est obligatoire.'], trim: true },
  prenom: { type: String, required: [true, 'Le prénom est obligatoire.'], trim: true },
  email: {
    type: String,
    required: [true, "L'email est obligatoire."],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Adresse email invalide.'],
  },
  poste: { type: String, required: [true, 'Le poste est obligatoire.'], trim: true },
  departement: { type: String, required: [true, 'Le département est obligatoire.'], trim: true },
  dateEmbauche: { type: String, required: [true, "La date d'embauche est obligatoire."] },
  soldeConges: { type: Number, default: 0, min: 0 },
  heuresTravailees: { type: Number, default: 0 },
  absences: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Absence' }],
  conges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Leave' }],
});

module.exports = mongoose.model('Employee', employeeSchema);

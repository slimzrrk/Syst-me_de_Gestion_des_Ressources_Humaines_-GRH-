const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Le nom d'utilisateur est obligatoire."],
    unique: true,
    trim: true,
    minlength: [3, "Le nom d'utilisateur doit contenir au moins 3 caractères."],
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est obligatoire.'],
    minlength: [8, 'Le mot de passe doit contenir au moins 8 caractères.'],
  },
});

// Le mot de passe est haché une seule fois, juste avant l'enregistrement.
userSchema.pre('save', async function hashPassword() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.checkPassword = function checkPassword(password) {
  return bcrypt.compare(password || '', this.password);
};

// Le hash du mot de passe n'est jamais renvoyé au client.
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('User', userSchema);

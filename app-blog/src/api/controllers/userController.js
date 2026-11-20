const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const config = require('../../config/config');
const asyncHandler = require('../middlewares/asyncHandler');

const signToken = (user) => jwt.sign(
  { id: user._id, username: user.username }, // jamais le mot de passe dans le jeton
  config.JWT_SECRET,
  { expiresIn: config.JWT_EXPIRES_IN },
);

exports.register = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (await User.exists({ username })) {
    return res.status(409).json({ message: "Nom d'utilisateur déjà utilisé." });
  }
  const user = await User.create({ username, password }); // haché par le modèle
  res.status(201).json({ message: 'Utilisateur créé avec succès.', data: user });
});

exports.login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: String(username || '') });
  if (!user || !(await user.checkPassword(password))) {
    // Même message dans les deux cas : on ne révèle pas si le compte existe.
    return res.status(401).json({ message: "Nom d'utilisateur ou mot de passe incorrect." });
  }
  res.json({
    message: 'Connexion réussie.',
    token: signToken(user),
    user: { id: user._id, username: user.username },
  });
});

exports.me = (req, res) => res.json({ user: { id: req.user.id, username: req.user.username } });

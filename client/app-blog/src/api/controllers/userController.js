const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
var refreshTokens={}
exports.login = (req, res, next) => {
  User.findOne({
    username: req.body.username,
  }).exec()
    .then(userInfo => {
      console.log('utilisateur', userInfo);
      if (userInfo !== null) {
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
          // Assurez-vous que la clé secrète est correctement configurée dans votre application Express
          const secretKey = req.app.get('secretKey');
          
          // Vérifiez si la clé secrète est définie
          if (!secretKey) {
            throw new Error('La clé secrète n\'est pas définie');
          }

          const token = jwt.sign({
            user: userInfo,
            id: userInfo._id,
          }, secretKey, { expiresIn: '24h' });

          const refreshToken = jwt.sign({
            id: userInfo._id,
          }, secretKey, { expiresIn: '24h' });

          // Stockez le jeton de rafraîchissement si nécessaire
          refreshTokens[refreshToken] = userInfo._id;

          res.status(200).json({
            status: 200,
            message: "Utilisateur trouvé !!!",
            data: {
              utilisateur: userInfo,
              jetonAcces: token,
              refreshToken: refreshToken
            }
          });
        } else {
          res.status(401).json({ status: 401, message: "Mot de passe invalide !!!", data: null });
        }
      } else {
        res.status(401).json({ status: 401, message: "Nom d'utilisateur invalide !!!", data: null });
      }
    })
    .catch(err => next(err));
};

exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Nom d'utilisateur déjà utilisé" });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
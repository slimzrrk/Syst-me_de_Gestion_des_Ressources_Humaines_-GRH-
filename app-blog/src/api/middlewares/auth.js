const jwt = require('jsonwebtoken');
const config = require('../../config/config');

// Vérifie le jeton envoyé dans l'en-tête « Authorization: Bearer <jeton> ».
module.exports = (req, res, next) => {
  const [scheme, token] = (req.headers.authorization || '').split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Authentification requise.' });
  }
  try {
    req.user = jwt.verify(token, config.JWT_SECRET);
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Session expirée ou jeton invalide : veuillez vous reconnecter.' });
  }
};

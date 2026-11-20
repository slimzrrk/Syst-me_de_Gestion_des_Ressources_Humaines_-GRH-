// Transforme les erreurs Mongoose en réponses HTTP claires au lieu d'un crash ou d'une erreur 500.
const LABELS = { email: 'Cet email', username: "Ce nom d'utilisateur" };

module.exports = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (err.name === 'ValidationError') {
    const errors = Object.fromEntries(Object.entries(err.errors).map(([field, e]) => [field, e.message]));
    return res.status(400).json({ message: Object.values(errors).join(' '), errors });
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ message: `Valeur invalide pour le champ « ${err.path} ».` });
  }
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0];
    return res.status(409).json({ message: `${LABELS[field] || `La valeur du champ « ${field} »`} est déjà utilisé${LABELS[field] ? '' : 'e'}.` });
  }
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Corps de requête JSON invalide.' });
  }
  console.error(err);
  return res.status(500).json({ message: 'Erreur interne du serveur.' });
};

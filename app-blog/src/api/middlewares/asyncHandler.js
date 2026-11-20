// Express 4 n'intercepte pas les erreurs des fonctions async :
// ce wrapper les transmet au gestionnaire d'erreurs au lieu de faire planter le serveur.
module.exports = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

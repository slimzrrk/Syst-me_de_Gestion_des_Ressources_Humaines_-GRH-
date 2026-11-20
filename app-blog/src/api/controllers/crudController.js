const mongoose = require('mongoose');
const asyncHandler = require('../middlewares/asyncHandler');

/**
 * Génère les 5 actions CRUD (create, findAll, findOne, update, delete) pour un modèle.
 * - fields   : champs acceptés depuis le corps de la requête (le reste est ignoré)
 * - populate : relation à charger dans la liste (ex. 'employe' -> nom et prénom)
 * - messages : textes renvoyés au client
 */
module.exports = function crudController(Model, { fields, populate, messages }) {
  const pick = (body) => Object.fromEntries(
    fields.filter((f) => body[f] !== undefined).map((f) => [f, body[f]]),
  );

  const validId = (req, res) => {
    if (mongoose.isValidObjectId(req.params.id)) return true;
    res.status(400).json({ message: 'Identifiant invalide.' });
    return false;
  };

  return {
    create: asyncHandler(async (req, res) => {
      const doc = await Model.create(pick(req.body));
      res.status(201).json({ message: messages.created, data: doc });
    }),

    findAll: asyncHandler(async (req, res) => {
      let query = Model.find().sort({ _id: -1 }); // les plus récents d'abord
      if (populate) query = query.populate(populate);
      res.json(await query);
    }),

    findOne: asyncHandler(async (req, res) => {
      if (!validId(req, res)) return;
      const doc = await Model.findById(req.params.id);
      if (!doc) return res.status(404).json({ message: messages.notFound });
      res.json(doc);
    }),

    update: asyncHandler(async (req, res) => {
      if (!validId(req, res)) return;
      const doc = await Model.findById(req.params.id);
      if (!doc) return res.status(404).json({ message: messages.notFound });
      doc.set(pick(req.body));
      await doc.save(); // save() exécute tous les validateurs du schéma
      res.json({ message: messages.updated, data: doc });
    }),

    delete: asyncHandler(async (req, res) => {
      if (!validId(req, res)) return;
      const doc = await Model.findByIdAndDelete(req.params.id);
      if (!doc) return res.status(404).json({ message: messages.notFound });
      res.json({ message: messages.deleted });
    }),
  };
};

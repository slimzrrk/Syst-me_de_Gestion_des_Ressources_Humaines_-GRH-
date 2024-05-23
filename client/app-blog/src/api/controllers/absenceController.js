const { absence } = require('../../database/db.config');
const Absence = require('../models/absenceModel');



exports.createAbsence =  (req, res) => {
  
    const { date, motif, heuresManquees, employe } = req.body;
    const newAbsence = new Absence({
      date: date,
      motif: motif,
      heuresManquees: heuresManquees,
      employe: employe
  });
  newAbsence.save(newAbsence).then((data) =>{
      res.status(200).send({
          message: 'successufully created absence'
      })
  });
  
  };
  exports.findAll = (req, res) => {
    Absence.find({
    }).then((data) => {
    res.send(data);
    }).catch((err) => {
        console.log(err);
    });
};
exports.findOne = (req, res) => {
    const id = req.params.id;
    if(!id) {
     res.status(400).send({ message: "content is required "});
    }
    Absence.findById(id).then((data) => {
        res.send(data); 
    }).catch((err) => {
        console.log(err);
    });
};
//suppression par id 
exports.delete = (req, res) => {
   const id = req.params.id;
   if(!id) {
    res.status(400).send({ message: "content is required "});
   }
   Absence.findByIdAndDelete(id).then((data) => {
    if(!data){
        res.status(404).send({ message: "Post not found "});  
    }
    res.status(200).send({ message: "Post was successfull deleted "});
   })
};


exports.update = (req, res) => {
    const id = req.params.id;
    const { date, motif, heuresManquees, employe } = req.body;

    // Vérifier si l'identifiant est fourni
    if (!id) {
        return res.status(400).send({ message: "L'identifiant est requis." });
    }

    // Mettre à jour l'employé en utilisant findByIdAndUpdate
    Absence.findByIdAndUpdate(id, {
      date,
      motif,
      heuresManquees,
      employe
    }, { new: true }) // Utiliser {new: true} pour renvoyer le document mis à jour
    .then(updatedAbsence => {
        if (!updatedAbsence) {
            return res.status(404).send({ message: "L'absence n'a pas été trouvé." });
        }
        res.status(200).send({ message: "L'attendance a été mis à jour avec succès.", updatedAbsence });
    })
    .catch(err => {
        console.error("Erreur lors de la mise à jour de l'absence:", err);
        res.status(500).send({ message: "Une erreur s'est produite lors de la mise à jour de l'absence." });
    });
};

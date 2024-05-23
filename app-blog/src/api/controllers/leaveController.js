const { leave } = require('../../database/db.config');
const Leave = require('../models/leaveModel');



exports.createLeave =  (req, res) => {
  
    const { type, dateDebut, dateFin, statut, employe, dateDemande } = req.body;
    const newLeave = new Leave({
      type: type,
      dateDebut: dateDebut,
      dateFin: dateFin,
      statut: statut,
      employe: employe,
      dateDemande: dateDemande
  });
  newLeave.save(newLeave).then((data) =>{
      res.status(200).send({
          message: 'successufully created attendance'
      })
  });
  
  };
  exports.findAll = (req, res) => {
    Leave.find({
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
    Leave.findById(id).then((data) => {
        res.send(data); 
    }).catch((err) => {
        console.log(err);
    });
};
exports.delete = (req, res) => {
   const id = req.params.id;
   if(!id) {
    res.status(400).send({ message: "content is required "});
   }
   Leave.findByIdAndDelete(id).then((data) => {
    if(!data){
        res.status(404).send({ message: "Post not found "});  
    }
    res.status(200).send({ message: "Post was successfull deleted "});
   })
};


exports.update = (req, res) => {
    const id = req.params.id;
    const { type, dateDebut, dateFin, statut, employe, dateDemande } = req.body;    
    if (!id) {
        return res.status(400).send({ message: "L'identifiant est requis." });
    }
    Leave.findByIdAndUpdate(id, {
        type,
        dateDebut,
        dateFin,
        statut,
        employe,
        dateDemande
    }, { new: true }) 
    .then(updatedLeave => {
        if (!updatedLeave) {
            return res.status(404).send({ message: "L'attendance n'a pas été trouvé." });
        }
        res.status(200).send({ message: "leave a été mis à jour avec succès.", updatedLeave });
    })
    .catch(err => {
        console.error("Erreur lors de la mise à jour de leave:", err);
        res.status(500).send({ message: "Une erreur s'est produite lors de la mise à jour de leave." });
    });
};

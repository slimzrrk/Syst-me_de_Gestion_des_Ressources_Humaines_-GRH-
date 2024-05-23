const { attendance } = require('../../database/db.config');
const Attendance = require('../models/attendanceModel');



exports.createAttendance =  (req, res) => {
  
    const { date, heuresTravaillees, employe } = req.body;
    const newAttendance = new Attendance({
      date: date,
      heuresTravaillees: heuresTravaillees,
      employe: employe
  });
  newAttendance.save(newAttendance).then((data) =>{
      res.status(200).send({
          message: 'successufully created attendance'
      })
  });
  
  };
  exports.findAll = (req, res) => {
    Attendance.find({
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
    Attendance.findById(id).then((data) => {
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
   Attendance.findByIdAndDelete(id).then((data) => {
    if(!data){
        res.status(404).send({ message: "Post not found "});  
    }
    res.status(200).send({ message: "Post was successfull deleted "});
   })
};


exports.update = (req, res) => {
    const id = req.params.id;
    const { date, heuresTravaillees, employe } = req.body;

    // Vérifier si l'identifiant est fourni
    if (!id) {
        return res.status(400).send({ message: "L'identifiant est requis." });
    }

    // Mettre à jour l'employé en utilisant findByIdAndUpdate
    Attendance.findByIdAndUpdate(id, {
      date,
      heuresTravaillees,
      employe
    }, { new: true }) // Utiliser {new: true} pour renvoyer le document mis à jour
    .then(updatedAttendance => {
        if (!updatedAttendance) {
            return res.status(404).send({ message: "L'attendance n'a pas été trouvé." });
        }
        res.status(200).send({ message: "L'attendance a été mis à jour avec succès.", updatedAttendance });
    })
    .catch(err => {
        console.error("Erreur lors de la mise à jour de l'attendance:", err);
        res.status(500).send({ message: "Une erreur s'est produite lors de la mise à jour de l'attendance." });
    });
};

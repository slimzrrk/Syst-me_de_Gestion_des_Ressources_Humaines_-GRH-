const { employee } = require('../../database/db.config');
const Employee = require('../models/employeeModel');



exports.createEmployee = (req, res) => {
    const { nom, prenom, email, poste, departement, dateEmbauche } = req.body;
    const newEmployee = new Employee({
        nom: nom,
        prenom: prenom,
        email: email,
        poste: poste,
        departement: departement,
        dateEmbauche: dateEmbauche
    });
    newEmployee.save().then((data) => {
        res.status(200).send({
            message: 'Employé créé avec succès',
            redirectTo: '/employees' // Redirection vers la liste des employés
        });
    }).catch(err => {
        console.error("Erreur lors de la création de l'employé:", err);
        res.status(500).send({ message: "Une erreur s'est produite lors de la création de l'employé." });
    });
};
exports.findAll = (req, res) => {
    Employee.find({
    }).then((data) => {
        res.send(data);
    }).catch((err) => {
        console.log(err);
    });
};
exports.findOne = (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).send({ message: "content is required " });
    }
    Employee.findById(id).then((data) => {
        res.send(data);
    }).catch((err) => {
        console.log(err);
    });
};
//suppression par id 
exports.delete = (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).send({ message: "content is required " });
    }
    Employee.findByIdAndDelete(id).then((data) => {
        if (!data) {
            res.status(404).send({ message: "Post not found " });
        }
        res.status(200).send({ message: "Post was successfull deleted " });
    })
};


exports.update = (req, res) => {
    const id = req.params.id;
    const { nom, prenom, email, poste, departement, dateEmbauche } = req.body;

    // Vérifier si l'identifiant est fourni
    if (!id) {
        return res.status(400).send({ message: "L'identifiant est requis." });
    }

    // Mettre à jour l'employé en utilisant findByIdAndUpdate
    Employee.findByIdAndUpdate(id, {
        nom,
        prenom,
        email,
        poste,
        departement,
        dateEmbauche
    }, { new: true }) // Utiliser {new: true} pour renvoyer le document mis à jour
        .then(updatedEmployee => {
            if (!updatedEmployee) {
                return res.status(404).send({ message: "L'employé n'a pas été trouvé." });
            }
            res.status(200).send({ message: "L'employé a été mis à jour avec succès.", updatedEmployee });
        })
        .catch(err => {
            console.error("Erreur lors de la mise à jour de l'employé:", err);
            res.status(500).send({ message: "Une erreur s'est produite lors de la mise à jour de l'employé." });
        });
};

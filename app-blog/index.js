const express = require('express');
const cors = require('cors');
const config = require('./src/config/config');
const database = require('./src/database/db.config');
const errorHandler = require('./src/api/middlewares/errorHandler');

const app = express();
app.use(cors({ origin: config.CLIENT_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.json({ message: 'API GRH opérationnelle.' }));
require('./src/api/routes/routes')(app);
app.use((req, res) => res.status(404).json({ message: 'Route introuvable.' }));
app.use(errorHandler);

if (require.main === module) {
  database.connect()
    .then(() => {
      console.log('Connecté à MongoDB');
      app.listen(config.PORT, () => console.log(`API GRH en écoute sur http://localhost:${config.PORT}`));
    })
    .catch((err) => {
      console.error('Connexion à MongoDB impossible :', err.message);
      process.exit(1);
    });
}

module.exports = app;

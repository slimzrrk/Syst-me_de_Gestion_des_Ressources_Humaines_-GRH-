require('dotenv').config();

const config = {
  PORT: process.env.PORT || 3001,
  DB_URL: process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/grh',
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '8h',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
};

if (!config.JWT_SECRET) {
  throw new Error('JWT_SECRET manquant : copiez .env.example en .env et définissez une clé secrète.');
}
if (config.JWT_SECRET === 'your_secret_key' || config.JWT_SECRET === 'changez_moi') {
  console.warn('⚠️  JWT_SECRET utilise la valeur d\'exemple : changez-la avant toute mise en ligne.');
}

module.exports = config;

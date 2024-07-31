// app.js
const express = require('express');
const app = express();
const path = require('path');

// Configurer EJS comme moteur de vue
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir les fichiers statiques (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware pour vérifier les heures de requête
const workingHoursMiddleware = (req, res, next) => {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send('L\'application web est disponible uniquement pendant les heures ouvrables (du lundi au vendredi, de 9h à 17h).');
  }
};

// Utiliser le middleware pour toutes les routes
app.use(workingHoursMiddleware);

// Définir les itinéraires
app.get('/', (req, res) => {
  res.render('index', { page: 'Accueil' });
});

app.get('/services', (req, res) => {
  res.render('services', { page: 'Nos services' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { page: 'Contactez-nous' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Requiring in dependencies
const express = require('express');
const path = require('path');
const dbFile = require('./db/db.json')

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Getting the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

// Getting the notes file
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/api/notes', (req, res) => {
  res.json(dbFile);
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

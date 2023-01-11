const express = require('express');
const path = require('path');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET request for reviews
app.get('/api/reviews', (req, res) => {
  res.status(200).json(reviews);
  res.json(`${req.method} request received to get note`);

});

// POST request to add a note
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a new note`);

  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object to be saved
    const newNote = {
      title,
      text,
    };

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in creating new');
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
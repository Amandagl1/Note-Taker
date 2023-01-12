const express = require('express');
const path = require('path');
const uuid = require('./helpers/uuid');
const notes = require('./db/notes');


const PORT =3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET request for reviews
app.get('/api/notes', (req, res) => {
  res.status(200).json(notes);
  res.json(`${req.method} request received to get note`);

});

// POST request to add a note
app.post('/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a new note`);

  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object to be saved
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    const response = {
      status: 'success',
      body: newNote,
    };

    // Convert the data to a string to save the note
    const noteString = JSON.stringify(newNote);

    // Writing the string to a file
    fs.writeFile(`./db/${newNote.title}.json`, noteString, (err) =>
      err
        ? console.error(err)
        : console.log(
            `Review for ${newNote.title} has been written to JSON file`
          )
    );

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in creating note');
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

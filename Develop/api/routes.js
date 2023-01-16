const uuid = require('../helpers/uuid');
const fs = require('fs');
const router = require('express').Router();

// GET request for notes
router.get('/api/notes', (req, res) => {
  // res.json(`${req.method} request received to get note`);
  let notes = fs.readFileSync('db/db.json', "utf8");
  res.status(200).json(JSON.parse(notes));


});

// router.get('/api/notes/:id', (req, res) => {
//   let notes = fs.readFileSync('db/db.json', "utf8");

//   const allNotes = JSON.parse(notes);
//   const note = allNotes.find((n) => n.id === req.params.id);
//   res.status(200).json(note);

// });
  
// POST request to add a note
router.post('/api/notes', (req, res) => {
// Log that a POST request was received
  console.info(`${req.method} request received to add a new note`);
  
  const { title, text } = req.body;
  console.log(title, text);
  // If all the required properties are present
  if (title && text) {
  // Variable for the object to be saved
   const newNote = {
      title,
      text,
      id: uuid(),
    };
  
   const response = {
      status: 'success',
    };

    // Read file from db.json
    let notes = fs.readFileSync('db/db.json', "utf8");
    const parsedData = JSON.parse(notes);
    
    let noteArray = [...parsedData, newNote]
    console.log(noteArray);

    // Writing the string to a file
    fs.writeFile(`db/db.json`, JSON.stringify(noteArray), (err) =>
      err
        ? console.error(err)
        : console.log(
          `Note for ${newNote.title} has been written to JSON file`
          )
    );
  
    console.log(response);
    res.status(201).json(response);
    } else {
    res.status(500).json('Error in creating note');
    }


  });

  router.delete('/api/notes/:id', (req, res) => {
    try {
    let notes = fs.readFileSync('db/db.json', "utf8");
    const parsedData = JSON.parse(notes);
    var newArray = parsedData.filter(note => note.id !== req.params.id)
    console.log(newArray);

    fs.writeFile(`db/db.json`, JSON.stringify(newArray), (err) =>
      err
        ? console.error(err)
        : console.log(
          `Note for ${req.params.id} has been deleted from the JSON file`
          )
    );

    const response = {
      status: 'success',
    };

    res.json(response)
  } catch(err) {
    console.log(err);
    res.status(500).json(err);
  }

  }); 

  module.exports = router;

const uuid = require('./helpers/uuid');
const db = require('./db/db');
const fs = require('fs');


fs.readFileSync('db/db.json','utf8', (error, notes) => {

  if (error) throw err;

  var data = JSON.parse(notes);

}).then((notes) => {
  return res.json((notes));

}).catch((err) => {
  res.status(500).json(err);

});
// GET request for notes
app.get('/api/notes', (req, res) => {
  res.status(200).json(notes);
  res.json(`${req.method} request received to get note`);

  let notes = fs.readFileSync(db, "utf8");

  res.json(JSON.parse(notes));

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
      note_id: uuid(),
    };
  
   const response = {
      status: 'success',
      body: newNote,
    };

    // Read file from db.json
    let notes = fs.readFileSync(db, "utf8");

    const parsedData = JSON.parse(notes);
    
    parsedData.push(newNote);


    // Convert the data to a string to save the note
    const noteString = JSON.stringify(newNote);
  
    // Writing the string to a file
    fs.writeFile(`./db/${newNote.title}.json`, noteString, (err) =>
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


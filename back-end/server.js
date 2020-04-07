const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/museum', {
  useNewUrlParser: true
});

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});
// Create a scheme for rituals in the museum: a title and a path to an image.
const ritualSchema = new mongoose.Schema({
  title: String,
  description: String,
  blessings: String,
  frequency: String,
  path: String,
});

const resourceSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: String,
});

// Create a model for rituals in the museum.
const Ritual = mongoose.model('Ritual', ritualSchema);

const Resource = mongoose.model('Resource', resourceSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

// Create a new ritual in the museum:
app.post('/api/rituals', async (req, res) => {
  const ritual = new Ritual({
    title: req.body.title,
    description: req.body.description,
    blessings: req.body.blessings,
    frequency: req.body.frequency,
    path: req.body.path,
  });
  try {
    await ritual.save();
    res.send(ritual);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the rituals in the museum.
app.get('/api/rituals', async (req, res) => {
  try {
    let rituals = await Ritual.find();
    res.send(rituals);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/rituals/:id', async (req, res) => {
  try {
    await Ritual.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/rituals/:id', async (req, res) => {
  try {
    let ritual = await Ritual.updateOne({
      _id: req.params.id
    },
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        blessings: req.body.blessings,
        frequency: req.body.frequency
      }
    });
    res.send(ritual);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//RESOURCE ROUTES

app.post('/api/resources', async (req, res) => {
  const resource = new Resource({
    title: req.body.title,
    description: req.body.description,
    link: req.body.link,
  });
  try {
    await resource.save();
    res.send(resource);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/resources', async (req, res) => {
  try {
    let resources = await Resource.find();
    res.send(resources);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/resources/:id', async (req, res) => {
  try {
    await Resource.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/resources/:id', async (req, res) => {
  try {
    let resource = await Resource.updateOne({
      _id: req.params.id
    },
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        link: req.body.link
      }
    });
    res.send(resource);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(3002, () => console.log('Server listening on port 3002!'));

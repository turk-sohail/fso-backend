require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./services/db");
const Note = require("./models/Notes");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/v1/notes", async (req, res, next) => {
  try {
    const notes = await Note.find({});
    return res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
});

app.post("/api/v1/notes", async (req, res, next) => {
  try {
    const noteObject = {
      content: req.body.content,
      important: req.body.important || false,
    };
    const note = new Note(noteObject);
    await note.save();
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/v1/notes/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await Note.findByIdAndRemove(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.put("/api/v1/notes/:id", async (req, res, next) => {
  const updatedNote = {
    content: req.body.content,
    important: req.body.important,
  };
  try {
    const { id } = req.params;
    const note = await Note.findByIdAndUpdate(id, updatedNote, {
      new: true,
      runValidators: true,
    });
    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
});

/***********error-handler*************/

app.use(notFound);

/***********error-handler*************/
app.use(errorHandler);

const port = process.env.PORT || 3001;

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI);
    console.log("database connected successfully");
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();

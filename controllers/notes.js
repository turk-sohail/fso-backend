const Note = require('../models/Note');

const getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({});
    return res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

const addNote = async (req, res, next) => {
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
};

const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await Note.findByIdAndRemove(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const updateNote = async (req, res, next) => {
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
};

module.exports = {
  getAllNotes,
  addNote,
  deleteNote,
  updateNote,
};

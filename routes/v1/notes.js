const { NotesController } = require("../../controllers");

const router = require('express').Router();

router.route('/').get(NotesController.getAllNotes).post(NotesController.addNote);
router.route('/:id').delete(NotesController.deleteNote).put(NotesController.updateNote);

module.exports = router;

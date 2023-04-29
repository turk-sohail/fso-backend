const {
  getAllNotes,
  addNote,
  updateNote,
  deleteNote,
} = require('../controllers/notes');

const router = require('express').Router();

router.route('/').get(getAllNotes).post(addNote);
router.route('/:id').delete(deleteNote).put(updateNote);

module.exports = router;

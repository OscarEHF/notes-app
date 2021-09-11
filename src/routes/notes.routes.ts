import { Router } from 'express';

import {
  getNotes,
  addNote,
  newNote,
  edit,
  editNote
} from '../controllers/notes.controllers';

const router: Router = Router();

// Get All Notes
router.get( '/', getNotes);

// New Note
router.get( '/add', addNote);
router.post('/new-note', newNote);

// Edit Note
router.get( '/edit/:id', edit);
router.put( '/edit-note/:id', editNote);

export default router;
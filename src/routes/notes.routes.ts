import { Router } from 'express';

import { isAuthenticated } from '../helpers';

import {
  getNotes,
  addNote,
  newNote,
  edit,
  editNote,
  deleteNote
} from '../controllers/notes.controllers';

const router: Router = Router();

// Get All Notes
router.get('/', isAuthenticated, getNotes);

// New Note
router.get('/add', isAuthenticated, addNote);
router.post('/new-note', isAuthenticated, newNote);

// Edit Note
router.get('/edit/:id', isAuthenticated, edit);
router.put('/edit-note/:id', isAuthenticated, editNote);

// Delete Note
router.delete('/delete/:id', isAuthenticated, deleteNote);


export default router;
import { Router } from 'express';
const router: Router = Router();

import {
  getNotes,
  addNote,
  newNote
} from '../controllers/notes.controllers';

//     /notes/
router.get( '/', getNotes);
router.get( '/add', addNote);
router.post('/new-note', newNote);

export default router;
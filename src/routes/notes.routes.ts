import { Router } from 'express';
const router: Router = Router();

import {
  getNotes,
  addNote
} from '../controllers/notes.controllers';

router.get('/', getNotes);
router.get('/add', addNote);

export default router;
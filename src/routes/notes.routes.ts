import { Router } from 'express';
const router: Router = Router();

import {
  getNotes
} from '../controllers/notes.controllers';

router.get('/', getNotes);

export default router;
import { Router } from 'express';
const router: Router = Router();

import {
  renderIndex,
  renderAbout
} from '../controllers/index.controllers';

router.get('/', renderIndex);
router.get('/about', renderAbout);

export default router;
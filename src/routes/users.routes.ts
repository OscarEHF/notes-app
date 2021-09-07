import { Router } from 'express';
const router: Router = Router();

import {
  signIn,
  signUp,
  signOut
} from '../controllers/users.controllers';

router.get('/signin', signIn);
router.get('/signup', signUp);
router.get('/signout', signOut);

export default router;
import { Router } from 'express';
const router: Router = Router();

import {
  signIn,
  signUp,
  signUpForm,
  signOut
} from '../controllers/users.controllers';

// Sign in
router.get('/signin', signIn);

// Sign up
router.get('/signup', signUp);
router.post('/signup', signUpForm);

router.get('/signout', signOut);

export default router;
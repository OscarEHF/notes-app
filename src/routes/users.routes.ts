import { Router } from 'express';
import passport from 'passport';

const router: Router = Router();

import {
  signUp,
  signUpForm,
  signIn,
  signInForm,
  signOut
} from '../controllers/users.controllers';

// Sign in
router.get('/signin', signIn);
router.post('/signin', signInForm);

// Sign up
router.get('/signup', signUp);
router.post('/signup', signUpForm);

router.get('/signout', signOut);

export default router;
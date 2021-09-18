import { Request, RequestHandler, Response } from 'express';
import passport from 'passport';
import User, { IUser } from '../models/User';

export const signIn: RequestHandler = (
  req: Request,
  res: Response
): void => {
  res.render('users/signin');
};

export const signUp: RequestHandler = (
  req: Request,
  res: Response
): void => {
  res.render('users/signup');
}

export const signUpForm: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {

  const { name, email, password, confirm_password } = req.body;
  const errors = [];
  
  if(!name) {
    errors.push({ text: 'Please insert your name'});
  }
  
  if(!email) {
    errors.push({ text: 'Please insert your email'});
  }
  
  if(!password) {
    errors.push({ text: 'Please insert your password'});
  }
  
  if(!confirm_password) {
    errors.push({ text: 'Please confirm your password'});
  } else if(password && password.length < 4) {
    errors.push({ text: 'Password must be at least 4 characters'});
  }
  
  if(password && confirm_password && password!==confirm_password) {
    errors.push({ text: 'Password do not match'});
  }
  
  if(errors.length>0){
    res.render('users/signup', {
      errors,
      name,
      email,
      password,
      confirm_password
    });
  } else {
    const emailUser = await User.findOne({ email });
    if(emailUser){
      req.flash('error_msg', 'The email is already in use');
      res.redirect('/users/signup');
    } else {
      const newUser = new User({ name, email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash('success_msg', 'You are registered');
      res.redirect('/users/signin');
    }
  }
  
};

export const signInForm = passport.authenticate("local", {
  successRedirect: "/notes",
  failureRedirect: "/users/signin",
  failureFlash: true,
});

export const signOut: RequestHandler = (
  req: Request,
  res: Response
): void => {
  req.logout();
  res.redirect('/');
};
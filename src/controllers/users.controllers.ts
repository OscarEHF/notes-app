import { Request, RequestHandler, Response } from 'express';

export const signIn: RequestHandler = (
  req: Request,
  res: Response
): void => {
  res.render('users/signin');
}

export const signUp: RequestHandler = (
  req: Request,
  res: Response
): void => {
  res.render('users/signup');
}

export const signOut: RequestHandler = (
  req: Request,
  res: Response
): void => {
  res.send('Signing out');
}
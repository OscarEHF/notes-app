import { Request, RequestHandler, Response } from 'express';

export const signIn: RequestHandler = (
  req: Request,
  res: Response
): void => {
  res.send('Signing in');
}

export const signUp: RequestHandler = (
  req: Request,
  res: Response
): void => {
  res.send('Signing up');
}

export const signOut: RequestHandler = (
  req: Request,
  res: Response
): void => {
  res.send('Signing out');
}
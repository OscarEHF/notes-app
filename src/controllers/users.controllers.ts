import { Request, RequestHandler, Response } from 'express';

export const signIn: RequestHandler = (
  req: Request,
  res: Response
): void => {
  res.header({
    'Content-Type': 'text/html',
  });
  res.send('Signing in');
}

export const signUp: RequestHandler = (
  req: Request,
  res: Response
): void => {
  res.header({
    'Content-Type': 'text/html',
  });
  res.send('Signing up');
}

export const signOut: RequestHandler = (
  req: Request,
  res: Response
): void => {
  res.header({
    'Content-Type': 'text/html',
  });
  res.send('Signing out');
}
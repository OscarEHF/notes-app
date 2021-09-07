import { Request, RequestHandler, Response } from 'express';

export const getNotes: RequestHandler = (
  req: Request,
  res: Response
): void => {
  res.header({
    'Content-Type': 'text/html',
  });
  res.send('Notes from database');
}
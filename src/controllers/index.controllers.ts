import { Request, RequestHandler, Response } from 'express';

export const renderIndex: RequestHandler = (
  req: Request,
  res: Response
): void => {
  res.header({
    'Content-Type': 'text/html',
  });
  res.send('Index');
}

export const renderAbout: RequestHandler = (
  req: Request,
  res: Response
): void => {
  res.header({
    'Content-Type': 'text/html'
  });
  res.send('About');
};
import { Request, RequestHandler, Response } from 'express';

export const renderIndex: RequestHandler = (
  req: Request,
  res: Response
): void => {
  res.render('index');
}

export const renderAbout: RequestHandler = (
  req: Request,
  res: Response
): void => {
  res.render('about');
};
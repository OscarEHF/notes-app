import { Request, Response, NextFunction, RequestHandler } from 'express';
import moment from 'moment';

export const timeago = (timestamps: string): string => {
  return moment(timestamps).startOf('minutes').fromNow();
};

export const isAuthenticated: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if(req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Not authorized');
  res.redirect('/users/signin');
};
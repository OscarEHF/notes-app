import { Request, RequestHandler, Response } from 'express';
import Note from '../models/Note';

import { timeago } from '../helpers';

interface INote {
  title: string,
  description: string,
  createdAt: string,
  updatedAt: string
}

export const getNotes: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const notes: Array<INote> = await Note.find().sort({ date: 'desc'}).lean();
  notes.forEach((note: INote) => {
    const { createdAt } = note;
    note.createdAt = timeago(createdAt);
  });
  res.render('notes/all-notes', { notes });
};

export const addNote: RequestHandler = (
  req: Request,
  res: Response
): void => {
  res.render('notes/new-note');
};

export const newNote: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {

  const { title, description }: INote = req.body;
  const errors = [];

  if(!title) {
    errors.push({ text: 'Please write a Title'});
  }

  if(!description) {
    errors.push({ text: 'Please write a Description'});
  }

  if(errors.length>0) {
    res.render('notes/new-note', {
      errors,
      title,
      description
    });
  } else {
    const newNote = new Note({ title, description });
    await newNote.save();
    res.redirect('/notes');
  }

};
import { Request, RequestHandler, Response } from 'express';
import Note from '../models/Note';

import { timeago } from '../helpers';

interface INote {
  title: string,
  description: string,
  createdAt: string,
  updatedAt: string,
  timeago: string,
  _id: string
}

export const getNotes: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const notes: Array<INote> = await Note.find().sort({ date: 'desc'}).lean();
  notes.forEach((note: INote) => {
    const { createdAt, updatedAt } = note;
    if(createdAt.valueOf() === updatedAt.valueOf()){
      note.timeago = timeago(createdAt);
    } else {
      note.timeago = `Updated ${timeago(updatedAt)}`;
    }
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

export const edit: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {

  const note: INote = await Note.findById(req.params.id).lean();
  res.render('notes/edit-note', { note });

};

export const editNote: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {

  const { title, description }: INote = req.body;
  const { id } = req.params;

  const errors = [];

  const note: INote = await Note.findById(req.params.id).lean();

  if(!title) {
    errors.push({ text: 'Please write a Title'});
  } else {
    note.title = title;// New title
  }

  if(!description) {
    errors.push({ text: 'Please write a Description'});
  } else {
    note.description = description;// New description
  }

  if(errors.length>0) {
    res.render('notes/edit-note', {
      errors,
      note
    });
  } else {
    await Note.findByIdAndUpdate(id, { title, description });
    res.redirect('/notes');
  }

};

export const deleteNote: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  await Note.findByIdAndDelete(req.params.id);
  res.redirect('/notes');
};
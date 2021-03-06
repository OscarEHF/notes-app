import { Request, RequestHandler, Response } from 'express';
import Note from '../models/Note';
import mongoose,{ ObjectId } from 'mongoose';

import { timeago } from '../helpers';

export const getNotes: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = (req.user as ObjectId) ?? new mongoose.Types.ObjectId('');
  const notes = await Note.find({ user: id }).sort({ date: 'desc'}).lean();
  notes.forEach((note) => {
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

  const { title, description } = req.body;
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
    let newNote = new Note({ title, description });
    newNote.user = (req.user as ObjectId) ?? new mongoose.Types.ObjectId('');
    await newNote.save();
    req.flash('success_msg', 'Note added successfully!');
    res.redirect('/notes');
  }

};

export const edit: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {

  const note = await Note.findById(req.params.id).lean();
  res.render('notes/edit-note', { note });

};

export const editNote: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {

  const { title, description } = req.body;
  const { id } = req.params;

  const errors = [];

  let note = await Note.findById(req.params.id).lean();

  if(!title) {
    errors.push({ text: 'Please write a Title'});
  } else {
    note!.title ??= title;// New title
  }

  if(!description) {
    errors.push({ text: 'Please write a Description'});
  } else {
    note!.description ??= description;// New description
  }

  if(errors.length>0) {
    res.render('notes/edit-note', {
      errors,
      note
    });
  } else {
    await Note.findByIdAndUpdate(id, { title, description });
    req.flash('success_msg', 'Note updated successfully!');
    res.redirect('/notes');
  }

};

export const deleteNote: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Note deleted successfully!');
  res.redirect('/notes');
};
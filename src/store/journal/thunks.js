import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} from "./journalSlice";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());
    // obtiene el user ID
    const { uid } = getState().auth;
    const newNote = {
      body: "",
      title: "",
      date: new Date().getTime(),
    };

    try {
      // apunta al documento de la base de datos de firebase
      const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
      // setea la nueva nota
      const setDocResp = await setDoc(newDoc, newNote);
      newNote.id = newDoc.id;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }

    // dispatch
    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    // Elimino el id de la nota para que no se guarde en la db, sino va a guardar la nota con otro id diferente
    const noteToFireStore = { ...note };
    delete noteToFireStore.id;

    try {
      const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
      await setDoc(docRef, noteToFireStore, { merge: true });
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }

    dispatch(updateNote(note));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());

    // Sube todas las imagenes a la vez
    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const photosUrls = await Promise.all(fileUploadPromises);
    dispatch(setPhotosToActiveNote(photosUrls));
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    try {
      const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
      deleteDoc(docRef);

    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }

    dispatch(deleteNoteById(note.id));
  };
};

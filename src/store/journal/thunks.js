import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, setActiveNote, savingNewNote, updateNote } from "./journalSlice";

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
    }

    dispatch(updateNote(note));
  };
};

import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    // obtiene el user ID
    const { uid } = getState().auth;

    const newNote = {
      body: "",
      title: "",
      date: new Date().getTime(),
    };

    // apunta al documento de la base de datos de firebase
    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));

    // setea la nueva nota
    const setDocResp = await setDoc(newDoc, newNote);

    console.log(newDoc, setDocResp);

    // dispatch
    // dispathch (newNote)
    // dispacht (activarNote)
  };
};

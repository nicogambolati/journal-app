import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../../src/firebase/config";

import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
} from "../../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../../src/store/journal/thunks";

describe("test in journal thunks", () => {
  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("startNewNote should create a new note", async () => {
    const uid = "TEST-UID";
    getState.mockReturnValue({ auth: { uid: uid } });

    await startNewNote()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(savingNewNote());
    expect(dispatch).toHaveBeenCalledWith(
      addNewEmptyNote({
        body: "",
        title: "",
        date: expect.any(Number),
        id: expect.any(String),
        imageUrls: [],
      })
    );
    expect(dispatch).toHaveBeenCalledWith(
      setActiveNote({
        body: "",
        title: "",
        date: expect.any(Number),
        id: expect.any(String),
        imageUrls: [],
      })
    );

    // Borrar de Firebase la nota nueva
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);
    const deletePromises = [];

    docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref)));
    await Promise.all(deletePromises);
  }, 30000); // Timeout de 30 seg para que no de error
});

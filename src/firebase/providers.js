import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult(result);

    const user = result.user;
    const { displayName, email, photoURL, uid } = user;

    return {
      ok: true,
      // credentials,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);

    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};

export const registerUserWithEmailPassword = async ({
  email,
  password,
  displayName
}) => {
  try {
    console.log(email, password, displayName);
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL } = resp.user;
    console.log(resp, "registerUserWithEmailPassword - try");


    // TODO: Actualizar el displayName en Firebase
    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName
    }

  } catch (error) {
    console.log(error, "registerUserWithEmailPassword - catch");
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};

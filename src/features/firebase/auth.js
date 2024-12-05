import firebase from './config';

// Sign up user
export const signUp = async (email, password) => {
  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Sign in user
export const signIn = async (email, password) => {
  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Sign out user
export const signOut = async () => {
  try {
    await firebase.auth().signOut();
  } catch (error) {
    throw new Error(error.message);
  }
};

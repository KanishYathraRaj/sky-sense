import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

// Sign Up
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user; // user object returned after successful signup
  } catch (error) {
    console.error("Error during sign up: ", error.message);
    throw error;
  }
};

// Sign Up and Create Profile
export const signUpAndCreateProfile = async (email, password, name) => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create user profile in Firestore
   await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    name: name,
    email: user.email,
    createdAt: new Date(),
});


    return user; // Return the user object after successful signup and profile creation
  } catch (error) {
    console.error('Error signing up and creating profile: ', error.message);
    throw error;
  }
};

// Log In
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Login success: ", userCredential);
    return userCredential.user; // user object returned after successful login
  } catch (error) {
    console.error("Error during login: ", error.message);
    throw error;
  }
};

// Log Out
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("Logout success");
    return true; 
  } catch (error) {
    console.error("Error during logout: ", error.message);
    throw error;
  }
};

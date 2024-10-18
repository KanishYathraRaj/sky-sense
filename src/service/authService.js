import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

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

// Log In
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.error("Login success: ", userCredential);
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
    return true; 
  } catch (error) {
    console.error("Error during logout: ", error.message);
    throw error;
  }
};

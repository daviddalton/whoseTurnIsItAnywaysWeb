import { FirebaseError } from '@firebase/util';
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signOut as signOutOfFirebase,
} from 'firebase/auth';
import { app } from './app';

const auth = getAuth(app);

export const createNewAccount = async (
    email: string,
    password: string,
    displayName: string,
) => {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateCurrentUser(displayName);
    await sendVerification();
};

export const updateCurrentUser = async (displayName: string) => {
    if (auth.currentUser != null) {
        await updateProfile(auth.currentUser, { displayName });
    } else {
        throw new FirebaseError('UNF', 'User not found.');
    }
};

export const sendVerification = async () => {
    if (auth.currentUser != null) {
        await sendEmailVerification(auth.currentUser);
    } else {
        throw new FirebaseError('UNF', 'User not found.');
    }
};

export const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
    console.log('Successfully logged in.');
};

export const signOut = async () => {
    await signOutOfFirebase(auth);
};
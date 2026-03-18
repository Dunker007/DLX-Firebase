'use client';
import {
  Auth, // Import Auth type for type hinting
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider
  // Assume getAuth and app are initialized elsewhere
} from 'firebase/auth';

/** Initiate anonymous sign-in. */
export async function initiateAnonymousSignIn(authInstance: Auth): Promise<void> {
  await signInAnonymously(authInstance);
}

/** Initiate email/password sign-up. */
export async function initiateEmailSignUp(authInstance: Auth, email: string, password: string): Promise<void> {
  await createUserWithEmailAndPassword(authInstance, email, password);
}

/** Initiate email/password sign-in. */
export async function initiateEmailSignIn(authInstance: Auth, email: string, password: string): Promise<void> {
  await signInWithEmailAndPassword(authInstance, email, password);
}

/** Initiate Google Sign-in via redirect instead of popup to bypass popup blockers. */
export async function initiateGoogleSignIn(authInstance: Auth): Promise<void> {
  const provider = new GoogleAuthProvider();
  // Using signInWithRedirect is much safer than popup for strict browsers/ad-blockers
  await signInWithRedirect(authInstance, provider);
}

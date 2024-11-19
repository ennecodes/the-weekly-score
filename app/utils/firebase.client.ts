import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  type Auth,
} from "firebase/auth";

let auth: Auth | null = null;

const firebaseConfig = {
  apiKey: "AIzaSyAhqcfPGtjVgPLe6Li9meTyEMLjThXucJw",
  authDomain: "the-weekly-score-b729c.firebaseapp.com",
  projectId: "the-weekly-score-b729c",
};

// Initialize Firebase for client-side
function getClientAuth() {
  if (typeof window === "undefined") return null;

  if (!auth) {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
  }

  return auth;
}

export async function signIn(email: string, password: string) {
  const auth = getClientAuth();
  if (!auth) throw new Error("Auth not initialized");

  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  return userCredential.user.getIdToken();
}

export async function signUp(email: string, password: string) {
  const auth = getClientAuth();
  if (!auth) throw new Error("Auth not initialized");

  await createUserWithEmailAndPassword(auth, email, password);

  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const idToken = await userCredential.user.getIdToken();

  return idToken;
}

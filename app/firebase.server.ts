import admin from "firebase-admin";
import { applicationDefault } from "firebase-admin/app";

if (!admin.apps.length) {
  admin.initializeApp({ credential: applicationDefault() });
}

// Move auth definition here to ensure app initialization is complete
const auth = admin.auth();

async function getSessionToken(idToken: string) {
  const decodedToken = await auth.verifyIdToken(idToken);
  if (new Date().getTime() / 1000 - decodedToken.auth_time > 5 * 60) {
    throw new Error("Recent sign-in required");
  }
  const twoWeeks = 60 * 60 * 24 * 14 * 1000;
  return auth.createSessionCookie(idToken, { expiresIn: twoWeeks });
}

export { auth, getSessionToken };

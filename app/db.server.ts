import admin from "firebase-admin";

const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
  clientId: process.env.FIREBASE_CLIENT_ID,
  client_x509_cert_uri: process.env.FIREBASE_CLIENT_X509_cert_uri,
};

if (!admin.apps.length) {
  admin.initializeApp(firebaseConfig);
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

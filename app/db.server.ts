import admin from 'firebase-admin';

const firebaseConfig = {
  apiKey: "AIzaSyAhqcfPGtjVgPLe6Li9meTyEMLjThXucJw",
  authDomain: "the-weekly-score-b729c.firebaseapp.com",
  projectId: "the-weekly-score-b729c",
  storageBucket: "the-weekly-score-b729c.firebasestorage.app",
  messagingSenderId: "902234154686",
  appId: "1:902234154686:web:5f20448e5ad9623c0ae0ef",
  measurementId: "G-D9VDX01FV0"
};


console.log('Initializing Firebase Admin SDK...');

if (!admin.apps.length){
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

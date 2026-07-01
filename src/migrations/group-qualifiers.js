import { initializeApp } from "firebase/app";
import { getFirestore, doc, writeBatch } from "firebase/firestore";
import { GROUP_QUALIFIERS } from "../constants/group-stage-migration.js";

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function updateGroupQualifiers() {
  const batch = writeBatch(db);

  Object.entries(GROUP_QUALIFIERS).forEach(([groupId, qualifiers]) => {
    const ref = doc(db, "groups", groupId);
    batch.set(ref, { qualifiers });
  });

  await batch.commit();
  console.log("Group qualifiers updated.");
  process.exit(0);
}

updateGroupQualifiers().catch((err) => {
  console.error(err);
  process.exit(1);
});

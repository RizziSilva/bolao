import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { knockoutMatches } from "../constants/knockout-migration.js";

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

// TODO silva.william 23/06/26: Lidar com a autenticação quando executa a migration.
async function seedKnockoutMatches() {
  console.log("Seeding knockout matches...");

  await Promise.all(
    knockoutMatches.map(({ id, ...data }) =>
      setDoc(doc(db, "matches", id), {
        ...data,
        homeScore: null,
        awayScore: null,
        finished: false,
      }),
    ),
  );

  console.log(`${knockoutMatches.length} matches seeded successfully.`);
  process.exit(0);
}

seedKnockoutMatches().catch((err) => {
  console.error(err);
  process.exit(1);
});

import { EIGHT_FINALS_UPDATE } from "../constants/eight_finals_migration.js";
import { FIRST_ROUND_FINAL_UPDATE } from "../constants/knockout-migration.js";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

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

async function updateRound32() {
  console.log("Updating Round of 32 matches...");

  await Promise.all(
    FIRST_ROUND_FINAL_UPDATE.map(
      ({
        id,
        homeTeam,
        awayTeam,
        penaltyWinner,
        finished,
        homeScore,
        awayScore,
      }) =>
        updateDoc(doc(db, "matches", id), {
          homeTeam,
          awayTeam,
          penaltyWinner,
          finished,
          homeScore,
          awayScore,
        }),
    ),
  );

  console.log(
    `${FIRST_ROUND_FINAL_UPDATE.length} matches updated successfully.`,
  );
  process.exit(0);
}

updateRound32().catch((err) => {
  console.error(err);
  process.exit(1);
});

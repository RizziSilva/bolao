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

const round32Updates = [
  {
    id: "r32_1",
    homeTeam: 3,
    awayTeam: 5,
    homeScore: 0,
    awayScore: 1,
    penaltyWinner: null,
    finished: true,
  },
  {
    id: "r32_2",
    homeTeam: 9,
    awayTeam: 22,
    homeScore: 2,
    awayScore: 1,
    penaltyWinner: null,
    finished: true,
  },
  {
    id: "r32_3",
    homeTeam: 17,
    awayTeam: 15,
    homeScore: 1,
    awayScore: 1,
    penaltyWinner: 15,
    finished: true,
  },
  {
    id: "r32_4",
    homeTeam: 21,
    awayTeam: 10,
    homeScore: 1,
    awayScore: 1,
    penaltyWinner: 10,
    finished: true,
  },
  {
    id: "r32_5",
    homeTeam: 19,
    awayTeam: 35,
    homeScore: 1,
    awayScore: 2,
    penaltyWinner: null,
    finished: true,
  },
  {
    id: "r32_6",
    homeTeam: 33,
    awayTeam: 24,
    homeScore: 3,
    awayScore: 0,
    penaltyWinner: null,
    finished: true,
  },
  {
    id: "r32_7",
    homeTeam: 1,
    awayTeam: 18,
    homeScore: 2,
    awayScore: 0,
    penaltyWinner: null,
    finished: true,
  },
  {
    id: "r32_8",
    homeTeam: 45,
    awayTeam: 44,
    homeScore: 2,
    awayScore: 1,
    penaltyWinner: null,
    finished: true,
  },
  {
    id: "r32_9",
    homeTeam: 25,
    awayTeam: 34,
    homeScore: 3,
    awayScore: 2,
    penaltyWinner: null,
    finished: true,
  },
  {
    id: "r32_10",
    homeTeam: 13,
    awayTeam: 8,
    homeScore: 2,
    awayScore: 0,
    penaltyWinner: null,
    finished: true,
  },
  {
    id: "r32_11",
    homeTeam: 29,
    awayTeam: 38,
    homeScore: null,
    awayScore: null,
    penaltyWinner: null,
    finished: false,
  },
  {
    id: "r32_12",
    homeTeam: 41,
    awayTeam: 46,
    homeScore: null,
    awayScore: null,
    penaltyWinner: null,
    finished: false,
  },
  {
    id: "r32_13",
    homeTeam: 6,
    awayTeam: 39,
    homeScore: null,
    awayScore: null,
    penaltyWinner: null,
    finished: false,
  },
  {
    id: "r32_14",
    homeTeam: 14,
    awayTeam: 27,
    homeScore: null,
    awayScore: null,
    penaltyWinner: null,
    finished: false,
  },
  {
    id: "r32_15",
    homeTeam: 37,
    awayTeam: 32,
    homeScore: null,
    awayScore: null,
    penaltyWinner: null,
    finished: false,
  },
  {
    id: "r32_16",
    homeTeam: 42,
    awayTeam: 48,
    homeScore: null,
    awayScore: null,
    penaltyWinner: null,
    finished: false,
  },
];

async function updateRound32() {
  console.log("Updating Round of 32 matches...");

  await Promise.all(
    round32Updates.map(
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

  console.log(`${round32Updates.length} matches updated successfully.`);
  process.exit(0);
}

updateRound32().catch((err) => {
  console.error(err);
  process.exit(1);
});

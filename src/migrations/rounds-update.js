import { getFirestore } from "firebase-admin/firestore";
import { initializeApp, cert } from "firebase-admin/app";
import { createRequire } from "module";
import { FINALS_MIGRATION } from "../constants/finals_migration.js";

const require = createRequire(import.meta.url);
const serviceAccount = require("./service-account.json");
const app = initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore(app);

async function matchesUpdate() {
  console.log("Updating matches...");

  await Promise.all(
    FINALS_MIGRATION.map(
      ({
        id,
        homeTeam,
        awayTeam,
        penaltyWinner,
        finished,
        homeScore,
        awayScore,
      }) =>
        db.collection("matches").doc(id).update({
          homeTeam,
          awayTeam,
          penaltyWinner,
          finished,
          homeScore,
          awayScore,
        }),
    ),
  );

  console.log(`${FINALS_MIGRATION.length} matches updated successfully.`);
  process.exit(0);
}

matchesUpdate().catch((err) => {
  console.error(err);
  process.exit(1);
});

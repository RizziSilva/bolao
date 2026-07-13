import { getFirestore } from "firebase-admin/firestore";
import { initializeApp, cert } from "firebase-admin/app";
import { createRequire } from "module";
import { SEMI_FINALS_TEAMS_UPDATE } from "../constants/semi-finals-migration.js";

const require = createRequire(import.meta.url);
const serviceAccount = require("./service-account.json");
const app = initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore(app);

async function matchesUpdate() {
  console.log("Updating matches...");

  await Promise.all(
    SEMI_FINALS_TEAMS_UPDATE.map(
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

  console.log(
    `${SEMI_FINALS_TEAMS_UPDATE.length} matches updated successfully.`,
  );
  process.exit(0);
}

matchesUpdate().catch((err) => {
  console.error(err);
  process.exit(1);
});

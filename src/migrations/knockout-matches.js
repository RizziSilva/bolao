import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { createRequire } from "module";
import { knockoutMatches } from "../constants/knockout-migration.js";

const require = createRequire(import.meta.url);
const serviceAccount = require("./service-account.json");
const app = initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore(app);

async function seedKnockoutMatches() {
  console.log("Seeding knockout matches...");

  await Promise.all(
    knockoutMatches.map(({ id, ...data }) =>
      db
        .collection("matches")
        .doc(id)
        .update({
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

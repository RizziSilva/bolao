import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { createRequire } from "module";
import { GROUP_QUALIFIERS } from "../constants/group-stage-migration.js";

const require = createRequire(import.meta.url);
const serviceAccount = require("./service-account.json");
const app = initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore(app);

async function updateGroupQualifiers() {
  const batch = db.batch();

  Object.entries(GROUP_QUALIFIERS).forEach(([groupId, qualifiers]) => {
    const ref = db.collection("groups").doc(groupId);
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

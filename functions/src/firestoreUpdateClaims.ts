import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { updateUserClaims, UserClaim } from "./updateUserClaims";

const fs = admin.firestore();

export const firestoreUpdateClaims = functions.firestore.document("webmaster/permissions").onWrite(async (snapshot, context) => {
  if (!snapshot || !snapshot.after) return Promise.reject("No snapshot data");
  const after = snapshot.after.data();
  if (!after) return Promise.reject("No snapshot data");

  const userClaims: UserClaim[] = after.userClaims;

  if (!userClaims) return Promise.reject("No userClaims found in document");

  let dirty = false;
  // 1st loop to assign missing uids - preventing infinite loops
  for (const claim of userClaims) {
    if (!claim.uid) {
      // try to lookup by email
      const existingUser = await admin.auth().getUserByEmail(claim.email);
      if (existingUser) {
        claim.uid = existingUser.uid;
        dirty = true;
      } else {
        console.log(claim.email + ": User Not found");
      }
    }
  }

  if (dirty) {
    // Write back to database, but let the second invokation of this function set the permissions
    console.log("Updating uids");
    return snapshot.after.ref.set(after);
  } else {
    // clean list, Set permissions
    for (const claim of userClaims) {
      if (claim.uid) {
        const existingUser = await admin.auth().getUser(claim.uid);
        if (existingUser) {
          console.log("Existing Claims: " + JSON.stringify(existingUser.customClaims));
          updateUserClaims(existingUser, claim);
        }
      }
    }
    console.log("Finished updating claims");
  }
  return Promise.resolve();
});

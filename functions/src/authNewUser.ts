import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { UserClaim, updateUserClaims } from './updateUserClaims';

const fs = admin.firestore();

export const authNewUser = functions.auth.user().onCreate(async (user, context) => {
  // check if this user has extra permissions and set them.
  console.log("New User: " + user.uid);
  const id = user.uid;
  const email = user.email;

  if (!id || id.length !== 28) { return Promise.reject("Invalid or missing uid parameter"); }

  // Check if they're an admin
  const snapshot = await fs.doc('/webmaster/permissions').get();
  const permissions = snapshot.data();
  if (!permissions) {
    return Promise.reject("Unable to get permissions from database");
  }

  const userClaims: UserClaim[] = permissions.userClaims;

  const userClaim = userClaims.find(claim => claim.email === email);

  if (userClaim) {
    return updateUserClaims(user, userClaim);
  }
});

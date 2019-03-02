import * as admin from 'firebase-admin';

const fs = admin.firestore();

interface Claim {
  uid: string;

  CityOps: boolean;
  Comms: boolean;
  Editor: boolean;
  Showrunner: boolean;
  Webmaster: boolean;

  GCCity: string;
}

export async function setUserPerms(id: string): Promise<void> {

  if (!id || id.length !== 28) { return Promise.reject("Invalid or missing uid prarameter"); }

  // check if this user has extra permissions and set them.
  const snapshot = await fs.doc('/webmaster/permissions').get();
  const permissions = snapshot.data();
  if (!permissions) {
    return Promise.reject("Unable to get permissions from database");
  }

  const userClaims: Claim[] = permissions.userClaims;

  const userClaim = userClaims.find(claim => claim.uid === id);

  if (!userClaim) {
    return Promise.reject("User not foud in permissions");
  }
  const { uid, ...claims } = userClaim;

  const existingUser = await admin.auth().getUser(uid);

  console.log("Existing Claims: " + (JSON.stringify(existingUser.customClaims)));

  if (claims) {
    console.log("Setting claims for " + uid);
    console.log(JSON.stringify(claims));
    return admin.auth().setCustomUserClaims(uid, claims);
  } else {
    console.log("No claims for newly created user " + id);
  }
  return Promise.reject("No claims for newly created user");
}


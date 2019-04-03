import { UserRecord } from "firebase-functions/lib/providers/auth";
import * as admin from 'firebase-admin';

export interface UserClaim {
  uid: string;
  email: string;

  CityOps: boolean;
  Comms: boolean;
  Editor: boolean;
  Showrunner: boolean;
  Webmaster: boolean;

  GCCity: string;
}

export async function updateUserClaims(user: UserRecord, claim: UserClaim) {
  const { uid, email, ...claims } = claim;
  if (claims) {
    console.log("Setting claims for " + uid);
    console.log(JSON.stringify(claims));
    return admin.auth().setCustomUserClaims(uid, claims);
  } else {
    console.log("No claims for user " + uid);
  }
}

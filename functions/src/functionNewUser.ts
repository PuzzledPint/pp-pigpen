import * as functions from 'firebase-functions';
import { setUserPerms } from './setUserPerms';

export const functionNewUser = functions.auth.user().onCreate(async (user, context) => {
  // check if this user has extra permissions and set them.
  console.log("New User: " + user.uid);

  return setUserPerms(user.uid);
});



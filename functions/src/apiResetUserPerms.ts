import * as functions from 'firebase-functions';
import { setUserPerms } from './setUserPerms'

export const apiResetUserPerms = functions.https.onRequest((request, response) => {
  const uid: string = request.query.uid;

  return setUserPerms(uid).then(s => response.send("Success")).catch(e => response.send("Error: " + e));
});



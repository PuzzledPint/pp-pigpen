import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

const fs = admin.firestore();

export const apiTravisDeploy = functions.https.onRequest((request, response) => {
  // See https://docs.travis-ci.com/user/notifications/#configuring-webhook-notifications for request body (POST)
  if (request && request.body && request.body.payload) {

    const build = request.body.payload.number;
    const commit = request.body.payload.commit;

    if (!build || !commit) {
      console.log("payload str = " + JSON.stringify(request.body.payload));
      console.log("payload = " + request.body.payload);
      return response.sendStatus(500);
    }
    return fs.doc('/settings/travis').set({ build, commit }).then(a => response.sendStatus(200)).catch(a => response.sendStatus(500));
  } else {
    return response.sendStatus(500);
  }
});



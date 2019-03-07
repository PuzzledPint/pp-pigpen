import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

const fs = admin.firestore();

export const apiTravisDeploy = functions.https.onRequest((request, response) => {
  // See https://docs.travis-ci.com/user/notifications/#configuring-webhook-notifications for request body (POST)

  return fs.doc('/settings/build').set(functions.config().travis.build).then(a => response.sendStatus(200)).catch(a => response.sendStatus(500));
});



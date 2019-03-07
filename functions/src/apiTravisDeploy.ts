import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

const fs = admin.firestore();

export const apiTravisDeploy = functions.https.onRequest((request, response) => {
  // See https://docs.travis-ci.com/user/notifications/#configuring-webhook-notifications for request body (POST)
  const build = request.query.build ? request.query.build : -1;
  const commit = request.query.commit ? request.query.commit : 'XXXXXX';

  return fs.doc('/settings/travis').set({build, commit}).then(a => response.sendStatus(200)).catch(a => response.sendStatus(500));
});



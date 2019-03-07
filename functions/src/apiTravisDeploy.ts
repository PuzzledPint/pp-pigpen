import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

const fs = admin.firestore();

export const apiTravisDeploy = functions.https.onRequest((request, response) => {
  // See https://docs.travis-ci.com/user/notifications/#configuring-webhook-notifications for request body (POST)
  if (request && request.body && request.body.payload) {
    const payload = request.body.payload;

    const build = payload.number;
    const commit = payload.commit;

    if (build) {
      console.log("build: " + build);
    } else {
      return response.status(500).send("No valid build number found");
    }

    if (commit) {
      console.log("commit: " + commit);
    } else {
      return response.status(500).send("No valid commit hash found");
    }

    return fs
      .doc("/settings/travis")
      .set({ build, commit })
      .then(a => response.sendStatus(200))
      .catch(err => response.status(500).send("Failed to write DB: "+err));
  } else {
    return response.status(500).send("No valid payload found");
  }
});

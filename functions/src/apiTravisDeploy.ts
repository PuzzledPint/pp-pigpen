import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

const fs = admin.firestore();

export const apiTravisDeploy = functions.https.onRequest((request, response) => {
  // See https://docs.travis-ci.com/user/notifications/#configuring-webhook-notifications for request body (POST)
  console.log("apiTravisDeploy");

  if (!request) return response.status(500).send("No valid request found");
  if (!request.body) return response.status(500).send("No valid body found");
  if (!request.body.payload) return response.status(500).send("No valid payload found");

  const payload = request.body.payload;

  if (!payload.number) return response.status(500).send("No valid build number found");

  const build = payload.number;
  console.log("build: " + build);

  if (!payload.commit) return response.status(500).send("No valid commit hash found");

  const commit = payload.commit;
  console.log("build: " + build);

  console.log("Setting...");

  return fs
    .doc("/settings/travis")
    .set({ build, commit })
    .then(a => response.sendStatus(200))
    .catch(err => response.status(500).send("Failed to write DB: " + err));
});



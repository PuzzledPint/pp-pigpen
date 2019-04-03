import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as crypto from "crypto";

const fs = admin.firestore();

// Captured 4/2/2019 - Will need to be refreshed if revoked.
// tslint:disable-next-line
const travisPublicKey =
`-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvtjdLkS+FP+0fPC09j25
y/PiuYDDivIT86COVedvlElk99BBYTrqNaJybxjXbIZ1Q6xFNhOY+iTcBr4E1zJu
tizF3Xi0V9tOuP/M8Wn4Y/1lCWbQKlWrNQuqNBmhovF4K3mDCYswVbpgTmp+JQYu
Bm9QMdieZMNry5s6aiMA9aSjDlNyedvSENYo18F+NYg1J0C0JiPYTxheCb4optr1
5xNzFKhAkuGs4XTOA5C7Q06GCKtDNf44s/CVE30KODUxBi0MCKaxiXw/yy55zxX2
/YdGphIyQiA5iO1986ZmZCLLW8udz9uhW5jUr3Jlp9LbmphAC61bVSf4ou2YsJaN
0QIDAQAB
-----END PUBLIC KEY-----`;

export const httpsTravisDeploy = functions.https.onRequest((request, response) => {
  // See https://docs.travis-ci.com/user/notifications/#configuring-webhook-notifications for request body (POST)

  if (!request) return response.status(500).send("No valid request found");
  console.log("request valid");

  const travisSignature = request.headers.signature as string;
  if (!travisSignature) return response.status(500).send("No authorization signature header found.");
  console.log("Travis Signature found");

  const body = request.body;
  if (!body) return response.status(500).send("No valid body found");
  console.log("body JS  = " + JSON.stringify(body));

  const payload = JSON.parse(body.payload);
  console.log("payload JS = " + payload);
  if (!payload) return response.status(500).send("No valid payload found");

  let verifier = crypto.createVerify('sha1');
  verifier = verifier.update(body.payload);
  const status = verifier.verify(travisPublicKey, travisSignature, 'base64');
  if (!status) {
    console.log("status = " + status);
    return response.status(500).send("Signature verification failed.");
  }

  if (payload.status) {
    console.log("Build ended in error, ignoring: " + payload.status);
    return response.status(200).send("Ignoring failed build");
  }

  if (!payload.number || (payload.number.length > 4) ) return response.status(500).send("No valid build number found");
  const build = payload.number;
  console.log("build: " + build);

  if (!payload.commit || (payload.commit.length > 40)) return response.status(500).send("No valid commit hash found");
  const commit = payload.commit;
  console.log("commit: " + commit);

  console.log("Setting...");

  return fs
    .doc("/settings/travis")
    .set({ build, commit })
    .then(a => {
      console.log("Sucessful");
      return response.sendStatus(200);
    })
    .catch(
      err => {
        console.log("DB write failed");
        return response.status(500).send("Failed to write DB: " + err);
      }
    );
});



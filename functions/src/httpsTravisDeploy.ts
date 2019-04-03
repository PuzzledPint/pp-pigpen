import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as crypto from "crypto";

const fs = admin.firestore();

// Captured 4/2/2019 - Will need to be refreshed if revoked.
// tslint:disable-next-line
const travisPublicKey = "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvtjdLkS+FP+0fPC09j25\ny/PiuYDDivIT86COVedvlElk99BBYTrqNaJybxjXbIZ1Q6xFNhOY+iTcBr4E1zJu\ntizF3Xi0V9tOuP/M8Wn4Y/1lCWbQKlWrNQuqNBmhovF4K3mDCYswVbpgTmp+JQYu\nBm9QMdieZMNry5s6aiMA9aSjDlNyedvSENYo18F+NYg1J0C0JiPYTxheCb4optr1\n5xNzFKhAkuGs4XTOA5C7Q06GCKtDNf44s/CVE30KODUxBi0MCKaxiXw/yy55zxX2\n/YdGphIyQiA5iO1986ZmZCLLW8udz9uhW5jUr3Jlp9LbmphAC61bVSf4ou2YsJaN\n0QIDAQAB\n-----END PUBLIC KEY-----";

export const httpsTravisDeploy = functions.https.onRequest((request, response) => {
  // See https://docs.travis-ci.com/user/notifications/#configuring-webhook-notifications for request body (POST)
  console.log("apiTravisDeploy");

  if (!request) return response.status(500).send("No valid request found");
  console.log("request valid");
  console.log(request.headers);

  const travisSignature = request.headers.Signature;
  if (!travisSignature) return response.status(500).send("No authorization signature header found.");
  console.log("travisSignature = " + travisSignature);

  const travisSignatureBuffer = Buffer.from(travisSignature.length ? travisSignature[0] : travisSignature as string, 'base64');
  console.log("travisSignatureBuffer = " + travisSignatureBuffer);

  const body = request.body;
  if (!body) return response.status(500).send("No valid body found");
  console.log("body valid  = "+JSON.stringify(body));

  const verifier = crypto.createVerify('sha1');
  verifier.update(body.payload);
  const status = verifier.verify(travisPublicKey, travisSignatureBuffer);
  if (!status) {
    return response.status(500).send("Signature verification failed.");
  }

  const payload = JSON.parse(body.payload);
  if (!payload) return response.status(500).send("No valid payload found");
  console.log("payload valid  = "+JSON.stringify(payload));

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



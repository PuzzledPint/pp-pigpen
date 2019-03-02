import * as functions from 'firebase-functions';

export const apiFeedbackSaved = functions.https.onRequest((request, response) => {
  return response.send("Hello from Firebase!");
});



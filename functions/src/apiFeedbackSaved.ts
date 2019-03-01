import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const apiFeedbackSaved = functions.https.onRequest((request, response) => {
  return response.send("Hello from Firebase!");
});



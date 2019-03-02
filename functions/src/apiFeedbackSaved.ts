import * as functions from "firebase-functions";

export const apiFeedbackSaved = functions.firestore
  .document("users/{userId}/playtestFeedback/{puzzleId}")
  .onWrite((snapshot, context) => {
    const after = snapshot.after.data();
  });

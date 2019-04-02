import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';

const fs = admin.firestore();

export const firestoreFeedbackSaved = functions.firestore
  .document("users/{userId}/playtestFeedback/{puzzleId}")
  .onWrite((snapshot, context) => {
    if (!snapshot || !snapshot.after) return Promise.reject("No snapshot data");
    const after = snapshot.after.data();
    if (!after) return Promise.reject("No snapshot data");

    const userId = context.params.userId;
    const puzzleId = context.params.puzzleId;

    // write feedback to puzzles collection
    const doc = fs.doc(`puzzles/${puzzleId}/playtestFeedback/${userId}`);
    if (!doc) return Promise.reject("Unable to create reference to puzzle feedback doc");

    const { puzzleRef, ...feedback } = after;

    const lastChanged = admin.firestore.Timestamp.now();
    const editStatus = "Unreviewed";

    return doc.set({ lastChanged, editStatus, ...feedback }, { merge: true });
  });

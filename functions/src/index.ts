import * as admin from 'firebase-admin';

admin.initializeApp();

export { authNewUser } from './authNewUser';

export { firestoreFeedbackSaved } from './firestoreFeedbackSaved';
export { firestoreUpdateClaims } from './firestoreUpdateClaims';

export { httpsTravisDeploy } from './httpsTravisDeploy';

export { storageImageToWebp } from './storageImageToWebp';

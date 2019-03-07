import * as admin from 'firebase-admin';

admin.initializeApp();

export { apiFeedbackSaved } from './apiFeedbackSaved';
export { apiResetUserPerms } from './apiResetUserPerms';
export { apiTravisDeploy } from './apiTravisDeploy';

export { functionNewUser } from './functionNewUser';

import * as admin from 'firebase-admin';

admin.initializeApp();

export { apiResetUserPerms } from './apiResetUserPerms';
export { apiFeedbackSaved } from './apiFeedbackSaved';
export { apiSetBuildNumber } from './apiSetBuildNumber';

export { functionNewUser } from './functionNewUser';

export interface FSUserClaimsEntry {
  uid: string;
  email: string;

  Editor: boolean;
  CityOps: boolean;
  Comms: boolean;
  Webmaster: boolean;
  Showrunner: boolean;
}

export interface FSAdminPermissions {
  userClaims: FSUserClaimsEntry[];
}

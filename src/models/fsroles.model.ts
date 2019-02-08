export interface HQTeams {
  Editor: boolean;
  CityOps: boolean;
  Comms: boolean;
  Webmaster: boolean;
  Showrunner: boolean;
}

export interface FSRoles {
  hqTeams: HQTeams;
  gcCity: string;
}

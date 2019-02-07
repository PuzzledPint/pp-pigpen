
export interface HQTeams {
  Editor: boolean;
  CityOps: boolean;
  Comms: boolean;
  Webmaster: boolean;
  Showrunner: boolean;
}

export type AnyRole = keyof HQTeams;

export class FSRoles {

  hqTeams: HQTeams = { Editor: false, CityOps: false, Comms: false, Webmaster: false, Showrunner: false};

  gcCity = '';

  get allHQTeams(): Array<string> {
    return Object.keys(this.hqTeams);
  }

  get isGC(): boolean { return this.gcCity.length > 0; }

  get isEditor(): boolean { return this.hqTeams.Editor; }
  get isCityOps(): boolean { return this.hqTeams.CityOps; }
  get isComms(): boolean { return this.hqTeams.Comms; }
  get isWebmaster(): boolean { return this.hqTeams.Webmaster; }
  get isShowrunner(): boolean { return this.hqTeams.Showrunner; }

  get GCCity(): string {
    return this.gcCity;
  }

  static none(): FSRoles {
    return new FSRoles();
  }

  has(role: AnyRole): boolean {
    return this.hqTeams[role];
  }
}

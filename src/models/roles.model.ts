import { Dictionary } from "lodash";

export class Roles {
  hqTeams: Dictionary<boolean> = {
    'Editor': false,
    'City Ops': false,
    'Comms': false,
    'Webmaster': false,
    'Showrunner': false,
  };

  gcCity = '';

  get allHQTeams() : Array<string> {
    return Object.keys(this.hqTeams);
  }

  get isGC(): boolean { return this.gcCity.length > 0; }

  get isEditor(): boolean { return this.hqTeams.Editor; }
  get isCityOps(): boolean { return this.hqTeams["City Ops"]; }
  get isComms(): boolean { return this.hqTeams.Comms; }
  get isWebmaster(): boolean { return this.hqTeams.Webmaster; }
  get isShowrunner(): boolean{ return this.hqTeams.Showrunner; }

  get GCCity(): string {
    return this.gcCity;
  }

  static none(): Roles {
    return new Roles();
  }

  has(role: string): boolean {
    return (role === 'GC') ? this.isGC : this.hqTeams[role];
  }
}

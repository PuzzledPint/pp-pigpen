import { WebmasterService } from "src/services/webmaster.service";

import { FSAdminPermissions } from "src/models/fs-admin-permissions";

import { NotifyService } from "src/services/notify.service";
import { Injectable } from "@angular/core";

@Injectable()
export class WebmasterServiceMock implements WebmasterService {
  public permissions: FSAdminPermissions = {
    userClaims: [
      {
        uid: "",
        email: "person@org.org",

        CityOps: true,
        Comms: false,
        Editor: true,
        Showrunner: true,
        Webmaster: true,
      }
    ]
  };

  constructor(private ns: NotifyService) { }

  public savePermissions() { this.ns.error("Saved", "Permissions"); }

  public addUserClaim() {
    this.permissions.userClaims.push({ uid: "", email: "@puzzledpint.org", Editor: false, CityOps: false, Comms: false, Showrunner: false, Webmaster: false });
  }
}

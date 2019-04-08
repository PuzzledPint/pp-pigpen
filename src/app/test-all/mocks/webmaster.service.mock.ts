import { NotifyService } from "src/shared/root/notify.service";
import { Injectable } from "@angular/core";
import { FSAdminPermissions } from 'src/app/webmaster/fs-admin-permissions';
import { WebmasterService } from 'src/app/webmaster/webmaster.service';

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

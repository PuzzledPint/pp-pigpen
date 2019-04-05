import { WebmasterService } from './webmaster.service';
import { AngularFirestoreDocument, AngularFirestore } from "@angular/fire/firestore";
import { FSAdminPermissions } from "src/models/fs-admin-permissions";
import { NotifyService } from "./notify.service";
import { SentryService } from "./sentry.service";
import { Injectable } from '@angular/core';

@Injectable()
export class WebmasterServiceImpl implements WebmasterService {
  private permissionsDoc: AngularFirestoreDocument<FSAdminPermissions>;
  public permissions: FSAdminPermissions | undefined;

  constructor(private readonly af: AngularFirestore, private readonly ns: NotifyService, private ss: SentryService) {
    this.permissionsDoc = af.doc<FSAdminPermissions>("/webmaster/permissions");
    this.permissionsDoc.valueChanges().subscribe(
      next => this.permissions = next,
      error => ss.log(error));
  }

  // Public interface
  public savePermissions() {
    if (this.permissions) {
      this.permissionsDoc.set(this.permissions);
      // Call function
    } else {
      this.ss.log("Permissions Object wasn't initialized");
    }
  }

  public addUserClaim() {
    if (this.permissions) {
      this.permissions.userClaims.push({ uid: "", email: "@puzzledpint.org", Editor: false, CityOps: false, Comms: false, Showrunner: false, Webmaster: false });
    } else {
      this.ss.log("Permissions Object wasn't initialized");
    }
  }

}

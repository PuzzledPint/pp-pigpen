import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument, DocumentReference, AngularFirestoreCollection } from "@angular/fire/firestore";
import { FSAdminPermissions } from "src/models/fs-admin-permissions";
import { SentryService } from "./sentry.service";
import { NotifyService } from "./notify.service";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class WebmasterService {
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
}

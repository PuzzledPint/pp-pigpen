import { Component, OnInit, Input } from "@angular/core";
import { UserService } from "src/services/user.service";
import { HttpParams } from "@angular/common/http";

@Component({
  selector: "app-editor-email-button",
  template: `
    <a href="{{ url() }}" target="_blank">
      <p-button label="Email {{ toEmail }}"></p-button>
    </a>
  `,
  styles: ["p-button { margin-left: 5px; }"],
})
export class EmailButtonComponent implements OnInit {
  @Input() public subject: string;
  @Input() public toEmail: string;

  constructor(private us: UserService) {
    this.subject = "";
    this.toEmail = "";
  }

  public ngOnInit() {
  }

  public url(): string {
    //https://mail.google.com/mail/?account_id=neal@puzzledpint.org&view=cm&fs=1&to=someone@example.com&su=SUBJECT&body=BODY&bcc=someone.else@example.com
    let parms = new HttpParams();

    parms = parms.set("account_id", this.us.email);
    parms = parms.set("view", "cm");
    parms = parms.set("fs", "1");
    parms = parms.set("to", this.toEmail);
    parms = parms.set("su", this.subject);
    //parms.set("body", "cm");

    const final = "https://mail.google.com/mail/?" + parms.toString();
    return final;
  }
}

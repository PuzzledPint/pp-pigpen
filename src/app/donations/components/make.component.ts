import { Component, OnInit, HostListener } from "@angular/core";
import { AngularFireFunctions } from "@angular/fire/functions";
import { environment } from "src/environments/environment";
import { NotifyService } from "src/shared/root/notify.service";

// interface StripeCheckoutStatic {
//   configure(options: StripeCheckoutOptions): StripeCheckoutHandler;
// }

// interface StripeCheckoutHandler {
//   open(options?: StripeCheckoutOptions): void;
//   close(): void;
// }

// interface StripeCheckoutOptions {
//   key?: string;
//   token?(token: stripe.Token): void;
//   source?(source: stripe.Source): void;
//   image?: string;
//   name?: string;
//   description?: string;
//   amount?: number;
//   locale?: string;
//   currency?: string;
//   panelLabel?: string;
//   zipCode?: boolean;
//   billingAddress?: boolean;
//   email?: string;
//   shippingAddress?: boolean;
//   label?: string;
//   allowRememberMe?: boolean;
//   bitcoin?: boolean;
//   alipay?: boolean | 'auto';
//   alipayReusable?: boolean;
//   opened?(): void;
//   closed?(): void;
// }

// declare var StripeCheckout: StripeCheckoutStatic;

@Component({
  selector: "app-donations-make",
  template: `
    <div class="p-grid">
      <p-card header="Make a One-Time Donation to Puzzled Pint" styleClass="ui-card-shadow">
        <span>
          <span>Amount in $ (US Dollars) </span>
          <input pInputText type="text" size="5" [(ngModel)]="amount" (blur)="validateAmount()" />
        </span>
        <p>Clicking <b>Donate</b> will open a <a href="https://stripe.com/docs/security/stripe" target="_blank">Stripe</a> dialog to securely ask for your card details.</p>
        <div *ngIf="processing">
        <hr/>
          <p><b>Processing Transaction</b></p>
          <p-progressBar mode="indeterminate"></p-progressBar>
        </div>
        <p-footer>
          <div class="ui-toolbar-group-right">
            <button pButton type="button" label="Donate" class="ui-button-primary" (click)="checkout($event)"></button>
          </div>
        </p-footer>
      </p-card>
    </div>
  `,
  styles: [],
})
export class DonationsMakeComponent implements OnInit {
  private handler: StripeCheckoutHandler | undefined;
  public confirmation: any;
  public processing = false;
  public amount = "";
  private validAmount = 0;
  constructor(private aff: AngularFireFunctions, private ns: NotifyService) {}

  public ngOnInit() {
    this.handler = StripeCheckout.configure({
      key: environment.stripe_publishable_key, // add key
      image: "https://www.puzzledpint.org/assets/icons/icon-128x128.png", // add PP logo
      locale: "auto",
      source: async source => {
        this.processing = true;
        // this.confirmation = await mockAPI(user.uid, source.id, this.amount);
        const fun = this.aff.httpsCallable("stripeCreateAnonymousCharge");
        //        this.confirmation = await fun({ source: source.id, uid: user.uid, amount: this.amount }).toPromise();
        this.confirmation = await fun({ source: source.id, amount: this.amount }).toPromise();
        this.processing = false;
      },
    });
  }

  public validateAmount(): boolean {
    const i = +this.amount;
    if (i < 1) {
      this.amount = "1";
      this.validAmount = 1;
      this.ns.error("Invalid Amount", "You can donate a minimum of $1");
      return false;
    }
    if (i > 100) {
      this.amount = "100";
      this.validAmount = 100;
      this.ns.error("Invalid Amount", "You can donate a maximum of $100 on this page.  To make a larger donation, please contact hq@puzzledpint.org");
      return false;
    }
    return true;
  }
  // Open the checkout handler
  public async checkout(e: any) {
    if (!this.validateAmount()) return;
    if (!this.handler) throw new Error("StripeHandler not initialized");

    this.handler.open({
      name: "Puzzled Pint",
      description: "One-Time Donation",
      amount: this.validAmount * 100,
    });
    e.preventDefault();
  }

  // Close on navigate
  @HostListener("window:popstate")
  public onPopstate() {
    if (this.handler) this.handler.close();
  }
}

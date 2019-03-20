import { Component, OnInit, HostListener } from "@angular/core";
import { AngularFireFunctions } from "@angular/fire/functions";
import { environment } from "src/environments/environment";
import { NotifyService } from "src/services/notify.service";

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
  selector: "app-make-donation",
  template: `
    <h1>Make an Anonymous Donation to Puzzled Pint</h1>
    <div class="ui-inputgroup p-col-12 p-md-6 p-lg-6 p-xl-4">
      <span class="ui-inputgroup-addon">Donation Amount ($ USD)</span>
      <input pInputText type="text" size="5" [(ngModel)]="amount" (blur)="validateAmount()" />

      <button class="button is-success" (click)="checkout($event)">Donate $ {{ amount }}</button>

      <hr />
      <div *ngIf="loading" class="notification is-info">Loading....</div>
      <pre *ngIf="confirmation" style="max-width: 500px;">
  {{ confirmation | json }}
</pre
      >
    </div>
  `,
  styles: [],
})
export class MakeDonationComponent implements OnInit {
  private handler: StripeCheckoutHandler | undefined;
  public confirmation: any;
  public loading = false;
  public amount = "5";
  private validAmount = 5;
  constructor(private aff: AngularFireFunctions, private ns: NotifyService) {}

  public ngOnInit() {
    this.handler = StripeCheckout.configure({
      key: environment.stripe_publishable_key, // add key
      image: "/assets/icons/icon-128x128.png", // add PP logo
      locale: "auto",
      source: async source => {
        this.loading = true;
        // this.confirmation = await mockAPI(user.uid, source.id, this.amount);
        const fun = this.aff.httpsCallable("stripeCreateAnonymousCharge");
        //        this.confirmation = await fun({ source: source.id, uid: user.uid, amount: this.amount }).toPromise();
        this.confirmation = await fun({ source: source.id, amount: this.amount }).toPromise();
        this.loading = false;
      },
    });
  }

  public validateAmount() {
    const i = +this.amount;
    if (i < 1) {
      this.amount = "1";
      this.validAmount = 1;
      this.ns.error("Invalid Amount", "You can donate a minimum of $1");
      return;
    }
    if (i > 100) {
      this.amount = "100";
      this.validAmount = 100;
      this.ns.error("Invalid Amount", "You can donate a maximum of $100 on this page.  To make a larger donation, please contact hq@puzzledpint.org");
      return;
    }
  }
  // Open the checkout handler
  public async checkout(e: any) {
    if (!this.handler) throw new Error("StripeHandler not initialized");

    this.handler.open({
      name: "Fireship Store",
      description: "Puzzled Pint Donation",
      amount: this.validAmount
    });
    e.preventDefault();
  }

  // Close on navigate
  @HostListener("window:popstate")
  public onPopstate() {
    if(this.handler) this.handler.close();
  }
}

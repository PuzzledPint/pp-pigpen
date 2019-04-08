import { Component, OnInit } from "@angular/core";
import { NotifyService } from "src/shared/root/notify.service";
import { UserService } from './user.service';

@Component({
  selector: "app-home",
  template: `
    <div class="p-grid">
      <div class="p-xl-3 p-lg-4 p-md-6 p-sm-12">
        <app-info-card title="What is Puzzled Pint?" text="Everything you wanted to know about Puzzled Pint can be found in our information section" link="/info/about"></app-info-card>
      </div>

      <div class="p-xl-3 p-lg-4 p-md-6 p-sm-12">
        <app-info-card title="How do I solve your puzzles?" text="
        Discover information and tools to help you solve our puzzles, including our Code Sheet" link="/resources"></app-info-card>
      </div>

      <div class="p-xl-3 p-lg-4 p-md-6 p-sm-12">
        <app-info-card title="Media Inquiries"
        text="Are you from the media?  Please see our media information kit." link="/info/media"></app-info-card>
      </div>

      <div class="p-xl-3 p-lg-4 p-md-6 p-sm-12">
        <app-info-card title="Puzzle Archives"
        text="Over 9 years of Creative Commons puzzles are here for your enjoyment.  Until they're converted, these are only on our old site."
        link="http://www.puzzledpint.com/puzzles/"></app-info-card>
      </div>

      <div class="p-xl-3 p-lg-4 p-md-6 p-sm-12">
        <app-info-card title="Team Standings" text="
        Though Puzzled Pint is not a competitive event, you can still compare your team's time to other teams in your city and across the world.
        Standings are on your city's page." link="/locations"></app-info-card>
      </div>

      <div class="p-xl-3 p-lg-4 p-md-6 p-sm-12">
        <app-info-card title="What's new with Puzzled Pint?" text="
        Gain insights on Puzzles and Puzzled Pint from our HQ members, guest authors, and more.
        For now, this is still on our old site." link="http://blog.puzzledpint.com/"></app-info-card>
      </div>

      <div *ngIf="us.GCCity" class="p-xl-3 p-lg-4 p-md-6 p-sm-12">
      <app-info-card title="Hello {{us.GCCity}} Game Control" text="Click the button to go to your city's dashboard" [link]="gcLink(us.GCCity)"></app-info-card>
      <app-info-card title="Playtesting" text="
      Cities are required to playtest at least 4 times a year.
      [Your City] has done so # times.
      Thank You!
      [Your City] is overdue to test." link="/playtesting"></app-info-card>
      </div>

      <div *ngIf="us.isCityOps" class="p-xl-3 p-lg-4 p-md-6 p-sm-12">
        <app-info-card title="Hello City Operations" text="Click the button to go to your dashboard" link="/city-ops"></app-info-card>
      </div>
      <div *ngIf="us.isComms" class="p-xl-3 p-lg-4 p-md-6 p-sm-12">
        <app-info-card title="Hello Comms" text="Click the button to go to your dashboard" link="/comms"></app-info-card>
      </div>
      <div *ngIf="us.isEditor" class="p-xl-3 p-lg-4 p-md-6 p-sm-12">
        <app-info-card title="Hello Editor" text="Click the button to go to your dashboard" link="/editor"></app-info-card>
      </div>
      <div *ngIf="us.isShowrunner" class="p-xl-3 p-lg-4 p-md-6 p-sm-12">
        <app-info-card title="Hello Showrunner" text="Click the button to go to your dashboard" link="/showrunner"></app-info-card>
      </div>
      <div *ngIf="us.isWebmaster" class="p-xl-3 p-lg-4 p-md-6 p-sm-12">
      <app-info-card title="Hello Webmaster" text="Click the button to go to your dashboard" link="/webmaster"></app-info-card>
      <app-info-card title="Test All" text="Click for the test component page." link="/test-all"></app-info-card>
      <app-info-card title="Donations" text="
      We are a 501c3 non-profit charity.
      We receive no payments from our venues (bars), and do not charge for our puzzles.
      Please support our mission." link="/donations"></app-info-card>
      </div>
    </div>
  `,
  styles: [],
})
export class HomeComponent implements OnInit {
  constructor(private ns: NotifyService, public us: UserService) { }

  public ngOnInit() {
    this.ns.setTitle("Welcome");
  }

  public gcLink(city: string): string {
    return `/game-control/${city}`;
  }


}

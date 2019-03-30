import { Component, OnInit } from "@angular/core";
import { NotifyService } from "src/services/notify.service";
import { UserService } from "src/services/user.service";

@Component({
  selector: "app-home",
  template: `
    <div class="p-grid">
      <div class="p-xl-3 p-lg-4 p-md-6 p-sm-12">
        <app-info-card title="Info" text="Everything you wanted to know about Puzzled Pint can be found here" buttonText="Learn More" link="/info"></app-info-card>
      </div>
      <div class="p-xl-3 p-lg-4 p-md-6 p-sm-12">
        <app-info-card title="Puzzle Archives" text="Over 9 years of Creative Commons puzzles are here for your enjoyment" buttonText="Peruse" link="/puzzles"></app-info-card>
      </div>

      <div class="p-xl-3 p-lg-4 p-md-6 p-sm-12">
        <app-info-card title="Team Standings" text="Compare your team's time to other teams in your city and across the world" buttonText="Compare" link="/standings"></app-info-card>
      </div>

      <div class="p-xl-3 p-lg-4 p-md-6 p-sm-12">
        <app-info-card title="Solving Resources" text="Discover tools to help you solve puzzles, including our Code Sheet" buttonText="Discover" link="/resources"></app-info-card>
      </div>

      <div class="p-xl-3 p-lg-4 p-md-6 p-sm-12">
        <app-info-card title="Questions?" text="Our FAQ is a great place to start" buttonText="See FAQ" link="/faq"></app-info-card>
      </div>

      <div class="p-xl-3 p-lg-4 p-md-6 p-sm-12">
        <app-info-card title="Blog" text="Gain insights on Puzzles and Puzzled Pint from our HQ members, guest authors, and more." buttonText="Become Enlightened" link="/blog"></app-info-card>
      </div>

      <div *ngIf="us.isEditor" class="p-xl-3 p-lg-4 p-md-6 p-sm-12">
        <app-info-card title="Hello Editor" text="Click the button to go to your dashboard" buttonText="Go" link="/editor"></app-info-card>
      </div>
      <div *ngIf="us.isCityOps" class="p-xl-3 p-lg-4 p-md-6 p-sm-12">
        <app-info-card title="Hello City Operations" text="Click the button to go to your dashboard" buttonText="Go" link="/city-ops"></app-info-card>
      </div>
      <div *ngIf="us.isComms" class="p-xl-3 p-lg-4 p-md-6 p-sm-12">
        <app-info-card title="Hello Comms" text="Click the button to go to your dashboard" buttonText="Go" link="/comms"></app-info-card>
      </div>
      <div *ngIf="us.isWebmaster" class="p-xl-3 p-lg-4 p-md-6 p-sm-12">
        <app-info-card title="Hello Webmaster" text="Click the button to go to your dashboard" buttonText="Go" link="/webmaster"></app-info-card>
      </div>
      <div *ngIf="us.isShowrunner" class="p-xl-3 p-lg-4 p-md-6 p-sm-12">
        <app-info-card title="Hello Showrunner" text="Click the button to go to your dashboard" buttonText="Go" link="/showrunner"></app-info-card>
      </div>
      <div *ngIf="us.GCCity" class="p-xl-3 p-lg-4 p-md-6 p-sm-12">
        <app-info-card title="Hello {{us.GCCity}} Game Control" text="Click the button to go to your city's dashboard" buttonText="Go" [link]="gcLink(us.GCCity)"></app-info-card>
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

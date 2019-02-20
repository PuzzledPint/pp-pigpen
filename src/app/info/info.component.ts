// tslint:disable: max-line-length
import { Component, OnInit } from "@angular/core";
import { NotifyService } from "src/services/notify.service";
import { UserService } from "src/services/user.service";
import { Router, ActivatedRoute } from "@angular/router";

class Info {
  title = "";
  teaser = "";
  buttonText = "";
  slug = "";
  fulltext = "";
}

@Component({
  selector: "app-info",
  template: `
    <div class="p-grid">
      <div class="p-xl-9 p-lg-8 p-md-6 p-sm-6">
        <p-card [header]="selected.title" styleClass="ui-card-shadow">
          <span [innerHTML]="selected.fulltext"></span>
        </p-card>
      </div>
      <div class="p-xl-3 p-lg-4 p-md-6 p-sm-6">
        <div *ngFor="let i of staticInfos">
          <div *ngIf="i.slug !== selected.slug">
            <app-info-card
              [title]="i.title"
              [text]="i.teaser"
              [buttonText]="i.buttonText"
              [link]="'/info/' + i.slug"
            ></app-info-card>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class InfoComponent implements OnInit {
  selected: Info = new Info();

  staticInfos: Info[] = [
    {
      title: "About",
      teaser: `Puzzled Pint is a casual, social puzzle solving event which happens at bars/pubs on
          the second Tuesday of every month in multiple cities around the world.`,
      buttonText: "More",
      slug: "about",
      fulltext: `
      <p><strong>Puzzled Pint</strong> is a casual, social puzzle solving event which happens at bars/pubs on the
      <strong>second Tuesday of every month</strong> in multiple cities around the world. The Friday before each
      event, we post a <strong>location puzzle</strong> to this web site. The solution to that puzzle will lead
      you to a local pub/bar/restaurant in your <a title="cities" routerLink="/cities/">city</a>. Hints will be
      available here on the site, and you can also <a href="mailto:hq@puzzledpint.org">e-mail us</a>
      with questions.</p>
      <p>On the night of the event, show up at the specified pub in your city (some cities may offer a choice;
      details including <strong>event start time</strong> will be posted on your city's page). We'll have
      more puzzles for you to solve while you enjoy drinks and food. Most teams take between 30 minutes
      and 2 hours to solve a typical puzzle set. "Game Control" will be on hand to give hints and verify
      answers.</p>
      <p><a routerLink="/standings">Standings</a> will be posted every month, but the goal
      of Puzzled Pint is for everyone to <strong>have fun!</strong>
  `
    },
    {
      title: "Starting up your city",
      teaser: `No Puzzled Pint in your city?  Click through to learn how to host a Puzzled Pint party, or begin the on-boarding process.`,
      buttonText: "Volunteer",
      slug: "onboarding",
      fulltext: `
    <h1>No Puzzled Pint in Your City?</h1>
<h3>Host a Puzzled Pint Party with your friends!</h3>
<p>Puzzled Pint Parties are great one-off events where you re-run one or more previous events for friends and family.</p>
<p>All of our puzzles are released under a Creative Commons license. You can browse <a title="puzzles" href="/puzzles/">the full archives</a>, print out puzzles and solve them with your friends. For beginners, we suggest you start here: <a href="http://www.puzzledpint.com/puzzles/may-2014/">http://www.puzzledpint.com/puzzles/may-2014/</a></p>
<p>As long as you're not trying to represent yourself <em>as</em> Puzzled Pint and you stick within the flexible licensing, you're free to run parties without asking permission. But it warms our hearts to hear of them. If you run a party, <a href="mailto:gamecontrol@puzzledpint.com">we'd love to know</a>.</p>
<p><em>Fun Fact: London's Puzzled Pint started because someone ran a Puzzled Pint party. Folks got hooked on puzzles and now it's an official location that regularly exceeds 70 attendees (as of early 2016).</em></p>
<p> </p>
<hr noshade="noshade" width="50%" />
<h2>Want to run Puzzled Pint monthly in your city?</h2>
<p>You can do that too! Drop us an e-mail at <a href="mailto:gamecontrol@puzzledpint.com">gamecontrol@puzzledpint.com</a>.</p>
<p>Here’s what it’s all about:</p>
<h3>The Core Tenets of Puzzled Pint</h3>
<p>Puzzled Pint must be:</p>
<ul>
<li>FREE to play</li>
<li>At a bar/pub</li>
<li>Open to the public</li>
<li>The same puzzles/day as other cities</li>
<li>Please read <a title="charter" href="/info/charter/">our charter</a> to learn all of the other details</li>
</ul>
<p>Events happen on the second Tuesday of every month. We post a location puzzle online the weekend before, and the solution leads to a local bar. At the bar, the hosts ("Game Control") hand out the month's puzzles (usually 4-5), and are prepared to hint puzzlers as needed. We encourage teams to take hints, as we want to keep PP friendly for beginners. There are no penalties for hints. We do post the start/end times on this web site, but most teams don't pay attention to them.</p>
<h3>How much work is it?</h3>
<p>What we provide to you, the city Game Control (GC):</p>
<ul>
<li>the month's puzzles, a few days in advance (and the solutions for you)</li>
<li>logistical help, ability to answer questions, etc.</li>
</ul>
<p>What you provide locally:</p>
<ul>
<li>At least two people to run the event - Do you know anyone else who may be interested? We can try to put feelers out as well, if you'd like.</li>
<li>Find a bar for every month. (Ideally a new bar each time.) Talk to the bar ahead of time, ensure they're okay with serving a large number of people that night. We sometimes describe PP as similar to pub trivia, but more casual and less noisy. :)</li>
<li>If you want, promote the event. Do as much social media wizardry as you like. We recommend targeting specific audiences (tech groups, colleges and universities, etc.). Word of mouth has generally been our best advertising.</li>
<li>Before the month's event, print puzzles for teams. And know solutions so you can (with referring to the solution docs) help guide teams to the answers.</li>
</ul>
<p>We're pretty flexible with how you customize Puzzled Pint to your city, as long as it adheres to our core tenets as described above.</p>
<h3>How do I find out more?</h3>
<p>E-mail <a href="mailto:gamecontrol@puzzledpint.com">gamecontrol@puzzledpint.com</a>. We'll schedule a time to group video-chat with you and any co-conspirators you might have. If you don't, we'll try to help put out the word that your city needs another volunteer.</p>
<p>We encourage all new cities to have at least two GC members before they start organizing official events. In the meantime, definitely feel free to run a <strong>Puzzled Pint Party</strong> (see above for details)!</p>
<p> </p>`
    }
  ];

  constructor(
    private ns: NotifyService,
    public us: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.setSelected("about");
  }

  ngOnInit() {
    this.ns.setTitle("Info");

    this.route.paramMap.subscribe(params => this.setSelected(params.get("slug")));
  }

  setSelected(slug: string | null) {
    if (!slug) {
      slug = "about";
    }
    const newInfo = this.staticInfos.find(info => info.slug === slug);
    this.selected = newInfo ? newInfo : new Info();
  }
}

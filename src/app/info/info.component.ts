// tslint:disable: max-line-length
import { Component, OnInit, SecurityContext } from "@angular/core";
import { NotifyService } from "src/services/notify.service";
import { Router, ActivatedRoute } from "@angular/router";
import { trigger, state, transition, animate, style, query, stagger, keyframes } from '@angular/animations';
import { DomSanitizer } from "@angular/platform-browser";

class Info {
  public title = "";
  public teaser = "";
  public slug = "";
  public fulltext: string | null = "";
}
// [@visibleState]="i.slug !== selected.slug ? 'yes' : 'no'"

@Component({
  selector: "app-info",
  template: `
    <div class="p-grid">
      <div class="p-xl-9 p-lg-9 p-md-12 p-sm-12" [@activeAnimation]="selected?.slug">
        <p-card #activeSlug [header]="selected?.title" styleClass="ui-card-shadow">
          <span [innerHTML]="selected?.fulltext"></span>
        </p-card>
      </div>
      <div class="p-xl-3 p-lg-3 p-md-12 p-sm-12" [@listAnimation]="selected?.slug">
      <div *ngFor="let i of staticInfos" class="p-col-12">
      <app-info-card [title]="i.title" [text]="i.teaser" [link]="'/info/' + i.slug"></app-info-card>
      </div>
      </div>
      </div>
  `,
  styles: [`
    .animated-card {
    }
  `],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter',
          animate('0.5s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateX(-75%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateX(35px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 }),
          ])), { optional: true }),
        query(':leave',
          animate('0.5s ease-out', keyframes([
            style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
            style({ opacity: .5, transform: 'translateX(35px)', offset: 0.3 }),
            style({ opacity: 0, transform: 'translateX(-75%)', offset: 1.0 }),
          ])), { optional: true }),
      ])
    ]),
    trigger('activeAnimation', [
      transition('* => *', [
        query('*', animate('1s', keyframes([
          style({ opacity: 1, transform: 'translateX(0) translateY(0px) scaleX(1)', offset: 0.0 }),
          style({ opacity: .1, transform: 'translateX(+75%) translateY(100vh) scaleX(0)', offset: 0.5 }),
          style({ opacity: .1, transform: 'translateX(+75%) translateY(50vh) scaleX(0) scaleY(0)', offset: 0.55 }),
          style({ opacity: 1, transform: 'translateX(0) translateY(0px) scaleX(1) scaleY(1)', offset: 1.0 }),
        ])))])])],
})

export class InfoComponent implements OnInit {
  public selected: Info | null = null;
  public staticInfos: Info[];

  constructor(private ns: NotifyService, private route: ActivatedRoute, private router: Router, ds: DomSanitizer) {
      this.staticInfos = [
      {
      title: "About",
      teaser: `Puzzled Pint is a free casual puzzle solving event which happens at bars/pubs on
          the second Tuesday of every month in multiple cities around the world.  Click to learn more.`,
      slug: "about",
      fulltext: ds.sanitize(SecurityContext.URL,`
      <p><strong>Puzzled Pint</strong> is a casual, social puzzle solving event which happens at bars/pubs on the
      <strong>second Tuesday of every month</strong> in multiple cities around the world. The Friday before each
      event, we post a <strong>location puzzle</strong> to this web site. The solution to that puzzle will lead
      you to a local pub/bar/restaurant in your city. Hints will be
      available here on the site, and you can also <a href="mailto:hq@puzzledpint.org">e-mail us</a>
      with questions.</p>
      <p>On the night of the event, show up at the specified pub in your city (some cities may offer a choice;
      details including <strong>event start time</strong> will be posted on your city's page). We'll have
      more puzzles for you to solve while you enjoy drinks and food. Most teams take between 30 minutes
      and 2 hours to solve a typical puzzle set. "Game Control" will be on hand to give hints and verify
      answers.</p>
      <p>Standings will be posted every month, but the goal of Puzzled Pint is for everyone to <strong>have fun!</strong>
  `),
    },
    {
      title: "Charter",
      teaser: `Our charter defines our core values, our responsibilities, and the events that can be run under the Puzzled Pint name and brand.`,
      slug: "charter",
      fulltext: `
      <h1>Puzzled Pint Charter</h1>
      <p><span>This document acts as a constitution for Puzzled Pint event-runners, aka Game Control (GC). It defines our core values, our responsibilities, and the events that can be run under the Puzzled Pint name and brand.  </span></p>
      <h2><span>Core Philosophy</span></h2>
      <p><span>These are the non-negotiable essence of Puzzled Pint.  We uphold them at all times.</span></p>
      <ul>
      <li>
      <p><span>Nonprofit, volunteer events</span></p>
      </li>
      <li>
      <p><span>Free to attend and play</span></p>
      </li>
      <li>
      <p><span>Open to the public</span></p>
      </li>
      <li>
      <p><span>Newbie-friendly and non-competitive (no prizes, no scoring)</span></p>
      </li>
      <li>
      <p><span>In a bar or other place that serves pints</span></p>
      </li>
      <li>
      <p><span>The 2nd Tuesday of the month, in the evening, scheduled for around 3 hours</span></p>
      </li>
      <li>
      <p><span>Using the same puzzles as the other cities</span></p>
      </li>
      <li>
      <p><span>For the benefit of the puzzling community:</span></p>
      </li>
      <ul>
      <li>
      <p><span>Content is shared under a Creative Commons Noncommercial Attribution license</span></p>
      </li>
      <li>
      <p><span>Private noncommercial events using our archive of puzzles are encouraged--we call them “Puzzled Pint Parties.”</span></p>
      </li>
      </ul>
      </ul>
      <h2><span>Core Responsibilities</span></h2>
      <p><span>GC in any given city is responsible for these tasks:</span></p>
      <ul>
      <li>
      <p><span>Secure a location each month</span></p>
      </li>
      <li>
      <p><span>Solve or otherwise become familiar with the month’s puzzles</span></p>
      </li>
      <li>
      <p><span>Print event materials, including puzzles, answer sheets, code sheets, etc.</span></p>
      </li>
      <li>
      <p><span>Staff the event</span></p>
      </li>
      <ul>
      <li>
      <p><span>Help players locate GC</span></p>
      </li>
      <li>
      <p><span>Distribute packets to teams and record start and end times</span></p>
      </li>
      <li>
      <p><span>Help match singleton players to one another or existing teams</span></p>
      </li>
      <li>
      <p><span>Happily give out hints, confirm answers, and assist players as requested</span></p>
      </li>
      <li>
      <p><span>Collect answer sheets</span></p>
      </li>
      </ul>
      <li>
      <p><span>Record answer sheet information</span></p>
      </li>
      </ul>
      <p><span>Headquarters (HQ) is responsible for these tasks:</span></p>
      <ul>
      <li>
      <p><span>Making puzzles available before monthly events</span></p>
      </li>
      <li>
      <p><span>Creating and updating Puzzled Pint documentation, including this Charter</span></p>
      </li>
      <li>
      <p><span>Maintaining the website, archived content, and storage media</span></p>
      </li>
      <li>
      <p><span>Answering questions from city GCs and the public</span></p>
      </li>
      </ul>
      <h2><span>Puzzled Pint is Noncommercial</span></h2>
      <p><span>There must be no commercial affiliation for a given city or event.  That said, GC is welcome to accept occasional printing services or promotional materials for distribution to the players. To avoid the appearance of a commercial affiliation, and to prevent a conflict of interest, limit the frequency of printing or promos from any given provider to a few times per year. Address any “sponsorship” related questions to HQ.</span></p>

      <hr /><h1>Puzzled Pint Regional Variations</h1>
      <p><span>While the Puzzled Pint Charter acts as a core constitution, this document acts as a set of amendments that individual cities may use to customize the event for local culture, geography, and other factors.</span></p>
      <p>Please contact HQ for ideas outside this list.  It’s good to have a second set of eyes to confirm the idea fits our philosophy--plus we’ll know to add the idea to this list for other cities to try.</p>
      <p> </p>
      <h4>Options</h4>
      <ul>
      <li>
      <p><span>May request voluntary donations for printing and material expenses.  A few notes:</span></p>
      </li>
      <ul>
      <li>
      <p><span>Check with host bar for their policy.  They may want a share.</span></p>
      </li>
      <li>
      <p><span>Be careful to ensure that attendees who do not donate are just as welcome as attendees who do</span></p>
      </li>
      </ul>
      <li>
      <p><span>Physical location options</span></p>
      </li>
      <ul>
      <li>
      <p><span>Rotate to a new bar/restaurant every month</span></p>
      </li>
      <li>
      <p><span>Rotate among a few core bars/restaurants</span></p>
      </li>
      <li>
      <p><span>Use a single home bar/restaurant</span></p>
      </li>
      </ul>
      <li>
      <p><span>Event promotion options</span></p>
      </li>
      <ul>
      <li>
      <p><span>May operate a social media account for your area (e.g. Twitter, Facebook, etc).</span></p>
      </li>
      <li>
      <p><span>May promote a rough regional location ahead of time (e.g. "it's in SE Portland" or “it’s downtown”)</span></p>
      </li>
      <li>
      <p><span>May promote the actual location ahead of time (e.g. "it's in The Foo Bar")</span></p>
      </li>
      </ul>
      <li>
      <p><span>Puzzle options</span></p>
      </li>
      <ul>
      <li>
      <p><span>May help us write puzzles</span></p>
      </li>
      <li>
      <p><span>May help us playtest puzzles</span></p>
      </li>
      </ul>
      <li>
      <p><span>May rotate GC members so that folks can run the event one month and attend as a player another month.</span></p>
      </li>
      <li>
      <p><span>May split into multiple events in a single city, especially when the event is large</span></p>
      </li>
      <li>
      <p><span>May wear a button, t-shirt, hat or other item to identify you as GC</span></p>
      </li>
      <li><span>May produce “frequent puzzler” cards, stickers, or other swag, but must not discriminate — all attending players should be offered the materials. Local GC is responsible for funding these sorts of projects. Example: Portland GC pooled personal funds and gifted all attending players screen-printed pint glasses on our anniversary month.</span></li>
      <li>
      <p><span>May use extra physical elements in the puzzles for your city (things that are perhaps not feasible to manufacture &amp; send to other cities e.g. laser-cut, 3D printed, the "football" briefcase combination, electronic gadgets, and so on) </span></p>
      </li>
      <ul>
      <li>
      <p><span>If used, this MUST be an optional extra or augmentation, never a replacement for the month’s puzzles</span></p>
      </li>
      </ul>
      <li>
      <p><span>May offer flyers or swag provided by local businesses or events of interest to puzzlers (examples: a flyer for an upcoming DASH or puzzly convention; coupons for escape rooms, a call for playtesters, etc.)</span></p>
      </li>
      <li>
      <p><span>May offer free-to-enter drawings for door prizes provided by local businesses, or provide small celebratory gifts to players so long as they are not rewards for “winning” Puzzled Pint.</span></p>
      </li>
      <li>
      <p><span>May utilize puzzles from the archive to offer one-off Puzzled Pint branded events sponsored by the city GC.  Such one-off Puzzled Pint events must be:</span></p>
      </li>
      <ul>
      <li>
      <p><span>Part of a local festival, convention, or other nonprofit event of interest to puzzlers. </span></p>
      </li>
      <li>
      <p><span>Volunteer-run, public, newbie-friendly, and free to play (while it is acceptable for attendees to pay to attend the overarching event, the Puzzled Pint portion itself must be free to play).</span></p>
      </li>
      </ul>
      <li>
      <p><span>Duration:</span></p>
      </li>
      <ul>
      <li>
      <p><span>May stay longer than 3 hours, if desired</span></p>
      </li>
      <li>
      <p><span>May set a “closing” time for a city GC and tell teams beforehand</span></p>
      </li>
      <li>
      <p><span>May wander around and warn remaining teams that GC will be leaving in 10-15minutes, if desired</span></p>
      </li>
      </ul>
      </ul>
      <p> </p>
      <hr />
      <h1>Policy on GC accepting comps/freebies</h1>
      <p><span><span> </span></span></p>
      <p><span>(TL;DR: it's OK to accept occasional freebies, but do NOT ask for comps when booking)</span></p>
      <p><span><span> </span></span></p>
      <ul>
      <li>
      <p><span>GC should NOT request any compensation in exchange for hosting PP at a specific bar</span></p>
      </li>
      <li>
      <p><span>it's OK if bars offer freebies, but do NOT solicit comps and do NOT make it a requirement for hosting PP</span></p>
      </li>
      <li>
      <p><span>i.e., do NOT say anything like "we'll only bring PP to your bar if you give us free drinks/food" (repeat: this is NOT OK)</span></p>
      </li>
      <li>
      <p><span>negotiating discounts, like extended happy hour pricing or drink specials, is OK (as long as it's for ALL attendees)</span></p>
      </li>
      <li>
      <p><span>it's also OK to accept if a player offers to buy you a drink at some point :)</span></p>
      </li>
      <li>
      <p><span>GC should NOT accept any cash, except for donations from players specifically to cover printing/production costs</span></p>
      </li>
      <li>
      <p><span>occasional "sponsorships" for printing/production are OK, but only accept goods or services from vendors, NOT money</span></p>
      </li>
      <li>
      <p><span>in legal/tax terms, nothing required by PP should "inure to the benefit" of GC, especially not money!</span></p>
      </li>
      </ul>
      <p><span><span> </span></span></p>
      <p><strong>Bottom line: Puzzled Pint is non-profit and volunteer-run.</strong></p>
      <p><span> </span></p>
      `,
    },
    {
      title: "FAQ",
      teaser: `Click for our Frequently Asked Questions`,
      slug: "faq",
      fulltext: ds.sanitize(SecurityContext.URL,`
      <h2 id="what_kind_of_puzzles_are_these">What kind of puzzles are these?</h2>
<p>Similar to <a href="http://en.wikipedia.org/wiki/The_Game_(treasure_hunt)" target="_blank">The Game</a> or the <a href="http://en.wikipedia.org/wiki/MIT_Mystery_Hunt" target="_blank">MIT Mystery Hunt</a>, these are not typical “puzzles”. They are often direction-less, and may incorporate traditional puzzles like crosswords, word searches, cryptograms, jigsaw puzzles, word play and logic problems. If you like any sort of logic or word puzzle, you’ll like these.</p>
<h2>How much does it cost?</h2>
<p>It's free to play! Food and drink are on you, though. And if you ever wanted to buy your Game Control volunteers a round of drinks, they'd probably appreciate it.</p>
<h2 id="can_we_form_teams">Can we form teams?</h2>
<div class="gmail_quote"><span>Yes! The event is intended for people to solve in teams of 3-5 people, though pairs also work. Some people solve in the same team each time; others team up with new people every month. Some teams split up the <span class="il">puzzles</span> and solve in parallel, while others solve all the <span class="il">puzzles</span> together. Some teams eat while they solve and others wait until they're done. Do whatever works for you.</span></div>
<div class="gmail_quote"><span> </span></div>
<div class="gmail_quote"><span>If you don't have a team, we can introduce you to other puzzlers who want to join forces. And if you get stuck at any point, hints are always free!</span></div>
<h2>Should I bring anything?</h2>
<div id="yui_3_13_0_ym1_1_1394688615086_27088">It's always good to be prepared. Definitely bring pens, pencils and erasers, as well as some scratch paper. Other tools that may come in handy: highlighters, a ruler or straight edge, scissors and tape. (Depending on your city, the folks running the event may have some to borrow.)  </div>
<div> </div>
<div>Some puzzles require knowledge that you might not already have in your head. Smartphones are allowed and encouraged, but you were probably going to bring those anyway.</div>
<h2>What happens if I can’t solve the puzzle that leads me to the bar?</h2>
<p>Check the hints on this web site. If those aren't helpful, you can also tweet <a href="http://twitter.com/puzzledpint" target="_blank">@PuzzledPint</a> on the day of the event. We want you to have fun, so we will help you solve it!</p>
<h2>Do I need to know anything about the theme?</h2>
<p>Each month's puzzles have a theme, but you do not need to know anything about the theme's source material to solve the puzzles. Even if you've never heard of a month's theme, you should be fine.</p>
<h2 id="how_do_i_win">How do I win?</h2>
<p>You don’t. Though some organized puzzle hunts have winners based on completion time, this is a low-key, fun event.</p>
<h2 id="if_there_is_no_winner_then_what_is_the_point">If there is no winner, then what is the point?</h2>
<p>To have fun. If this sounds even remotely interesting to you, you’re going to love it.</p>`)
    },
    {
      title: "Author's Corner",
      teaser: `Find out how to author puzzles.`,
      slug: "authoring",
      fulltext: ds.sanitize(SecurityContext.URL,`
      Our puzzles are all donated for use under the <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">Creative Commons CC-BY-NC-SA International 4.0 License</a>.
      We provide resources and editing support for new authors and experienced ones alike.  To get started,
      Coming Soon!`)
    },
    {
      title: "Volunteering",
      teaser: `How can I help out?`,
      slug: "volunteering",
      fulltext: `
      If you want to help Game Control run the puzzles every month, contact us at <a href="mailto:hq@puzzledpint.org">hq@puzzledpint.org</a>.<br/>
      If you want to start Puzzled Pint in your city, see our information on Hosting.<br/>
      If you want to help author puzzles, see visit our Author's Corner.<br/>
      If you want to help playtest the puzzles, contact one of our editors at <a href="mailto:hq@puzzledpint.org">hq@puzzledpint.org</a>.<br/>
      Finally, if you want to help us out at Headquarters or have anything else in mind, please contact us at <a href="mailto:hq@puzzledpint.org">hq@puzzledpint.org</a>.<br/>

      Thanks!
      `
    },
    {
      title: "Hosting",
      teaser: `No Puzzled Pint in your city? Click through to learn how to host a Puzzled Pint party, or begin the on-boarding process.`,
      slug: "onboarding",
      fulltext: ds.sanitize(SecurityContext.URL,`
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
<li>Please read <a title="charter" routerLink="/info/charter/">our charter</a> to learn all of the other details</li>
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
<p> </p>`),
    },
    {
      title: "Privacy Policy",
      teaser: `We care about your privacy.`,
      slug: "privacy-policy",
      fulltext: ds.sanitize(SecurityContext.URL,`
        Available <a href="https://app.termly.io/document/privacy-policy/db4a74aa-5d29-4b53-b346-e7385576dcf2" target="_blank">here</a>
      `),
    },
    {
      title: "Merchandise",
      teaser: `How do I buy that sweet Puzzled Pint merchandise?`,
      slug: "merch",
      fulltext: ds.sanitize(SecurityContext.URL,`
      The ability to receive a free gift for your donation is coming soon.
      `),
    },
  ];

    this.setSelected("about");
  }

  public ngOnInit() {
    this.ns.setTitle("Info");

    this.route.paramMap.subscribe(params => this.setSelected(params.get("slug")));
  }

  public setSelected(slug: string | null) {
    let index = this.staticInfos.findIndex(info => info.slug === (slug ? slug : "about"));
    if (index < 0) index = 0;

    if (this.selected) {
      if (this.selected.slug === slug) return;
      this.staticInfos.push(this.selected);
    }

    this.selected = this.staticInfos[index];
    this.staticInfos.splice(index, 1);
  }
}

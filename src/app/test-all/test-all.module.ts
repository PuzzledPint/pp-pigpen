import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { TestAllComponent } from "./test-all.component";
import { TestAllRoutingModule } from "./test-all-routing.module";

// Our Components
import { CityOpsModule } from "../city-ops/city-ops.module";
import { CommsModule } from "../comms/comms.module";
import { DonationsModule } from '../donations/donations.module';
import { EditorModule } from '../editor/editor.module';
import { InfoModule } from '../info/info.module';
import { PlaytestingModule } from '../playtesting/playtesting.module';
import { ProfileModule } from '../profile/profile.module';
import { ShowrunnerModule } from '../showrunner/showrunner.module';
import { WebmasterModule } from '../webmaster/webmaster.module';

@NgModule({
  declarations: [
    TestAllComponent
  ],
  imports: [
    // Angular
    CommonModule,
    CityOpsModule,
    DonationsModule,
    EditorModule,
    InfoModule,
    PlaytestingModule,
    ProfileModule,
    ShowrunnerModule,
    WebmasterModule,

    // Our app
    TestAllRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class TestAllModule {}

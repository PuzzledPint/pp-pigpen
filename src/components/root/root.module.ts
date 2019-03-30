import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// PrimeNG
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

// Our components
import { HomeComponent } from "./home.component";
import { HeaderComponent } from './header.component';
import { UserAuthComponent } from "./user-auth.component";
import { SitewideAlertComponent } from "./sitewide-alert.component";
import { InfoCardComponent } from "./info-card.component";
import { FooterComponent } from './footer.component';

// Our Pipes
import { VariablesPipe } from "src/pipes/variables.pipe";

@NgModule({
  imports: [
    CommonModule,

    CardModule,
    ButtonModule,
    SplitButtonModule,
    ToolbarModule,
    MenuModule,
    MessagesModule,
    MessageModule,
    ToastModule,
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    SitewideAlertComponent,
    UserAuthComponent,
    HomeComponent,
    InfoCardComponent,

    VariablesPipe,
  ]
})
export class RootModule { }

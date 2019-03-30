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
import { FooterComponent } from './footer.component';

// Our Pipes
import { VariablesPipe } from "./variables.pipe";

// Shared Modules
import { SharedInfoCardModule } from '../info-card/shared-info-card.module';

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

    SharedInfoCardModule,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    SitewideAlertComponent,
    UserAuthComponent,
    HomeComponent,

    VariablesPipe,
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    SitewideAlertComponent,
    UserAuthComponent,
    HomeComponent,

    VariablesPipe,
  ]
})
export class RootModule { }

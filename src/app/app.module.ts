import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoansComponent } from './loans/loans.component';

@NgModule({
  declarations: [
    AppComponent,
    LoansComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    NgbPaginationModule, 
    NgbAlertModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // For [(ngModel)]
import { HttpClientModule } from '@angular/common/http'; // For HTTP requests
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Required for Angular Material
import { MatTabsModule } from '@angular/material/tabs'; // Angular Material Tabs

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NewsComponent } from './news/news.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewsComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, // For two-way data binding
    HttpClientModule, // For HTTP requests
    BrowserAnimationsModule, // Required for Angular Material components
    MatTabsModule, // Material Tabs Module
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
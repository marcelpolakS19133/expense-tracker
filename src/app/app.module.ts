import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FeedComponent} from './feed/feed.component';
import {NewEntryFormComponent} from './new-entry-form/new-entry-form.component';
import {NavbarComponent} from './navbar/navbar.component';

import {HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login/login.component';
import {CsrfInterceptor} from './interceptors/csrf.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    NewEntryFormComponent,
    NavbarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientXsrfModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: CsrfInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}

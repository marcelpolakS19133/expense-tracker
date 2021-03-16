import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login/login.component';
import {FeedComponent} from './feed/feed.component';

const routes: Routes = [
  {path: 'feed', component: FeedComponent},
  {path: 'login', component: LoginComponent, data: {registering: false}},
  {path: 'register', component: LoginComponent, data: {registering: true}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

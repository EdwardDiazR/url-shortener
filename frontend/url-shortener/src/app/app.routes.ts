import { Routes } from '@angular/router';
import { FeedComponent } from './pages/user/feed/feed.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { NewLinkPageComponent } from './pages/links/new-link-page/new-link-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'feed', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: ':username', component: FeedComponent },
  { path: ':userId/profile', component: ProfileComponent },
  { path: ':userId/profile/links/new', component: NewLinkPageComponent },
];

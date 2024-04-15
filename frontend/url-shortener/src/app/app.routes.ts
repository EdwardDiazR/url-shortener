import { Routes } from '@angular/router';
import { FeedComponent } from './pages/user/feed/feed.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { NewLinkPageComponent } from './pages/links/new-link-page/new-link-page.component';
import { authGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { RedirectComponent } from './pages/url/redirect/redirect.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { loginGuard } from './guards/login/login.guard';
import { Type, inject } from '@angular/core';
import { userRedirectGuard } from './guards/redirect/user-redirect.guard';
import { AuthService } from './services/auth/auth.service';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: ':url',
    component: RedirectComponent,
    canActivate: [userRedirectGuard],
  },
  { path: 'auth/login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'user/:username', component: FeedComponent },
  {
    path: 'user/:username/profile',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  { path: ':username/profile/links/new', component: NewLinkPageComponent },
  { path: '**', component: PageNotFoundComponent },
];

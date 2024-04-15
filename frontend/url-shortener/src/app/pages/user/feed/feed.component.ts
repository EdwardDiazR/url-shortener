import { Component, HostListener, OnInit } from '@angular/core';
import { Link } from '../../../Models/link';
import { LinkItemComponent } from '../../../components/links/link-item/link-item.component';
import { ProfileCardComponent } from '../../../components/user/profile-card/profile-card.component';
import { LinksService } from '../../../services/links/links.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterLink,
} from '@angular/router';
import { DividerComponent } from '../../../components/divider/divider.component';
import { AuthService } from '../../../services/auth/auth.service';
import { NgClass } from '@angular/common';
import { BrandBannerComponent } from '../../../components/shared/brand-banner/brand-banner.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    LinkItemComponent,
    ProfileCardComponent,
    DividerComponent,
    NgClass,
    BrandBannerComponent,
    RouterLink,
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent implements OnInit {
  constructor(
    private _links: LinksService,
    private _authService: AuthService,
    private _route: ActivatedRoute
  ) {}

  links!: Link[];
  isProfileOwner!: boolean;
  username!: string;
  responseError!: string;

  isAuth!: boolean;
  isOnTop!: boolean;

  ngOnInit(): void {
    this.onScroll();
    this.username = this._route.snapshot.params['username'];
    this.getLinks();

    if (this._authService.CheckIsAuth()) {
      this.isAuth = true;
      this._authService.checkSession(this.username).subscribe({
        next: (res) => {
          this.isProfileOwner = res;
        },
      });
    } else {
      this.isAuth = false;
    }
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollPosition =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    console.log(scrollPosition);

    if (scrollPosition <= 50) {
      this.isOnTop = true;
    } else {
      this.isOnTop = false;
    }
  }
  getLinks() {
    if (this.username) {
      this._links.getUserLinks(this.username).subscribe({
        next: (res) => {
          this.links = res;
        },
        error: (e) => {
          this.responseError = e.error;
          console.log(e.error);
        },
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Link } from '../../../Models/link';
import { LinkItemComponent } from '../../../components/links/link-item/link-item.component';
import { ProfileCardComponent } from '../../../components/user/profile-card/profile-card.component';
import { LinksService } from '../../../services/links/links.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { DividerComponent } from '../../../components/divider/divider.component';
import { AuthService } from '../../../services/auth/auth.service';
import { NgClass } from '@angular/common';
import { BrandBannerComponent } from '../../../components/shared/brand-banner/brand-banner.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [LinkItemComponent, ProfileCardComponent, DividerComponent, NgClass,BrandBannerComponent],
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

  ngOnInit(): void {
    this.username = this._route.snapshot.params['username'];
    this.getLinks();

    if (localStorage.getItem('session')) {
      this._authService.checkSession(this.username).subscribe({
        next: (res) => {
          this.isProfileOwner = res;
        },
      });
    }
  }


  getLinks() {
    if (this.username) {
      this._links.getUserLinks(this.username).subscribe({
        next: (e) => (this.links = e),
        error: (e) => {
          this.responseError = e.error;
          console.log(e.error);
        },
      });
    }
  }
}

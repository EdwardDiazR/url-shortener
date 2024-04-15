import { Component, OnInit } from '@angular/core';
import { LinksService } from '../../../services/links/links.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  standalone: true,
  imports: [],
  templateUrl: './redirect.component.html',
  styleUrl: './redirect.component.scss',
})
export class RedirectComponent implements OnInit {
  constructor(
    private _linkService: LinksService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  url!: string;
  isRedirecting!: boolean;
  errorResponse!: string;

  ngOnInit(): void {
    this.url = this._route.snapshot.params['url'];
    console.log(this.url);

    switch (this.url) {
      case 'login':
        this.goToRoute('/auth/login');
        break;
      case 'register':
        this.goToRoute('auth/register');
        break;
      case 'user':
        this.goToRoute('user/not-found');
        break;
      case 'auth':
        this.goToRoute('/auth/login');
        break;

      default:
        this.isRedirecting = true;
        this._linkService.getLinkByUrlId(this.url).subscribe({
          next: (res) => {
            this.openUrl(res.url);
          },
          error: (error) => {
            this.isRedirecting = false;
            this.errorResponse = error.error;
          },
        });
    }
  }

  goToRoute(route: string) {
    this._router.navigateByUrl(route);
  }

  openUrl(url: string) {
    window.location.href = url;
  }
}

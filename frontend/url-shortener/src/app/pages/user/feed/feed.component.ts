import { Component, OnInit } from '@angular/core';
import { Link } from '../../../Models/link';
import { LinkItemComponent } from '../../../components/links/link-item/link-item.component';
import { ProfileCardComponent } from '../../../components/user/profile-card/profile-card.component';
import { LinksService } from '../../../services/links/links.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { DividerComponent } from '../../../components/divider/divider.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [LinkItemComponent, ProfileCardComponent,DividerComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent implements OnInit {
  constructor(private _links: LinksService) {}

  links!: Link[];

  getLinks() {
    this._links.getUserLinks(1).subscribe({ next: (e) => (this.links = e) });
  }

  ngOnInit(): void {
    this.getLinks();
  }
}

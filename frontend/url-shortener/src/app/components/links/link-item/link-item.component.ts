import { Component, Input } from '@angular/core';
import { Link } from '../../../Models/link';
import { LinksService } from '../../../services/links/links.service';

@Component({
  selector: 'app-link-item',
  standalone: true,
  imports: [],
  templateUrl: './link-item.component.html',
  styleUrl: './link-item.component.scss'
})
export class LinkItemComponent {

  constructor(private _linkService:LinksService){}

  @Input() Link!:Link

  goToUrl(url:string){
    this._linkService.visitLink(url);
  }

}

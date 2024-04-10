import { Component, Input } from '@angular/core';
import { Link } from '../../../Models/link';

@Component({
  selector: 'app-link-item',
  standalone: true,
  imports: [],
  templateUrl: './link-item.component.html',
  styleUrl: './link-item.component.scss'
})
export class LinkItemComponent {

  @Input() Link!:Link

}

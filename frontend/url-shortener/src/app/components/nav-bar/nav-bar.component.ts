import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NgClass,RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  @Input() isAuth!:boolean
 
}

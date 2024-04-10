import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'url-shortener';
  constructor(private _authService: AuthService) {}
  isAuth!: boolean;

  ngOnInit(): void {
    this._authService.isAuth.subscribe({
      next: (res) => {
        this.isAuth = res;
      },
    });
  }
}

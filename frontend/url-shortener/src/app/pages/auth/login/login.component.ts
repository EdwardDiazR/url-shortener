import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { LoginUserDto, User } from '../../../Models/user';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BrandBannerComponent } from '../../../components/shared/brand-banner/brand-banner.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, BrandBannerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private _authService: AuthService, private router: Router) {}

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  isFormSubmitted: boolean = false;
  loginApiResponse!: string;

  login() {
    this.isFormSubmitted = true;
    console.log(this.loginForm.status);

    if (this.loginForm.valid) {
      const loginDto: LoginUserDto = <LoginUserDto>{
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };

      this._authService.login(loginDto).subscribe({
        next: (res) => {
          console.log(res);

          const user = res as User;
          this._authService.createSession(user);
          this.router.navigate([`/user/${user.username}/profile`]);
        },
        error: (error) => {
          this.loginApiResponse = error.error;
          console.log(error.error);
        },
      });
    }
  }
}

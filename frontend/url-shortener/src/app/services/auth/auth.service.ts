import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { LoginUserDto, User } from '../../Models/user';
import { devenvironment } from '../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserSession } from '../../Models/user-session';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  private isAuthenticatedAndOwner!: boolean;
  constructor(
    private _http: HttpClient,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}

  isAuth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  API_BASE = `${devenvironment.API_BASE}/auth`;
  UserSession!: UserSession;
  isOwner!: BehaviorSubject<boolean>;

  ngOnInit(): void {}

  CheckIsAuth() {
    if (localStorage.getItem('session')) {
      this.isAuth.next(true);

      return true;
    }
    else{
      return false;
    }
  }

  login(loginDto: LoginUserDto) {
    return this._http.post<any>(this.API_BASE + '/login', loginDto);
  }

  register() {}

  createSession(user: User) {
    const userSession = <UserSession>{
      sessionId: '1',
      token: '1',
      userId: user.userId,
      username:user.username
    };

    localStorage.setItem('session', JSON.stringify(userSession));
  }

  checkSession(username: string) {
    const session = localStorage.getItem('session');

    if (session) {
      this.UserSession = JSON.parse(session) as UserSession;
    }
    const parametros = new HttpParams({
      fromObject: {
        username: username,
        UserId: this.UserSession.userId,
      },
    });
    return this._http.get<boolean>(this.API_BASE + '/check-session', {
      params: parametros,
    });
  }

  checkUser(username:string){
    const parametros = new HttpParams({
      fromObject: {
        parameter: username,
      },
    });
    return this._http.get<boolean>(this.API_BASE + '/is-user', {
      params: parametros,
    });
  }

  logout() {
    localStorage.removeItem('session');
    this._router.navigateByUrl('/login');
  }


}

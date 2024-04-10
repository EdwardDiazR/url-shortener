import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuth:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  CheckIsAuth(){
    this.isAuth.next(true)
  }


}

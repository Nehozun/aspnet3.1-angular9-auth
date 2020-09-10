import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user.model';
import { map } from 'rxjs/operators';
import { LoginRequestModel, RegisterRequestModel } from '../_models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = environment.apiUrl.concat('/identity', '/login');
  private registerUrl = environment.apiUrl.concat('/identity', '/register');

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(null);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(data: LoginRequestModel): Observable<any> {
    return this.http.post<any>(this.loginUrl, data).pipe(
      map((user) => {
        this.userSubject.next(user);
        return user;
      })
    );
  }

  register(data: RegisterRequestModel): Observable<any> {
    return this.http.post(this.registerUrl, data);
  }

  saveToken(token) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  getToken() {
    return localStorage.getItem('token');
  }

  refreshToken() {
      // to do
  }
}

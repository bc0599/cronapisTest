import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getUser(phone): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/api/get-route/'+ phone, this.httpOptions)
      .pipe(
        tap(_ => console.log(`User fetched: ${phone}`)),
        catchError(this.handleError<User[]>(`Get User phone=${phone}`))
      );
  }

  register(body:any)  {
    return this.http.post('http://localhost:3000/api/register', body, {
      observe:'body',
      headers:new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  login(body:any)  {
    return this.http.post('http://localhost:3000/api/login', body, {
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  home(){
    return this.http.get('http://localhost:3000/api/home', {
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type', 'application/json')
    });
  
  }

  logout(){
    return this.http.get('http://localhost:3000/api/logout', {
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}


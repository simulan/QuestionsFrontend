import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class TestService {
  private apiUrl = 'http://localhost:51059';
  private testUrl = '/api/tests';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  test(): Observable<String[]> {
    return this.http.get<String[]>(this.apiUrl + this.testUrl).pipe(
      tap(result => this.log('' + result)),
      catchError(this.handleError<String[]>('Test', []))
    );
  }
  // misc
  private log(message: string) {
    console.log('TestService: ' + message);
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

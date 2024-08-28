import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  retry,
  throwError,
} from 'rxjs';
import { RequestQuery } from '../models/query.model';
import { ResponseList } from '../models/response-list.model';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  constructor(private _httpClient: HttpClient) { }

  getOne<T>(id: String, url: string): Observable<T> {
    return this._httpClient.get<T>(`${this.getRuntimeUrl(url)}/${id}`).pipe(
      catchError((response) => {
        return throwError(() => response.error);
      })
    );
  }

  deleteOne<T>(id: String, url: string): Observable<T> {
    return this._httpClient.delete<T>(`${this.getRuntimeUrl(url)}/${id}`).pipe(
      catchError((response) => {
        return throwError(() => response.error);
      })
    );
  }

  getPaged<T>(query: RequestQuery, url: string): Observable<ResponseList<T>> {
    return this._httpClient
      .post<ResponseList<T>>(`${this.getRuntimeUrl(url)}`, query)
      .pipe(
        catchError((response) => {
          return throwError(() => response.error);
        })
      );
  }

  getAll<T>(url: string): Observable<T[]> {
    return this._httpClient.get<T[]>(`${this.getRuntimeUrl(url)}`).pipe(
      catchError((response) => {
        return throwError(() => response.error);
      })
    );
  }

  createItem<T>(data: any | FormData, url: string) {
    return this._httpClient.post<T>(`${this.getRuntimeUrl(url)}`, data).pipe(
      catchError((response) => {
        return throwError(() => response.error);
      })
    );
  }

  updateItem<T>(data: any | FormData, url: string) {
    return this._httpClient.put<T>(`${this.getRuntimeUrl(url)}`, data).pipe(
      catchError((response) => {
        return throwError(() => response.error);
      })
    );
  }

  private getRuntimeUrl(url: string) {
    return `${this.getBaseUrl()}/api/${url}`;
  }

  private getBaseUrl() {
    // TODO: check environment variables to choose what to use
    return 'http://localhost:5000';
  }
}

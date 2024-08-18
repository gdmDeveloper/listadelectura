import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookCollection, Library } from '../interfaces/book.interface';

@Injectable({providedIn: 'root'})
export class BookService {
  constructor(private http: HttpClient) { }

  private jsonUrl = 'http://localhost:3000/library'

  getBooks(): Observable<Library[]> {
    return this.http.get<Library[]>(`${this.jsonUrl}`)
  }

}

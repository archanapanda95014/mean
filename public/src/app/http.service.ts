import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getTasks() {
    return this._http.get('/tasks')
  }
  addAuthor(newAuthor) {
    return this._http.post('/new', newAuthor)
  }
  deleteAuthor(id){
    return this._http.post('/delete', {id})
  }
  findAuthorInService(id){
    return this._http.get('/find/' +id)
  }
  updateAuthorInService(user){
    return this._http.post('/update/' ,user)
  }
}

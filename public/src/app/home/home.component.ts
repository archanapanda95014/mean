import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  authors;
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getTasksFromService();
  }
  getTasksFromService() {
    let observable = this._httpService.getTasks();
    observable.subscribe(data => {
      for (var key in data) {
        console.log(data[key]);
        this.authors = data[key]
      }
    })
  }
  delete(id) {
    console.log(id)
    let observable = this._httpService.deleteAuthor(id);
    observable.subscribe(data => {
      console.log("Author deleted");
      console.log(data)
      this.getTasksFromService()
    })
  }
}

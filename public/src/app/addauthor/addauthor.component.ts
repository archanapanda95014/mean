import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-addauthor',
  templateUrl: './addauthor.component.html',
  styleUrls: ['./addauthor.component.css']
})
export class AddauthorComponent implements OnInit {
  // newAuthor = { userName: "" };
  newAuthor;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.getTasksFromService();
    this.newAuthor = { userName: "" }
  }
  getTasksFromService() {
    let observable = this._httpService.getTasks();
    observable.subscribe(data => {
    })
  }
  onSubmit() {
    let observable = this._httpService.addAuthor(this.newAuthor);
    observable.subscribe(data => {
      this.getTasksFromService();
      console.log("Author added")
    })
    // this.newAuthor = { userName: "" }
    this.goHome()
  }
  goHome() {
    this._router.navigate(['/home']);
  }
 
}

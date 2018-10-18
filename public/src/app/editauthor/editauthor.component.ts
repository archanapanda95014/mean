import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-editauthor',
  templateUrl: './editauthor.component.html',
  styleUrls: ['./editauthor.component.css']
})
export class EditauthorComponent implements OnInit {
  user = { userName: "" }
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log(params['id'])

      let observable = this._httpService.findAuthorInService(params['id']);
      observable.subscribe(data => {
        console.log(data['user'])
        this.user = data['user']
      })
    });
  }
  onSubmit2(user) {
    {
      let observable = this._httpService.updateAuthorInService(user);
      observable.subscribe(data => {
        console.log("Author updated")
        this.goHome()
      })
    }
    
  }
  goHome() {
    this._router.navigate(['/home']);
  }
}

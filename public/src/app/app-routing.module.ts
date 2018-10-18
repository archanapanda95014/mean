import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddauthorComponent } from './addauthor/addauthor.component';
import { EditauthorComponent } from './editauthor/editauthor.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: 'home',component: HomeComponent },
  { path: 'addauthor',component: AddauthorComponent },
  { path: 'editauthor/:id',component: EditauthorComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  // the ** will catch anything that did not match any of the above routes
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

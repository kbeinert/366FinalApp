import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesComponent } from './movie/movie.component';
import { MovieEditComponent } from './movie/movie-list/movie-edit/movie-edit.component';
import { MovieDetailComponent } from './movie/movie-detail/movie-detail.component';
const appRoutes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'movies', component: MoviesComponent, children: [
      {path: 'new', component: MovieEditComponent},
      {path: ':id', component: MovieDetailComponent },
      {path: ':id/edit', component: MovieEditComponent}
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
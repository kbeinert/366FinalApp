import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MovieComponent } from './movie/movie.component';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { MovieEditComponent } from './movie/movie-list/movie-edit/movie-edit.component';
import { MovieItemComponent } from './movie/movie-list/movie-item/movie-item.component';
import { MovieDetailComponent } from './movie/movie-detail/movie-detail.component';
import { MovieViewComponent } from './movie/movie-view/movie-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MovieComponent,
    MovieListComponent,
    MovieEditComponent,
    MovieItemComponent,
    MovieDetailComponent,
    MovieViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

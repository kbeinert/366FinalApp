import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MoviesComponent } from './movie/movie.component';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { MovieEditComponent } from './movie/movie-list/movie-edit/movie-edit.component';
import { MovieItemComponent } from './movie/movie-list/movie-item/movie-item.component';
import { MovieDetailComponent } from './movie/movie-detail/movie-detail.component';
import { WindRefService } from './wind-ref.service';
import { DropdownDirective } from './movie/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { MovieViewComponent } from './movie/movie-view/movie-view.component';
import { MovieService } from './movie/movie.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MoviesComponent,
    MovieListComponent,
    MovieEditComponent,
    MovieItemComponent,
    MovieDetailComponent,
    DropdownDirective,
    MovieViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule

  
  ],
  providers: [WindRefService,MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
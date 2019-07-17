import { Component, OnInit } from '@angular/core';
import { Movie } from './movie.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MoviesComponent implements OnInit {
  //selectedMovie: Movie;
  //movies: Movie[];
  //private subscription: Subscription
  
  constructor() { }

  ngOnInit() {
    // this.movieService.movieSelected
    //   .subscribe((movie: Movie) => {
    //     this.selectedMovie = movie;
    //   });
    // this.subscription = this.movieService.movieListChangedEvent
    //   .subscribe(
    //     (moviesList: Movie[]) => {
    //       this.movies = moviesList;
    //     }
    //   );
  }

  ngOnDestroy(): void{
    //this.subscription.unsubscribe();
  }
}

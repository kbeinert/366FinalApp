import { Component, OnInit, OnDestroy } from '@angular/core';
import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, OnDestroy {
  movies: Movie[] = [];
  private subscription: Subscription;
  
  constructor(private moviesService: MovieService) {  
  }

  ngOnInit() {
    this.moviesService.getMovies();
    this.subscription = this.moviesService.movieListChangedEvent
      .subscribe((movies: Movie[])=> {
        this.movies = movies;
      })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
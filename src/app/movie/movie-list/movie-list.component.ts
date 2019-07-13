import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  subscription: Subscription;
  
  constructor(private movieService: MovieService) {
  
  }

  ngOnInit() {
    this.movieService.getMovies();
    this.subscription = this.movieService.movieListChangedEvent
      .subscribe((movies: Movie[])=> {
        this.movies = movies;
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
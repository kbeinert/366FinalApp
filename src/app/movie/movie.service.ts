import { Injectable } from '@angular/core';
import { Movie } from './movie.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  movies: Movie[] = [];
  maxMovieId: number;
  movieSelected = new Subject<Movie>();
  movieListChangedEvent = new Subject<Movie[]>();
  moviesListClone: Movie[];

  getMovies() {
    this.http
    .get<Movie[]>('link to database')
    .subscribe((movies: Movie[]) => {
      this.movies = movies;
      this.maxMovieId = this.getMaxID();
      this.movies.sort(compareMoviesByID);
      this.movieListChangedEvent.next(this.movies.slice());
    }, (err: any) => {
      console.error(err);
    });
  }

  getMovie(id: string): Movie{
    for (var i = 0; i < this.movies.length; i++) {
      if (this.movies[i].id === id) {
        return this.movies[i];
      }
    }
    return null;
  }

  deleteMovie(movie: Movie) {
    if (movie === null) {
      return;
    }
    const pos = this.movies.indexOf(movie);
    if (pos < 0) {
      return;
    }
    this.movies.splice(pos, 1);
    this.moviesListClone = this.movies.slice();
    this.storeMovies();
    this.movieListChangedEvent.next(this.moviesListClone);
  }

  addMovie(newMovie: Movie) {
    if (newMovie == undefined || newMovie == null) {
      return
    }
    this.maxMovieId++
    newMovie.id = this.maxMovieId.toString();
    this.movies.push(newMovie);
    this.moviesListClone = this.movies.slice();
    this.storeMovies();
    this.movieListChangedEvent.next(this.moviesListClone);
  }

  updateMovie(originalMovie: Movie, newMovie: Movie) {
    if (originalMovie == null || originalMovie == undefined || newMovie == null || newMovie == undefined) {
      return;
    }

    var pos = this.movies.indexOf(originalMovie);
    if (pos < 0) {
      return;
    }
    
    newMovie.id = originalMovie.id;
    this.movies[pos] = newMovie;
    this.moviesListClone = this.movies.slice();
    this.storeMovies();
    this.movieListChangedEvent.next(this.moviesListClone);
  }

  getMaxID(): number {

    let maxID = 0;

    for (let movie of this.movies) {
      let currentID = +movie.id;
      if (currentID > maxID) {
        maxID = currentID;
      }
    }

    return maxID;
  }

  storeMovies() {
    let json = JSON.stringify(this.movies);
    let header = new HttpHeaders();
    header.set('Content-Type', 'application/json');
    this.http
    .put('link to database', json, {
      headers: header
    }).subscribe(() => {
      this.movieListChangedEvent.next(this.movies.slice());
    });
  }
}

  function compareMoviesByID(lhs: Movie, rhs: Movie): number {
    if (lhs.id < rhs.id) {
      return -1;
    } else if (lhs.id === rhs.id) {
      return 0;
    } else {
      return 1;
    }
  }
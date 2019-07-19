import { Injectable, EventEmitter } from '@angular/core';
import { Movie } from './movie.model';
import { Subject } from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse, HttpRequest} from "@angular/common/http";


@Injectable()
export class MovieService {
  movieSelectedEvent = new EventEmitter<Movie[]>();
  movieListChangedEvent = new Subject<Movie[]>();
  maxMovieId: number;
  movies: Movie[] = [];
 


  constructor(private http: HttpClient) { 
    this.maxMovieId = this.getMaxId();
    
  }

  storeMovies(movies: Movie[]) {
    const headers = new HttpHeaders ({'Content-Type': 'application/json'});
    
    this.http.put('http://localhost:3000/movies', movies, {headers: headers})
    .subscribe(
      (response: Response) => {
        this.movieListChangedEvent.next(movies.slice())
      }
    )
  }


  getMovies(): Movie[] {
    this.http.get<{message: String, movies: Movie[]}>('http://localhost:3000/movies')
      .subscribe(
        //success function
        (movieData) => {
          this.movies = movieData.movies;
          this.maxMovieId = this.getMaxId();
          this.movies.sort((a,b) => (a.name > b.name ) ? 1 : ((b.name > a.name) ? -1 : 0));
          this.movieListChangedEvent.next(this.movies.slice())
        });
    //error function
    (error: any) => {
      console.log(error);
    }
    return this.movies.slice();
  }

  getMovie(id: string): Movie {
    for(let movie of this.movies) {
      if (movie.id === id) {
        return movie;
      }
    }
    return null;
  }

  deleteMovie(movie: Movie) {
    if (movie === null || movie === undefined) {
      return;
    }

    this.http.delete('http://localhost:3000/movies/' + movie.id)
      .subscribe(
        (response: Response) => {
          this.getMovies();
  });

  }

  
  getMaxId(): number {
    let maxId = 0;
    for (let movie of this.movies){
      const currentId = +movie.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }


  addMovie(newMovie: Movie) {
    if (!newMovie) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
   

    this.http.post<{message: String, movie: Movie}>('http://localhost:3000/movies', newMovie, { headers: headers })
      .subscribe(
        (responseData) => {
          this.movies.push(responseData.movie);
          this.movies.sort((a,b) => (a.name > b.name ) ? 1 : ((b.name > a.name) ? -1 : 0));
          this.movieListChangedEvent.next(this.movies.slice());
        });
  }

  updateMovie(originalMovie: Movie, newMovie: Movie) {
    if (!originalMovie || !newMovie) {
      return;
    }

    const pos = this.movies.indexOf(originalMovie);
    if (pos < 0) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const strMovie = JSON.stringify(newMovie);

    this.http.put('http://localhost:3000/movies/' + originalMovie.id
      , strMovie
      , { headers: headers })
      .subscribe(
        (response: Response) => {
          this.movies[pos] = newMovie;
          this.movieListChangedEvent.next(this.movies.slice());
        });

        
  }

}
import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';
import { WindRefService } from 'src/app/wind-ref.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie;
  id: string;
  nativeWindow: any;

  constructor(private movieService: MovieService,
              private windowRefService: WindRefService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.movie = this.movieService.getMovie(this.id);
        });
    this.nativeWindow = this.windowRefService.getNativeWindow(); 
  }

  onEditMovie() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  onDelete() {
    this.movieService.deleteMovie(this.movie);
    this.router.navigate(['/movies'], {relativeTo: this.route});
  }

}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MovieService} from "../../movie.service";
import { Movie } from "../../movie.model";
import { NgForm } from "@angular/forms"; 

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
  id: string;
  editMode:boolean = false;
  movie: Movie;
  originalMovie: Movie;

  constructor(private movieService: MovieService,
              private  router: Router, 
              private route: ActivatedRoute) { }

  ngOnInit () {
    this.route.params
      .subscribe(
        (params: Params) => {
          const id = params.id;
          if (id == undefined || id == null) {
            return;
          }
          this.originalMovie = this.movieService.getMovie(id);
          if (this.originalMovie == undefined || this.originalMovie == null) {
            return;
          }

          this.editMode = true;
          this.movie = JSON.parse(JSON.stringify(this.originalMovie));
         }
      )
  }
            
  onSubmit(form: NgForm) {
    const values = form.value;
    console.log(values);
         
    var newMovie = new Movie(null, values.movieTitle, values.movieDescription, values.movieURL, null, null);
         
    if (this.editMode == true) {
      this.movieService.updateMovie(this.originalMovie, newMovie);
    } else {
      this.movieService.addMovie(newMovie);
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }
            
  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
import { Injectable } from '@angular/core';

@Injectable()
export class Movie {
    constructor(
      public id: string,
      public name: string,
      public description: string,
      public rating: string/*,
      public children: Movie[]*/) {
        
      }
  }

  export interface Post {
    id: string;
    name: string;
    description: string;
    rating: string;
  }
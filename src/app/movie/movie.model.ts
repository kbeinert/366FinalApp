import { Injectable } from '@angular/core';

@Injectable()
export class Movie {
    constructor(
      public id: string,
      public name: string,
      public description: string,
      public rating: string,
      public URL: string/*,
      public children: Movie[]*/) {
        
      }
  }
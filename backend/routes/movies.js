var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');

const Movie = require('../models/movies');

function returnError(res, error) {
  res.status(500).json({
    message: 'An error occurred',
    error: error
  });
}

router.get('/', (req, res, next) => {
  Movie.find()
    .then(movies => {
      res.status(200).json({
        message: 'Movies fetched successfully',
        movies: movies
      });
    })
    .catch(error => {
      returnError(res, error);
    });
  }
);

router.post('/', (req, res, next) => {
  const maxMovieId = sequenceGenerator.nextId("movies");
  console.log(maxMovieId);

  const movie = new Movie({
    id: maxMovieId,
    name: req.body.name,
    description: req.body.description,
    rating: req.body.rating
  });

  movie.save()
    .then(createdMovie => {
      res.status(201).json({
        message: 'Movie added successfully',
        movie: createdMovie
      });
    })
    .catch(error => {
      returnError(res, error);
    });
});

router.put('/:id', (req, res, next) => {
  Movie.findOne({ id: req.params.id })
    .then(movie => {
      movie.name = req.body.name;
      movie.description = req.body.description;
      movie.rating = req.body.rating;

      Movie.updateOne({ id: req.params.id }, movie)
        .then(result => {
          res.status(204).json({
            message: 'Movie updated successfully'})
        })
        .catch(error => {
          returnError(res, error);
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Movie not found.',
        error: { movie: 'Movie not found'}
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Movie.findOne({ id: req.params.id })
    .then(movie => {
      Movie.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({ message: "Movie deleted successfully" });
        })
        .catch(error => {
          returnError(res, error);
        })
    })
    .catch(error => {
      returnError(res, error);
    });
});

module.exports = router;
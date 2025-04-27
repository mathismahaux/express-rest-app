const express = require('express');
const app = express();
app.use(express.json());

const validateMovie = (req, res, next) => {
    if (!req.body.title || !req.body.genre || !req.body.year) {
        return res.status(400).send('Title, genre, and year are required');
    }
    next();
  };

const movies = [];

app.get('/movies', (req, res) => {
  res.json(movies);
  console.log(movies);
});

app.get('/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send('Movie not found');
  res.json(movie);
});

app.post('/movies', validateMovie, (req, res) => {
    const movie = {
      id: movies.length + 1,
      title: req.body.title,
      genre: req.body.genre,
      year: req.body.year
    };
    movies.push(movie);
    res.status(201).json(movie);
  });

app.put('/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send('Movie not found');

  movie.title = req.body.title;
  movie.genre = req.body.genre;
  movie.year = req.body.year;

  res.json(movie);
});

app.delete('/movies/:id', (req, res) => {
  const movieIndex = movies.findIndex(m => m.id === parseInt(req.params.id));
  if (movieIndex === -1) return res.status(404).send('Movie not found');

  const deletedMovie = movies.splice(movieIndex, 1);
  res.json(deletedMovie);
});

app.listen(8000, () => console.log('Server running on port 8000'));
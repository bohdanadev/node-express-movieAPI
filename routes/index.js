import express from 'express';

import { getCollection } from '../db.js';

const router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'TMDB' });
});

router.get('/most_popular', async (req, res, next)=>{
  const movies = await getCollection('moviesList');
    const results = await movies.find({most_popular: true}).toArray();
    res.json(results);
})

export const indexRouter = router;

import express from 'express';

import { getCollection } from '../db.js';
import { statusCodes } from '../constants/status-codes.constants.js';

const router = express.Router();

function requireJSON(req, res, next){
    if(!req.is('application/json')){
      res.json({msg:"Content type must be application/json"});
    }else{
      next();
    }
  };

  const movieDetails = await getCollection('movieDetails');
  const movies = await getCollection('moviesList');

  router.param(('movieId'),(req, res, next)=>{
    next();
  });

  router.get('/top_rated', async (req, res, next)=>{
    const results = await movies.find().sort({ vote_average: -1 }).toArray();
    res.json(results);
  });

  router.get('/:movieId', async (req, res, next)=> {
    const movieId = req.params.movieId;
    const movie = await movieDetails.findOne({id: +movieId});
    if(!movie) {
        res.json({
            msg: `Movie with ID ${movieId} is not found`,
            production_companies:[]
        });
    } else {
    res.json(movie);
    }
    });

    router.post('/:movieId/rating', requireJSON, async (req, res, next)=>{
        const movieId = req.params.movieId;
        const userRating = req.body.value;
        if((userRating < .5) || (userRating > 10)){
          res.json({msg: "Rating must be between .5 and 10"});
        }else{
          res.json({
            msg: "Thank you for submitting your rating.",
            status_code: statusCodes.OK
          })
        }
      });

    router.delete('/:movieId/rating', requireJSON, (req, res, next)=>{
        res.json({msg:"Rating deleted!"})
      });


export const movieRouter = router;
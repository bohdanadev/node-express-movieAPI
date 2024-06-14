import express from 'express';

import { getCollection } from '../db.js';


const router = express.Router();


function queryRequired(req, res, next){
    const searchTerm = req.query.query;
    if(!searchTerm){
      res.json({msg: "Query is required."})
    }else{
      next()
    }  
  };

router.use(queryRequired);


router.get('/movie', async (req, res, next)=>{
    const searchTerm = req.query.query;
    const collection = await getCollection('moviesList');
    await collection.createIndex({ overview: 'text', title: 'text' });
    const results = await collection.find({
      $text: { $search: searchTerm }
    }).toArray();

    res.json({results})
  });

  router.get('/person', async (req, res, next)=>{
    const searchTerm = req.query.query;
    const collection = await getCollection('people');
    await collection.createIndex({ name: 'text' });
    const results = await collection.find({
      $text: { $search: searchTerm }
    }).toArray();
    res.json({results})
  });
  

export const searchRouter = router;
import { MongoClient } from 'mongodb';
import { movies } from './data/movies.js';
import { movieDetails } from './data/movieDetails.js';
import { people } from './data/people.js';
import { config } from "./configs/config.js";

const url = config.MONGO_URL;
const client = new MongoClient(url);
const dbName = 'movies';

let db;

export async function connectToDatabase() {
  if (db) return db;
  await client.connect();
  console.log('Connected successfully to MongoDB server');
  db = client.db(dbName);
  return db;
}

export async function getCollection(collectionName) {
    const database = await connectToDatabase();
    return database.collection(collectionName);
  }
  
  export async function seedDatabase() {
    const database = await connectToDatabase();
  
    const moviesListCollection = database.collection('moviesList');
    await moviesListCollection.deleteMany({});
    await moviesListCollection.insertMany(movies);
  
    const movieDetailsCollection = database.collection('movieDetails');
    await movieDetailsCollection.deleteMany({});
    await movieDetailsCollection.insertMany(movieDetails);
  
    const peopleCollection = database.collection('people');
    await peopleCollection.deleteMany({});
    await peopleCollection.insertMany(people);
  
    console.log('Database seeded successfully');
  }
  
  export { client };
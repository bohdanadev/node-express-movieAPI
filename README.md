# NODE-EXPRESS-MOVIE-API

NODE-EXPRESS-MOVIE-API is a RESTful API built with Express and MongoDB. This API provides endpoints to find top-rated movies, most popular movies, details of a movie by its ID, set and delete movie ratings, search movies by keywords in a movie's overview or title, and search movies by favorite actors.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Get Most Popular Movies](#get-most-popular-movies)
  - [Get Top Rated Movies](#get-top-rated-movies)
  - [Get Movie Details](#get-movie-details)
  - [Set Movie Rating](#set-movie-rating)
  - [Delete Movie Rating](#delete-movie-rating)
  - [Search Movies by Keywords](#search-movies-by-keywords)
  - [Search Movies by Favorite Actors](#search-movies-by-favorite-actors)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bohdanadev/node-express-movieAPI.git
   cd node-express-movieAPI
   ```
   2. Install dependencies:
   ```bash
   npm install
   ```
   3. Set up environment variables 
   ```.env
    PORT=
    MONGO_URL=
    API_KEY=
    ```

   4. Start the server:
   ```bash
   nodemon
   ```

## Usage
Once the server is running, you can access the following API Endpoints adding api_key to query:

## API Endpoints

# **Get Most Popular Movies**  
**URL**: /most_popular  
**Method**: GET  
**Description**: Returns a list of the most popular movies.  


# **Get Top Rated Movies**  
**URL**: movie/top_rated  
**Method**: GET  
**Description**: Returns a list of top-rated movies sorted by their vote average.  


# **Get Movie Details**  
**URL**: movie/:movieId  
**Method**: GET  
**Description**: Returns the details of a movie by its ID.  
**Parameters:**    
movieId (required): The ID of the movie.  


# **Set Movie Rating**  
**URL**: /movie/:movieId/rating  
**Method**: POST  
**Description**: Sets a rating for a movie.  
**Parameters:**  
movieId (required): The ID of the movie.  
**Body:**  
rating (required): The rating to set.  


# **Delete Movie Rating**  
**URL**: /movie/:movieId/rating  
**Method**: DELETE  
**Description**: Deletes the rating for a movie.  
**Parameters:**  
movieId (required): The ID of the movie.  


# **Search Movies by Keywords**  
**URL**: /search/movie  
**Method**: GET  
**Description**: Searches for movies by keywords in the movie's overview or title.  
**Query Parameters:**  
query (required): The search term.  


# **Search Movies by Favorite Actors**  
**URL**: /search/person  
**Method**: GET  
**Description**: Searches for movies by favorite actors.  
**Query Parameters:**  
actor (required): The actor's name.  

import createError from 'http-errors';
import express from 'express';
import * as path from 'path';
import* as cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import { client, seedDatabase } from './db.js';
import{ indexRouter} from './routes/index.js';
import { movieRouter } from './routes/movie.js';
import { searchRouter } from './routes/search.js';
import { statusCodes } from './constants/status-codes.constants.js';
import { config } from './configs/config.js';

const __dirname = path.resolve();

const app = express();

app.use(helmet());
app.use(cors());

app.use((req, res, next)=>{
  if(req.query.api_key != config.API_KEY){
    res.status(statusCodes.UNAUTHORIZED);
    res.json("Invalid API Key");
  }else{
    next();
  }
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser.default());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/movie', movieRouter);
app.use('/search', searchRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(statusCodes.NOT_FOUND));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || statusCodes.INTERNAL_SERVER_ERROR);
  res.render('error');
});

async function main() {
  try{
  await seedDatabase();
} catch(e) {
  console.log(error);
}
};
main();

export default app;

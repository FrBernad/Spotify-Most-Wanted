const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('@webapp/controllers/index');
const usersRouter = require('@webapp/controllers/users');
const artistsRouter = require('@webapp/controllers/artists');
const songsRouter = require('@webapp/controllers/songs');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/artists', artistsRouter);
app.use('/api/songs', songsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(500);
  res.send(
    {
      status: 500,
      message: "error"
    }
  );
});

module.exports = app;

require('dotenv/config');
require('./db');
require('./config')(app);

const express = require('express');
const app = express();
const hbs = require('hbs');



//SET UP DB
const projectName = 'lab-movies-celebrities';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();
app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;



//MIDDLEWARE
hbs.registerHelper('checkDupe', function(movieCast, celebName) {
    let namesArray = [];
    movieCast.forEach(castMember => namesArray.push(castMember.name))
    if (namesArray.includes(celebName)) {return true}
}) 




//ROUTES
const index = require('./routes/index');
app.use('/', index);

const celebrities = require('./routes/celebrities.routes');
app.use('/celebrities', celebrities);

const movies = require('./routes/movies.routes');
app.use('/movies', movies);





//ERROR HANDLING
require('./error-handling')(app);



module.exports = app;

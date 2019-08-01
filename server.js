var express = require('express');
var request = require('request');
var app = express();
var swapi = require('./swapi');
var sort = require('./sorting_service');
var URL = 'https://swapi.co/api/'
var planetService = require("./planet_service.js")
var peopleService = require("./people_service.js")
var utilities = require("./format_json_service")

app.get('/people', function(req, res) {
  let sortByParam = req.query.sortBy;
  new Promise((resolve, reject) => {
    resolve(getPeople())
  })
  .then(response => {
    if (sortByParam != undefined) {
      response = sort.sortPeople(response, sortByParam)
    }
    res.send(response);
  })
  .catch(err => {
    console.log(err)
  })
});

async function getPeople() {
  var people = []
  let getPeoplePromise = new Promise((resolve, reject) => {
    swapi.getPeople(URL + 'people', [], resolve, reject)
  })
  .catch(err => {
    console.log(err)
  })
  people = await getPeoplePromise;
  return people
}

app.get('/planets', function(req, res) {
  new Promise((resolve, reject) => {
    resolve(getPlanets())
  })
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    console.log(err)
  })
});

async function getPlanets() {
  var people = await getPeople()
  let orderedPeopleList = sort.sortPeople(people, "url")
  var planets = []
  let getPlanetsPromise = new Promise((resolve, reject) => {
    swapi.getPlanets(URL + 'planets', [], resolve, reject)
  })
  .catch(err => {
    console.log(err)
  })
  planets = await getPlanetsPromise;
  utilities.formatPlanetJson(planets, orderedPeopleList)
  return planets
}

app.use(function(req, res, next) {
  res.status(404).send("That route doesn't exist.");
});

app.listen(3000, function () {
    console.log('Listening on port 3000.');
});
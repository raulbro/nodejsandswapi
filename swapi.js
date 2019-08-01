const axios = require('axios')

module.exports = {
  getPlanets: function (url, planets, resolve, reject) {
    axios.get(url)
    .then(response => {
      const allPlanets = planets.concat(response.data.results)
      if (response.data.next !== null) {
        this.getPlanets(response.data.next, allPlanets, resolve, reject)
      } else {
        resolve(allPlanets)
      }
    })
    .catch(error => {
      console.log(error)
      reject('Error.')
    })
  },
  getPeople: function (url, people, resolve, reject) {
    axios.get(url)
    .then(response => {
      const allPeople = people.concat(response.data.results)
      if (response.data.next !== null) {
        this.getPeople(response.data.next, allPeople, resolve, reject)
      } else {
        resolve(allPeople)
      }
    })
    .catch(error => {
      console.log(error)
      reject('Error.')
    })
  }
};
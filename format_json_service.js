module.exports = {
  formatPlanetJson: function (planets, people) {
    for (var i = 0; i < planets.length; i++) {
      var obj = planets[i];
      var residents = obj['residents']
      for (var e = 0; e < residents.length; e++) {
        var url = residents[e]
        var personNumber = (url.match(/(\d+)/g) || []);
        if(personNumber < 17) {
          residents[e] = people[personNumber - 1].name
        }
        else {
          residents[e] = people[personNumber - 2].name
        }
      }
    }
  }
};
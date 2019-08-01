module.exports = {
  sortPeople: function (people, property) {
    if(property == 'name' || property == 'url') {
      return people.sort(function(a,b) {
        aProperty = a[property]
        bProperty = b[property]
        if (property == 'url') {
          var aPersonNumber = (a.url.match(/(\d+)/g) || []);
          var bPersonNumber = (b.url.match(/(\d+)/g) || []);
          aProperty = parseInt(aPersonNumber)
          bProperty = parseInt(bPersonNumber)
        }
        if( aProperty > bProperty) {
          return 1;
        } else if( aProperty < bProperty || bProperty == 'unknown') {
          return -1;
        }
        return 0;
      });
    }
    return people.sort(function(a,b) {
      aP = a[property].replace(/,/g, "");
      bP = b[property].replace(/,/g, "");
      if( Number(aP) > Number(bP)) {
        return 1;
      } else if( Number(aP) < Number(bP) || bP == 'unknown') {
        return -1;
      }
      return 0;
    });
  }
}
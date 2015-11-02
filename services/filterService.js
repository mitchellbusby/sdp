angular.module('utsHelps.filter', [])
.service('Filter', function() {
  var scope = this;
  this.filterList = function(objectsWithName, query){
    var results = new Array();
    for (var i in objectsWithName) {
      var name = objectsWithName[i].name.toUpperCase();
      if (name.match(query.toUpperCase()) != null) {
        results.push(objectsWithName[i].value);
      }
    }
    return results;
  };

  this.transposeIntoNamed = function(objects, nameAttribute) {
    var results = new Array();
    for (var index in objects) {
      results.push( { name: objects[index][nameAttribute], value: objects[index] } );
    }
    return results;
  }
});

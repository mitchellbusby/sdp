angular.module('utsHelps.helpsSearchBar', [])
.directive('searchBar', ['$parse', function($parse) {
  return {
    templateUrl: "directives/search-bar/search-bar.html",
    restrict: 'E',
    link: function(scope, element, attrs) {
      var searchIn = $(element).find("#input"); // not fond of jquery
      var callbackFunction = $parse(attrs.callback);
      searchIn.on('keyup', function() {
        callbackFunction(scope, {query:searchIn[0].value});
      })
    },
  }
}]);

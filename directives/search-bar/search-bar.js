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
      });

      // send a blank query on load, so that we clear the filter when accessing page.
      setTimeout(function() { callbackFunction(scope, {query:""})}, 100);
    },
  }
}]);

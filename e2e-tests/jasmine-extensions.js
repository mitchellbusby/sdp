'use strict';

beforeEach( function () {

  // When beforeEach is called outside of a `describe` scope, the matchers are
  // available globally. See http://stackoverflow.com/a/11942151/508355

  this.addMatchers( {

    toBeAtLeast: function () {
      return {
        compare: function ( actual, expected ) {
          var result = {};
          result.pass = actual >= expected;
          if ( result.pass ) {
            result.message = "Expected " + actual + " to be less than " + expected;
          } else {
            result.message = "Expected " + actual + " to be at least " + expected;
          }
          return result;
        }
      };
    },

    toBeAtMost: function () {
      return {
        compare: function ( actual, expected ) {
          var result = {};
          result.pass = actual <= expected;
          if ( result.pass ) {
            result.message = "Expected " + actual + " to be greater than " + expected;
          } else {
            result.message = "Expected " + actual + " to be at most " + expected;
          }
          return result;
        }
      };
    }

  } );

} );
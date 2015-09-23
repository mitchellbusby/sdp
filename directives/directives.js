angular.module('utsHelps.directives', [])
.directive('uhActivityDetails', function() {
	return {
		templateUrl: "directives/activity-details/activity-details.html",
		restrict: 'E',
		scope: {
			activityDetails: '=activityDetails',
			expand: '=expand'
		}
	}
})
.directive('uhErrorBox', function() {
	return {
		templateUrl: "directives/uh-error-box/uh-error-box.html",
		restrict: 'E',
		scope: {
			errorMsg: '=errorMessage'
		}
	}
})
.directive('stopEvent', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.bind('click', function (e) {
                e.stopPropagation();
            });
        }
    };
 })
.directive('truncateText', function() {
	// Directive taken from http://www.ngroutes.com/questions/1b1749d/angularjs-create-more-tag-after-x-numbers-of-characters.html
	return {
		restrict: 'A',
		link: function(scope, elem, attrs) {
			var text = elem.context.innerText;
			elem.context.innerText = trunc(attrs.truncateText, text, true);
			elem.append('<a class="more-text" ng-click="expand();"> more...</a>');
			elem.on('click', function() {
				elem.context.innerText = $interpolate(text);
			});
			function trunc(n, text, useWordBoundary) {
				var toLong = text.length > n,
					s_ = toLong ? text.substr(0,n-1) : text;
				s_ = useWordBoundary && toLong ? s_.substr(0, s_.lastIndexOf(' ')) : s_;
				return s_;
			}
		}
	}
});
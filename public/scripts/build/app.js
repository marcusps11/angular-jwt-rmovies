var app = angular.module('moviesApp', ['movieModule']);

var movieModule = angular.module('movieModule', []);
movieModule.controller('movieCtrl', movieCtrl);

movieModule.$inject = ['$scope', 'movieService'];

function movieCtrl($scope, movieService) {

}

movieModule.factory('movieService', movieService);

movieService.$inject = ['$q', '$http'];

function movieService($q, $http) {
	return {
		getDataFromOmdb: function(movie) {
			var defer = $q.defer();

			$http({
				method:'GET',
				url: 'http://www.omdbapi.com/?s=' + movie,
			}).success(function(response) {
				defer.resolve(response);
			});
			return defer.promise;
		},

		getCastByMovieId: function(id) {
			var defer;

			defer = $q.defer();
			$http({
				method:'GET',
				url 	: 'http://www.omdbapi.com/?i=' + id,
			}).success(function(response) {
				defer.resolve(response);
			}).error(function(error) {
				console.log(error);
			});
			return defer.promise;
		}

	};
}

movieModule.directive('movieSearch', movieSearch);

movieModule.$inject = ['movieService'];

function movieSearch(movieService) {

	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'scripts/src/modules/movieSearch/template.html',
		link: function(scope, element, attrs, ctrls) {
			scope.onType = function() {
				if (scope.movieName) {
					movieService.getDataFromOmdb(scope.movieName).then(__onMoviesResponse);
				}
			};

			scope.getRelImage = function() {
				console.log('hello')
				return scope.movie && scope.movie.Poster ? scope.movie.Poster : 'assets/images/default.png'
			};

			function __onMoviesResponse(response) {
				if (response.Search && response.Search.length) {
					scope.movie = response.Search[0];
					movieService.getCastByMovieId(scope.movie.imdbID).then(__onCastResponse);
				}
			}

			function __onCastResponse(response) {
				console.log(response)

				scope.data = response;
				scope.data.cast = response && response.Actors && response.Actors.split(', ');

			}


		},
		scope: {}
	};
};


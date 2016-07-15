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


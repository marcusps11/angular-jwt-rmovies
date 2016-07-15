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

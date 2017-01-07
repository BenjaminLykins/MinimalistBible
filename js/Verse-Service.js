app.factory('verse', ['$http', '$q', function($http, $q) {
  return {
    getData: getData,
    getData3: getData3
  };

  var database = firebase.database();

  function getData(book, chap) {
    return firebase.database().ref('/Versions/NET/' + book + '/' + chap.toString() + '/').once('value');
  }

  function getData2(book, chap) {
    console.log(firebase.database().ref('/Versions/NET/' + book + "/" + chap));
  }

  function getData3(book, chap) {
    var defer = $q.defer();
    //console.log(book + " " + chap);
    var url = '//labs.bible.org/api/';
    $http({
      method: 'jsonp',
      url: url,
      data: {
        formatting: 'full',
        p: book + '+' + chap,
        callback: myfunction,
        type: 'json'
      }
    }).then(
      function(resp) {
        //console.log(resp.status);
        defer.resolve(resp);
      },
      function(err) {
        //response = {status: err.status, statusText: err.statusText};
        defer.reject(err);
      });
    return defer.promise;
  }
}]);

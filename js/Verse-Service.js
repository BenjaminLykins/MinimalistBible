app.factory('verse', ['$http', '$q', function($http, $q) {
 var server;
 return {
   getData: getData,
 };

 function myfunction(data){
   console.log(data.found);
 }

 function getData(book, chap){
   var defer = $q.defer();
   //console.log(book + " " + chap);
   var url = '//labs.bible.org/api/';
   $http({
     method: 'jsonp',
     url: url,
     data: {
         formatting: 'full',
         p: book+'+'+chap,
         callback: myfunction,
         type: 'json'
     }
   }).then(
     function (resp){
     //console.log(resp.status);
     defer.resolve(resp);
   },
   function(err){
     //response = {status: err.status, statusText: err.statusText};
     defer.reject(err);
   });
   return defer.promise;
 }
}]);

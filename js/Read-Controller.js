app.controller('Read-Controller', function($routeParams, verse, books, $sce, $location, $http, $cookies, $cookieStore){
  var vm = this;
  vm.getVerse = getVerse;
  vm.init = init;
  vm.next = next;
  vm.prev = prev;
  vm.passage = $sce.trustAsHtml("loading...");


  function init(){
    vm.book = $routeParams.book;
    vm.book.replace("%22", " ");
    console.log(vm.book);
    if(vm.book === 'auto'){
      var args = $cookies.getObject('cookie');
      vm.book = args.book;
      vm.chapter = args.chapter;
      $location.path('/read/'+vm.book+'/'+vm.chapter);
    }
    else{
      vm.chapter = parseInt($routeParams.chapter);
      $cookies.putObject('cookie', {book: vm.book, chapter: vm.chapter});
    }
    getVerse();
  }

  window.myfunction = function(data){
    console.log(data);
    //If the chapter doesn't exist
    if(data[0].chapter != vm.chapter){
      $location.path('/read/'+ (books.bookList[books.bookList.indexOf(vm.book) + 1]) +'/'+'1');
      return;
    }
    var tempHtml = "";
    for(var i = 0; i < data.length; i++){
      tempHtml = tempHtml.concat('<b>' + data[i].verse + '</b>' + ' ' + data[i].text + ' ');
    }
    //console.log(tempHtml);
    vm.passage = $sce.trustAsHtml(tempHtml);
  }

  function getVerse(){
    $http({
      method: 'jsonp',
      url: '//labs.bible.org/api/',
      params: {
        passage: vm.book + '+' + vm.chapter,
        formatting: 'para',
        type: 'json',
        callback: 'myfunction'
      }
    });
  }

  function next(){
    $location.path('/read/'+vm.book+'/'+(vm.chapter + 1));
  }
  function prev(){
    console.log(vm.chapter);
    if(vm.chapter === 1){
      $location.path('/read/'+ (books.bookList[books.bookList.indexOf(vm.book) - 1]) +'/'+'1');
    }
    else
      $location.path('/read/'+vm.book+'/'+(vm.chapter - 1));
  }

});

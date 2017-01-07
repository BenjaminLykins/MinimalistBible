app.controller('Read-Controller', function($routeParams, verse, books, $sce, $location, $http, $cookies, $cookieStore){
  var vm = this;
  vm.getVerse = getVerse;
  vm.init = init;
  vm.next = next;
  vm.prev = prev;
  vm.passage = $sce.trustAsHtml("loading...");

  function init(){

    //Used for ng-style
    vm.background = {
      'background': '#d8d8d8',
      'color': '#282828',
    };
    vm.p = {
      'font-size': '16px'
    };
    vm.big = {
      'font-size': '50px'
    };
    vm.optionButton = {
      'background': 'transparent',
      'color': 'black'
    }
    //End ng-style

    vm.settingsExpanded = 0;
    vm.backgroundColor = 'Gray';
    vm.textSize = 'Medium';
    vm.version = 'NET';

    //Gets and formats the book from the url
    vm.book = $routeParams.book;
    vm.book.replace("%22", " ");

    //console.log(vm.book);
    if(vm.book === 'auto'){
      var args = $cookies.getObject('cookie');
      console.log(args);
      if(args != undefined){
        vm.book = args.book;
        vm.chapter = args.chapter;
      }
      else{
        vm.book = 'Genisis';
        vm.chapter = 1;
      }

      $location.path('/read/'+vm.book+'/'+vm.chapter);
    }
    else{
      vm.chapter = parseInt($routeParams.chapter);
      $cookies.putObject('cookie', {book: vm.book, chapter: vm.chapter});
    }
    getVerse();
  }

  window.myfunction = function(data){
    //console.log(data);
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
    tempHtml = tempHtml.replace('&copy;NET', "");
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
    if( books.chapterList[books.bookList.indexOf(vm.book)] > vm.chapter ){
      $location.path('/read/'+vm.book+'/'+(vm.chapter + 1));
    }
    else{
      $location.path('/read/'+(books.bookList[books.bookList.indexOf(vm.book) + 1])+'/'+'1');
    }
  }
  function prev(){
    if(vm.chapter === 1){
      $location.path('/read/'+ (books.bookList[books.bookList.indexOf(vm.book) - 1]) +'/'+books.chapterList[books.bookList.indexOf(vm.book) - 1]);
    }
    else
      $location.path('/read/'+vm.book+'/'+(vm.chapter - 1));
  }

});

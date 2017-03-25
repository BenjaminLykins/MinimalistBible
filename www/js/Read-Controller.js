app.controller('Read-Controller', function($routeParams, verse, books, $sce, $location, $http, $cookies, $cookieStore, style, $scope){
  var vm = this;
  vm.getVerse = getVerse;
  vm.init = init;
  vm.next = next;
  vm.prev = prev;
  vm.changeBackground = changeBackground;
  vm.changeTextSize = changeTextSize;
  vm.toggleFullScreen = toggleFullScreen;
  vm.passage = $sce.trustAsHtml("loading...");

  vm.version = 'NET';

  $(".version-copyright").html("&copy; " + vm.version);

  String.prototype.replaceAll = function(str1, str2, ignore)
  {
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
  }

  function init(){
    //Start NG-Style setup
    vm.background = style.getBackground();
    vm.p = style.getP();
    vm.big = {
      'font-size': '50px'
    };
    vm.optionButton = {
      'background': 'transparent',
      'color': vm.background.color,
    }
    //End ng-style

    //Options variables
    vm.searchExpanded = 0;
    vm.settingsExpanded = 0;
    vm.version = 'NET';

    //Fullscreen variable
    //vm.fullScreen = 0;
    vm.fullScreen = style.getFullScreen();

    //START UI-SELECT BOOK SEARCH
    vm.bookList = [];
    for(var i = 0; i < books.bookList.length; i++){
      vm.bookList.push({'name': books.bookList[i]});
    }
    vm.bookSelected = "";
    vm.chapterList = [];
    vm.chapterSelected = "";
    //The on-change function called after selecting a book
    vm.countChapters = function(){
      vm.chapterList = [];
      console.log(vm.bookSelected.name);
      for(var i = 1; i <= books.chapterList[books.bookList.indexOf(vm.bookSelected.name)]; i++){
        vm.chapterList.push({value: i});
      }
    }
    //The on-change function for UI-SELECT
    vm.changeChapters = function(){
      $location.path('/read/'+vm.bookSelected.name+'/'+vm.chapterSelected.value);
    }
    //END UI-SELECT BOOK SEARCH


    //START GET AND FORMAT CHAPTER
    vm.book = $routeParams.book;
    vm.book.replace("%22", " ");

    if(vm.book === 'auto'){
      var args = $cookies.getObject('cookie');
      console.log(args);
      if(args != undefined){
        vm.book = args.book;
        vm.chapter = args.chapter;
      }
      else{
        vm.book = 'Genesis';
        vm.chapter = 1;
      }

      $location.path('/read/'+vm.book+'/'+vm.chapter);
    }
    else{
      vm.chapter = parseInt($routeParams.chapter);
      $cookies.putObject('cookie', {book: vm.book, chapter: vm.chapter});
    }
    //$(document).prop('title', vm.book + ' ' + vm.chapter);
    getVerse();
    //END GET AND FORMAT CHAPTER
  }

  function getVerse(){
    //var database = firebase.database();
    database = verse.database; //Gets the firebase database instance from the verse service
    return firebase.database().ref('/Versions/NET/' + vm.book + '/' + vm.chapter).once('value').then(function(snapshot) {
      var test = snapshot.val();
      vm.passage = $sce.trustAsHtml(test);
      $scope.$apply();
    });
  }

  //BUTTON FUNCTIONS
  function next(){
    if( books.chapterList[books.bookList.indexOf(vm.book)] > vm.chapter ){
      $location.path('/read/'+vm.book+'/'+(vm.chapter + 1));
      $scope.$apply();
    }
    else{
      $location.path('/read/'+(books.bookList[books.bookList.indexOf(vm.book) + 1])+'/'+'1');
      $scope.$apply();
    }
  }

  function prev(){
    if(vm.chapter === 1){
      $location.path('/read/'+ (books.bookList[books.bookList.indexOf(vm.book) - 1]) +'/'+books.chapterList[books.bookList.indexOf(vm.book) - 1]);
      $scope.$apply();
    }
    else
      $location.path('/read/'+vm.book+'/'+(vm.chapter - 1));
      $scope.$apply();
  }

  //Change options
  function changeBackground(name, background, color){
    vm.background = {
      'name': name,
      'background': background,
      'color': color,
    };
    vm.optionButton.color = vm.background.color;
    style.changeBackground(vm.background);
  }

  function changeTextSize(newName, newSize){
    vm.p = {
      'name': newName,
      'font-size': newSize
    }
    style.setP(vm.p);
  }

  //Toggle fullScreen
  function toggleFullScreen(){
    $(".navbar").slideToggle(0,"linear");
    $(".footer").slideToggle(0,"linear");
    vm.fullScreen = !vm.fullScreen;
    style.setFullScreen(vm.fullScreen);
  }

  $(document).keydown(function(e){
    if (e.keyCode == 37) {
     prev();
     return false;
    }

    if (e.keyCode == 39) {
      vm.next();
      return false;
    }
  });

  //END BUTTON FUNCTIONS

});

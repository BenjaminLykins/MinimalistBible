app.controller('Read-Controller', function($routeParams, verse, books, $sce, $location, $http, $cookies, $cookieStore, style){
  var vm = this;
  vm.getVerse = getVerse;
  vm.init = init;
  vm.next = next;
  vm.prev = prev;
  vm.changeBackground = changeBackground;
  vm.changeTextSize = changeTextSize;
  vm.toggleFullScreen = toggleFullScreen;
  vm.passage = $sce.trustAsHtml("loading...");

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
    vm.fullScreen = 0;

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
    getVerse();
    //END GET AND FORMAT CHAPTER
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

    //FORMAT THE HTML FOR NET API
    tempHtml = tempHtml.replace('&copy;NET', "");
    tempHtml = tempHtml.replaceAll('<b>', '');
    tempHtml = tempHtml.replaceAll('</b>', '');
    tempHtml = tempHtml.replaceAll('class="bodytext"', '');

    //WILL REPLACE PARAGRAPHS AROUND VERSE NUMBERS IF NEEDED
    // var re = new RegExp(/<p>(\d*)<\/p>/g);
    // var match = re.exec(tempHtml);
    // var i = 0;
    // while(true){
    //   match = re.exec(tempHtml);
    //   if(match == null){
    //     break;
    //   }
    //   tempHtml = tempHtml.replace(re, '$1');
    //   i++;
    //   if(i > 99){
    //     console.log("didn't work");
    //     break;
    //   }
    // }

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

  //BUTTON FUNCTIONS
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
    //
    // if(!vm.fullScreen){ //go to fullscreen
    //   $(".navbar").slideToggle();
    // }
    // else{ //exit fullscreen
    //
    // }
  }

  //END BUTTON FUNCTIONS

});

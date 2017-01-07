app.controller('Read-Controller', function($routeParams, $scope, style, verse, books, $sce, $location, $http, $cookies, $cookieStore) {
      var vm = this;
      //vm.getVerse = getVerse;
      vm.init = init;
      vm.next = next;
      vm.prev = prev;
      vm.passage = $sce.trustAsHtml("loading...");

      function init() {
        vm.background = {
          'background': 'linear-gradient(to bottom right, #C8C8C8 , #FFFFFF )',
          'color': '#282828',
        };
        vm.p = {
          'font-size': '16px'
        };
        vm.big = {
          'font-size': '50px'
        };

        vm.settingsExpanded = 0;
        vm.backgroundColor = 'Gray';
        vm.textSize = 'Medium';
        vm.version = 'NET';

        vm.book = $routeParams.book;
        vm.book.replace("%22", " ");

        console.log(vm.book);
        if (vm.book === 'auto') {
          var args = $cookies.getObject('cookie');
          console.log(args);
          if (args != undefined) {
            vm.book = args.book;
            vm.chapter = args.chapter;
          } else {
            vm.book = 'Genisis';
            vm.chapter = 1;
          }

          $location.path('/read/' + vm.book + '/' + vm.chapter);
        }

        else {
          vm.chapter = parseInt($routeParams.chapter);
          $cookies.putObject('cookie', {
            book: vm.book,
            chapter: vm.chapter
          });
        }

        document.title = vm.book + " " + vm.chapter;
        var text = "";

        //THIS IS THE PLACE WHERE IT WILL USE THE
        //   verse.getData(vm.book, vm.chapter).then(function(value){
        //     if(value.val() === 'null'){
        //       $location.path('/read/'+ (books.bookList[books.bookList.indexOf(vm.book) + 1]) +'/'+'1');
        //     }
        //     text = value.val();
        //     console.log(text);
        //     vm.passage = $sce.trustAsHtml(text);
        //     $scope.$apply();
        //   });
        //   //getVerse();
        // }

        function getVerse() {
          verse.getData3(vm.book, vm.chapter).then(function(value) {
            if (value.val() === 'null') {
              $location.path('/read/' + (books.bookList[books.bookList.indexOf(vm.book) + 1]) + '/' + '1');
            }

            text = value.val().join('');
            vm.passage = $sce.trustAsHtml(text);
            $scope.$apply();
          });
        }

        function next() {
          $location.path('/read/' + vm.book + '/' + (vm.chapter + 1));
        }

        function prev() {
          console.log(vm.chapter);
          if (vm.chapter === 1) {
            $location.path('/read/' + (books.bookList[books.bookList.indexOf(vm.book) - 1]) + '/' + '1');
          } else {
            $location.path('/read/' + vm.book + '/' + (vm.chapter - 1));
          }
        }
      });

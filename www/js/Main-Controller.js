app.controller('Main-Controller', function($routeParams, verse) {
   var vm = this;
   vm.print = print;

   vm.init = function(){
     document.title = "The Minimalist Bible";
   }

//Cycling text
  var divs = $('span[id^="content-"]').hide(),
    i = 0;
  (function cycle() {

      divs.eq(i).fadeIn(400)
                .delay(2000)
                .fadeOut(400, cycle);

      i = ++i % divs.length;

  })();

  function print(){
    console.log($routeParams.param);
  }


   vm.oldTest = [
    'Genesis',         'Exodus',          'Leviticus',     'Numbers',
    'Deuteronomy',     'Joshua',          'Judges',        'Ruth',
    '1 Samuel',        '2 Samuel',        '1 Kings',       '2 Kings',
    '1 Chronicles',    '2 Chronicles',    'Ezra',          'Nehemiah',
    'Esther',          'Job',             'Psalm',         'Proverbs',
    'Ecclesiastes',    'Song of Solomon', 'Isaiah',        'Jeremiah',
    'Lamentations',    'Ezekiel',         'Daniel',        'Hosea',
    'Joel',            'Amos',            'Obadiah',       'Jonah',
    'Micah',           'Nahum',           'Habakkuk',      'Zephaniah',
    'Haggai',          'Zechariah',       'Malachi'];

    vm.newTest = ['Matthew',
    'Mark',            'Luke',            'John',          'Acts',
    'Romans',          '1 Corinthians',   '2 Corinthians', 'Galatians',
    'Ephesians',       'Philippians',     'Colossians',    '1 Thessalonians',
    '2 Thessalonians', '1 Timothy',       '2 Timothy',     'Titus',
    'Philemon',        'Hebrews',         'James',         '1 Peter',
    '2 Peter',         '1 John',          '2 John',        '3 John',
    'Jude',            'Revelation'
];

//vm.cycle();

});

app.factory('style', [function() {

  var background = {
    name: 'Gray',
    background: '#d8d8d8',
    color: '#282828',
  };

  function changeBackground(newBackground){
    background = newBackground;
  }

  function getBackground(){
    return background;
  }

  return {
    changeBackground: changeBackground,
    getBackground: getBackground,
  };
}]);

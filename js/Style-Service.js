/*
  Service for keeping track of the styles accross pages

*/
app.factory('style', [function() {

  var background = {
    name: 'Gray',
    background: '#d8d8d8',
    color: '#282828',
  };

  var p = {
    'name': 'Medium',
    'font-size': '16px',
  };

  var fullScreen = 0;

  function changeBackground(newBackground){
    background = newBackground;
  }

  function getBackground(){
    return background;
  }

  function setP(newP){
    p = newP;
  }

  function getP(){
    return p;
  }

  function setFullScreen(newFullScreen){
    fullScreen = newFullScreen;
  }
  function getFullScreen(){
    return fullScreen;
  }

  return {
    changeBackground: changeBackground,
    getBackground: getBackground,
    setP: setP,
    getP: getP,
    setFullScreen: setFullScreen,
    getFullScreen: getFullScreen,
  };
}]);

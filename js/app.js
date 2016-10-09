var app = angular.module('LadyBot',[]);

app.controller('MainCtrl', function($scope){
  function updateTime(){
    var d = new Date();
    var hours = (d.getHours()-1)%12 + 1;
    var minutes = (d.getMinutes());
    if(minutes < 10){
      minutes = "0" + minutes;
    }
    var ampm = (d.getHours() > 12) ? "PM" : "AM"; 
    $scope.time = hours + ":" + minutes + " " + ampm;
  }
  updateTime();
  setInterval(updateTime, 10000)
});
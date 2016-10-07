var app = angular.module('LadyBot',[]);

app.controller('MainCtrl', function($scope){
  function updateTime(){
    var d = new Date();
    var time = d.getHours()%12 + ":" + d.getMinutes() + " ";
    if(d.getHours() > 12){
      time += "PM";
    }else{
      time += "AM";
    }
    $scope.time = time;
  }
  updateTime();
  setInterval(updateTime, 10000)
});
var app = angular.module('LadyBot',[]);

app.controller('MainCtrl', function($scope){
  $scope.messages = [];
  $scope.text = "";
  $scope.enter = function(event){
    if(event.which === 13 && $scope.text){
      event.preventDefault();
      $scope.messages.push({content: $scope.text, side: 'right'});
      console.log($scope.messages);
      $scope.text="";
    }
  };

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
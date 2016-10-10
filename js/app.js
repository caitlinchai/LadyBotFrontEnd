var app = angular.module('LadyBot',[]);

app.controller('MainCtrl', function($scope, $timeout, $http){
  $scope.messages = [{content: "Hi! What's up? :)", side: "left"}];
  $scope.text = "";
  $scope.send = send;

  $scope.enter = function(event){
    if(event.which === 13){
      event.preventDefault();
      send();
    }
  };

  function send(){

    if(!$scope.text){
      return;
    }

    $scope.messages.push({content: $scope.text, side: "right"});

    $http({
      method:"GET",
      url:"http://localhost:3000/receive",
      params: {message: $scope.text}
    }).then(function success(response){
      $scope.messages.push({content: response.data, side: "left"});
      scrollToBottom();
    }, function myError(response){
      $scope.messages.push({content:"Brb.", side:"left"});
      scrollToBottom();
    });

    $scope.text="";
    scrollToBottom();
  }

  function scrollToBottom(){
    $timeout(function(){
      var scroller = document.getElementById("msg_scroller");
      scroller.scrollTop = scroller.scrollHeight;
    }, 0, false);
  }

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
  setInterval(updateTime, 10000);
});
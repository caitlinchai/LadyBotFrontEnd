var app = angular.module('LadyBot',[]);

app.controller('MainCtrl', function($scope, $timeout, $http){
  updateTime();
  setInterval(updateTime, 10000);

  $scope.messages = [];
  $scope.text = "";
  $scope.send = send;
  $timeout(firstMsg, 2000);


  function updateTime(){
    var d = new Date();
    var hours = (d.getHours()+11)%12 + 1;
    var minutes = (d.getMinutes());
    if(minutes < 10){
      minutes = "0" + minutes;
    }
    var ampm = (d.getHours() > 12) ? "PM" : "AM"; 
    $scope.time = hours + ":" + minutes + " " + ampm;
  }
  
  function firstMsg(){
    $scope.messages.push({content: "Hi! What's up? :)", side: "left"});
  }
  
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

    $scope.messages.push({
      content: $scope.text, 
      side: "right"
    });

    $http({
      method:"GET",
      url:"http://localhost:3000/receive",
      params: {message: $scope.text}
    }).then(function success(response){
      var message = getMessage(response.data);
      $scope.messages.push(message);
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

  function getMessage(str){
    var link_index = str.indexOf('http');
    if(link_index > -1){
      var link = str.substring(link_index, str.length);
      var content = str.substring(0, link_index);
      return {content: content, side: "left", link: link};
    }else{
      return {content: str, side:"left"};
    }
  }
});
angular.module('apotd.services', [])

.service('DayService', function($http) {
  var that = this;
  var currentDay = {};
  var current = Date.now();
  var days = {};
  var recents = [];
  var url = "https://api.nasa.gov/planetary/apod?api_key=x89BUmPE1MVJoTFXqQ9JAzCFScdS2nw5ZCnWpn8n&format=JSON&concept_tags=True&date=";
  this.getCurrentDay = function() {
    return currentDay;
  };
  this.addDay = function(date) {
    return $http.get(url + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate())
    .then(function(response) {
      response.data['date'] = formattedTime(date);
      response.data['utc'] = date.getTime();
      days[formattedTime(date)] = response.data;
      if (!checkDate(date,new Date())) {
        recents.push(response.data);
      }
    }, function(response) {
      console.error(response.status);
    });
  };
  this.setDay = function(date) {
    current = date.getTime();
    var good = false;
    for (var obj in days) {
      if (checkDate((new Date(days[obj].utc)),date)) {
        good = true;
        break;
      }
    }
    if (!good) {
      return that.addDay(date).then(function() {
        currentDay = days[formattedTime(date)];
      });
    } else {
      var p = new Promise(function(resolve,reject) {
        currentDay = days[formattedTime(date)];
        resolve(0);
      });
      return p;
    }
  };
  this.recentDates = function() {
    return recents;
  };

  // internal function for checking date
  checkDate = function(a,b) {
    return a.getDate() === b.getDate() &&
      a.getMonth() === b.getMonth() &&
      a.getFullYear() === b.getFullYear();
  };

  formattedTime = function(date) {
    return date.getFullYear() + "" + (date.getMonth() + 1) + "" + date.getDate();
  }
})

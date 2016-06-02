anguWeather.controller('mainController', ['$scope', 'wCity', '$http', function($scope, wCity, $http) {
    $scope.city = wCity.city;
    
// watch for any changes to the search input and store it into $scope.city
    
    $scope.$watch('city', function() {
        wCity.city = $scope.city;
    });
     
     $scope.saved = localStorage.getItem('searches');
    $scope.searches = (localStorage.getItem('searches')!== null) ? JSON.parse($scope.saved) : [];
    localStorage.setItem('searches', JSON.stringify($scope.searches));
    
    
    $scope.getLocation = function() {
//Store Search in local storage
        $scope.searches.push($scope.city);
        localStorage.setItem('searches', JSON.stringify($scope.searches));
//use the $http service to get weather data from the API
        $http.get("http://api.openweathermap.org/data/2.5/weather?q=" + $scope.city + "&appid=2e69817c9169fa74fe8e310196b43ea2")
            .then(function(response) {
                $scope.myData = response;
                console.log(response);
        }, function(response) {
                $scope.myData = "Oops";
        });
    };
 
// function to convert the date format    

    $scope.convertToDate = function(dt) {
        if (dt == null) return;
        return new Date(dt * 1000);
        
    };
    
// function to convert the Fahrenheit to Celsius 
    
    $scope.convertToCelsius = function(temp) {
        if (temp == null) return;
        return Math.round(temp - 273.15) + "\xBAC";
        
    };
    
// function to convert wind speed from meters per second to KPH
    
    $scope.convertToKPH = function(wind) {
        if (wind == null) return;
        return "Wind: " + Math.round(wind * 3.6) + " KPH";
    };

}]);
    
anguWeather.controller('forecastController', ['$scope', 'wCity', '$resource', function($scope, wCity, $resource) {
    
        $scope.city = wCity.city;
    
        $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});
        
        $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt: 5, appid: "2e69817c9169fa74fe8e310196b43ea2"});
    
    console.log($scope.weatherResult);
    
// function to convert the date format    

    $scope.convertToDate = function(dt) {
        if (dt == null) return;
        return new Date(dt * 1000);
        
    }
    
// function to convert the Fahrenheit to Celsius 
    
    $scope.convertToCelsius = function(temp) {
        if (temp == null) return;
        return Math.round(temp - 273.15) + "\xBAC";
        
    };   
}]);

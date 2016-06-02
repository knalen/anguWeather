//ROUTES

anguWeather.config(function ($routeProvider) {
    
    $routeProvider
        .when('/', {
            templateUrl: 'pages/main.htm',
            controller: 'mainController'
        
    })
        .when('/forecast', {
            templateUrl: 'pages/forecast.htm',
            controller: 'forecastController'
    });
    
})
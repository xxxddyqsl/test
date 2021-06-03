var app=angular.module('ngRouteExample', ['ngRoute']);
app.controller('AboutController',['$scope',function ($scope, $route) { $scope.$route = $route;}]);
app.config(function ($routeProvider) {
  $routeProvider
  .when('/',{
      templateUrl: '../angular-路由/home.html',
    })
  .when('/about',{
       templateUrl: 'embedded.about.html',
        controller: 'AboutController'
    })
  .otherwise({redirectTo:'/'});

});
app.controller('myCtrl',['$scope',function($scope){
    this.home='Home'; 
    this.about='About';
    this.hometext='我是路由引入====》》》home-首页====>点击弹窗';
//     this.aaa = function aaa(title) {
//         return alert(title);
//       };
    $scope.aaa=function(){
        alert(111)
    }
 }]);
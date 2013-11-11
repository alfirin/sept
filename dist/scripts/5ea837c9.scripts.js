"use strict";angular.module("septWebRadioApp",["ngRoute","septWebRadioControllers","ui.bootstrap"]),angular.module("septWebRadioApp").config(["$routeProvider","$locationProvider",function($routeProvider,$locationProvider){$routeProvider.when("/index",{templateUrl:"views/main/main.html",controller:"MainCtrl"}).when("/stage",{templateUrl:"views/stage/stage.html",controller:"StageCtrl"}).when("/replay",{templateUrl:"views/replay/replay.html",controller:"ReplayCtrl"}).when("/topical",{templateUrl:"views/topical/topical.html",controller:"TopicalCtrl"}).when("/door",{templateUrl:"views/door/door.html",controller:"DoorCtrl"}).when("/backstage",{templateUrl:"views/backstage/backstage.html",controller:"BackstageCtrl"}).otherwise({redirectTo:"/index"}),$locationProvider.html5Mode(!0)}]),angular.module("septWebRadioServices",[]),angular.module("septWebRadioServices").service("initApplication",["$http",function($http){this.getInitApplication=function(){return $http.get("init_application").then(function(result){return result.data})}}]).service("deezerSearch",["$http","$q","limitToFilter",function($http,$q,limitToFilter){this.autoCompleteSearch=function($search){var deferred=$q.defer();DZ.api("/search/autocomplete?q="+$search,function(response){var tracks=limitToFilter(response.tracks.data,5);deferred.resolve(tracks)});var promise=deferred.promise;return promise.then(function(response){return response}),promise}}]),angular.module("septWebRadioControllers",["septWebRadioServices"]),angular.module("septWebRadioControllers").controller("MainCtrl",["$scope","initApplication",function($scope,initApplication){function updateUserStatus(response){switch(response.status){case"connected":$scope.connexionButtonLabel="Log Out",response.authResponse?($scope.deezerSession=response,DZ.api("/user/me",function(response){$scope.deezerUser=response,$scope.$apply()})):authorizeCurrentUser();break;case"not_authorized":authorizeCurrentUser();break;case"notConnected":case"unknown":initSession();break;default:initSession()}}function authorizeCurrentUser(){$scope.connexionButtonLabel="Authorize",$scope.deezerSession=null,$scope.deezerUser=null,$scope.$apply()}function initSession(){$scope.connexionButtonLabel="Log In",$scope.deezerSession=null,$scope.deezerUser=null,$scope.$apply()}$scope.connexionButtonLabel="Log In",initApplication.getInitApplication().then(function(data){DZ.init({appId:data.appId,channelUrl:data.url}),DZ.getLoginStatus(function(response){updateUserStatus(response),$scope.$apply()})}),$scope.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],$scope.logInClick=function(){$scope.deezerSession?(DZ.logout(),initSession()):DZ.login(function(response){updateUserStatus(response)},{perms:"basic_access,email,manage_library,delete_library"})}}]),angular.module("septWebRadioControllers").controller("StageCtrl",["$scope","$http","deezerSearch",function($scope,$http,deezerSearch){$scope.title="Stage",$scope.isSearching=!1,$scope.search=void 0,$scope.selectedItem=void 0,$scope.searches=function($search){return deezerSearch.autoCompleteSearch($search).then(function(response){return response})},$scope.onSelectSearch=function($item){$scope.selectedItem=$item}}]),angular.module("septWebRadioControllers").controller("ReplayCtrl",["$scope",function($scope){$scope.title="Replay"}]),angular.module("septWebRadioControllers").controller("TopicalCtrl",["$scope",function($scope){$scope.title="Topical"}]),angular.module("septWebRadioControllers").controller("DoorCtrl",["$scope",function($scope){$scope.title="Door"}]),angular.module("septWebRadioControllers").controller("BackstageCtrl",["$scope",function($scope){$scope.title="Back Stage"}]);
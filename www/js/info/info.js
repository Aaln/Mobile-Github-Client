angular.module('info', [])

.controller('infoCtrl', function($scope, $http, $rootScope, $state, $ionicLoading, githubservice) {
  $scope.search = function() {
    $state.go('search')
  }

  $scope.personalwebsite = function() {
    var ref = window.open('http://jackhanford.com', '_system');
  }

  $scope.mit = function() {
    var ref = window.open('http://opensource.org/licenses/MIT', '_system');
  }

  $scope.alias = $rootScope.authlogin;


  if ($rootScope.access_token) {
    $scope.authenticated = 'Yes'
  } else {
    $scope.authenticated = 'No'
  }

  $scope.removeAuth = function(OAuth) {
  	$rootScope.access_token = '';
  	$scope.authenticated = 'No'
  	window.OAuth.clearCache();
  }

  $scope.newAuth = function() {
    OAuth.initialize('DhJ5nGr1cd7KBlGv47FUpYq5goo');
    OAuth.popup('github', {
      cache: true
    }).done(function(result) {
      result.me()
      .done(function(user_info) {
        console.log(user_info)
        if (user_info.name) {
          $rootScope.authname = user_info.name;
          $rootScope.authlogin = user_info.alias;
        } else {
          $rootScope.authname = user_info.alias;
          $rootScope.authlogin = user_info.alias;
        }
        $rootScope.access_token = result.access_token
      })
    }).fail(function(error) {
      alert('Error authenticating!')
    })
  }

  $scope.rate = false;

  githubservice.getRate().then(function(response) {
    $scope.rate = true;
    $scope.ratelimit = response.rate.remaining;
  })
})

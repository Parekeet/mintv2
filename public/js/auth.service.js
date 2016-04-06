(function() {
  "use strict";

  angular
    .module("app")
    .factory("authService", authService)

    authService.$inject = ["$log", "tokenService", "$http"];

    function authService($log, token, $http) {
      $log.info("auth service loaded!");

      var service = {
        logIn:        logIn,
        isLoggedIn:   isLoggedIn,
        logOut:       logOut,
        currentUser:  currentUser,
        refreshToken: refreshToken
      };
      return service;

      function refreshToken() {
        var promise = $http({
          method: 'POST',
          url:    '/api/users/me/token',
          data:   {},
          headers: {
            'Authorization': 'Bearer ' + token.retrieve(),
            'Content-Type':  'application/json'
          }
        })
        .then(function(res) {
          token.store(res.data.token);
          return token.decode();
        });

        return promise;
      }

      function currentUser() {
        var tokenData = token.decode();

        tokenData.expiresAt = Date(tokenData.exp);

        delete tokenData.exp;
        delete tokenData.iat;

        return tokenData;
      }

      function logOut() {
        token.destroy();
        $log.info("Logged out…");
      }

      function isLoggedIn() {
        return (token.retrieve() != null);
      }

      function logIn(data) {
        var promise = $http({
          method: 'POST',
          url:    'api/tokens',
          data:   data,
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(function(res) {
          $log.info("yo, it made it!", res.data);
          token.store(res.data);
          return token.decode();
        }, function(err) {
          $log.info(err);
        });
        // $log.info(promise);
        return promise;
      }
    }

  })();

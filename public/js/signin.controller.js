(function() {
  "use strict";

  angular
    .module("app")
    .controller("SigninController", SigninController);

  SigninController.$inject = ["$log", "authService", "userService", "$state"];

  function SigninController($log, authService, userService, $state) {
    var vm = this;

    // BINDINGS
    vm.signUp = {
      email:    "pj@ga.co",
      name:     "Philip Hughes",
      password: "12345",
      passwordConfirmation: "12345"
    };
    vm.submitSignUp = submitSignUp;
    vm.logIn = {
      email:    "pj@ga.co",
      password: "12345"
    };
    vm.submitLogIn = submitLogIn;
    vm.conflict = false;

    // FUNCTIONS
    function submitSignUp() {
      userService
        .create(vm.signUp)
        .then(function(res) {
          return authService.logIn(vm.signUp);
        })
        .then(
          // on success
          function(decodedToken) {
            $log.info('Logged in!', decodedToken);
            $state.go('home');
          },
          // on error
          function(err) {
            if (err.status === 409) vm.conflict = true;
            $log.info('Error in the signin controller!:', err);
          }
        );
    }

    function submitLogIn() {
      authService.logIn(vm.logIn)
        .then(// on success
          function(decodedToken) {
            $log.info('Logged in!', decodedToken);
            $state.go('home');
          }, // on error
          function(err) {
            $log.info('Error:', err);
          });
    }

    $log.info("SignInController loaded!");
  }
})();
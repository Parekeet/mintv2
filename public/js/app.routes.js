(function() {
  'use strict';

  angular
    .module("app")
    .config(appRoutes);

  appRoutes.$inject = ["$stateProvider", "$urlRouterProvider"];

  function appRoutes ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("home", {
        url: "/",
        templateUrl: "/js/templates/home.html"
      })
      .state("about", {
        url: "/about",
        templateUrl: "/js/templates/about.html"
      })
      .state("menu", {
        url: "/menu",
        templateUrl: "/js/templates/menu.html"
      })
      .state("contact", {
        url: "/contact",
        templateUrl: "/js/templates/contact.html"
      })
      .state("signin", {
        url: "/signin",
        templateUrl: "/js/templates/signin.html"
      });

      $urlRouterProvider.otherwise("/");
  }

})();

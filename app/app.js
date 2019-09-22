(function(angular) {
    'use strict';

    var app = angular.module('app', ['ui.router', 'ngTagsInput', 'toaster', 'ngAnimate', 'oc.lazyLoad']);
    
    app.controller('apptoaster', apptoaster);
    apptoaster.$inject = ['$scope', 'toaster'];
    function apptoaster($scope, toaster) {}
})(window.angular);

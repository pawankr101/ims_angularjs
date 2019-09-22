(function(angular) {
    'use strict';

    angular.module('app').controller('headerController', headerController);
    headerController.$inject = ['$scope', '$rootScope'];

    function headerController($scope, $rootScope) {
        $scope.heading = 'INVENTORY MANAGEMENT';
    }

})(window.angular);
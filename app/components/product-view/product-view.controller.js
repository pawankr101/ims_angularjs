(function() {
    'use strict';

    angular.module('app').controller('productsViewController', productsViewController);
    productsViewController.$inject = ['$scope', 'productViewService'];

    function productsViewController($scope, productViewService) {
        
        $scope.productInventory = [];

        getProductInventryData();

        function getProductInventryData() {
            productViewService.getProductInventry()
            .then(function(re) {
                $scope.productInventory = re;
            });
        }
    }
})();
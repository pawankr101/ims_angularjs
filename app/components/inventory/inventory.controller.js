(function() {
    'use strict';

    angular.module('app').controller('inventoryController', inventoryController);

    inventoryController.$inject = ['$scope', 'inventoryService', '$state', 'toaster'];
    function inventoryController($scope, inventoryService, $state, toaster) {
        
        $scope.productVariants = [];
        $scope.selectedVariant = {};

        getVariantData();
        
        function getVariantData() {
            inventoryService.getAllVariantData()
            .then(function(res) {
                $scope.productVariants = res;
            });
        }

        $scope.selectProduct = function(productId) {
            productId = parseInt(productId);
            $scope.selectedVariant = _.find($scope.productVariants, function(o){
                return o.ProductId == productId;
            });
        };

        $scope.updateVariant = function() {
            inventoryService.updateVariant($scope.selectedVariant)
            .then(function(res) {
                $scope.productVariants = res;
                toaster.pop({
                    type: 'success',
                    title: 'Inventory Updated',
                    showCloseButton: true,
                });
                $scope.selectProduct($scope.selectedVariant.ProductId);
            });
        };

        $scope.resetVariant = function(productId) {
            _.forEach($scope.selectedVariant.VariantArray, function(o) {
                o.Price = null;
                o.Stock = null;
                o.isDefault = 'false';
            });
            toaster.pop({
                type: 'success',
                title: 'Reset Done',
                showCloseButton: true,
            });
        };

        $scope.setDefault = function(variantId) {
            _.forEach($scope.selectedVariant.VariantArray, function(o) {
                if(o.VariantId == variantId) {
                    o.isDefault = 'true';
                } else {
                    o.isDefault = 'false';
                }
            });
        };

        $scope.onCancel = function() {
            $state.go('app.products');
        };
    }
})();
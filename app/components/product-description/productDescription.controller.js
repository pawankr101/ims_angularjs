(function() {
    'use strict';

    angular.module('app').controller('productDescriptionController', productDescriptionController);
    productDescriptionController.$inject = ['$scope', 'productDescriptionService', '$stateParams', '$state', 'toaster'];

    function productDescriptionController($scope, productDescriptionService, $stateParams, $state, toaster) {
        $scope.productDetail = {};
        $scope.productIdd = parseInt($stateParams.productidd);
        $scope.selectedProduct = {
            ProductId: $scope.productIdd,
            VariantId: null,
            Price: null,
            Stock: null
        };
        $scope.txt = [];
        $scope.activeButton = 'false';

        getProductDetail();

        function getProductDetail() {
            productDescriptionService.getProductsDetail($scope.productIdd)
            .then(function(res) {
                $scope.productDetail = res;
                var obj = _.find($scope.productDetail.VariantArray, function(o) {
                    return o.isDefault == 'true';
                });
                var comb = obj.VariantCombination;
                $scope.txt = comb.split('/');
                setActive();
                $scope.selectedProduct.VariantId = obj.VariantId;
                $scope.selectedProduct.Price = obj.Price;
                $scope.selectedProduct.Stock = obj.Stock;
            });
        }

        function setActive() {
            _.forEach($scope.productDetail.Variant, function(varnt) {
                _.forEach(varnt.VariantValue, function(varntVal) {
                    if((_.findIndex($scope.txt, function(el) { return el == varntVal.text; })) != -1) {
                        varntVal.activeButton = 'true';
                    } else {
                        varntVal.activeButton = 'false';
                    }
                });
            });
        }

        $scope.selectVariant = function(ind, txt) {
            $scope.txt[ind] = txt;
            var combination = $scope.txt[0];
            if($scope.txt[1]) {
                for(var i = 1; i<$scope.txt.length; i++) {
                    combination = combination + '/' + $scope.txt[i];
                }
            }
            setActive();
            var obj = _.find($scope.productDetail.VariantArray, function(o) {
                return o.VariantCombination == combination;
            });
            $scope.selectedProduct.VariantId = obj.VariantId;
            $scope.selectedProduct.Price = obj.Price;
            $scope.selectedProduct.Stock = obj.Stock;
        };

        $scope.onBuy = function() {
            productDescriptionService.buyProduct($scope.selectedProduct.ProductId, $scope.selectedProduct.VariantId)
            .then(function(res) {
                toaster.pop({
                    type: 'success',
                    title: 'Product Sold',
                    showCloseButton: true,
                });
                getProductDetail();
            });
        };

        $scope.onBack = function() {
            $state.go('app.productView');
        };
    }
})();
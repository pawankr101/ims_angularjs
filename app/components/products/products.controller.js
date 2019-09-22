(function() {
    'use strict';

    angular.module('app').controller('productsController', productsController);

    productsController.$inject = ['$scope', 'productsServices', 'toaster'];
    function productsController($scope, productsServices, toaster) {

        $scope.product = {};
        $scope.products = [];
        $scope.formName = 'ADD Product';

        setProductNull();
        getproductsData();

        function setProductNull() {
            var product = {
                ProductId: null,
                ProductName: null,
                Variant: [{
                    VariantName: null,
                    VariantValue: null
                }],
                Discount: null,
                Sku: null,
                Discription: null,
                ShipingMethod: null,
                Cod: null
            };
            $scope.product = product;
            $scope.formName = 'ADD Product';

        }

        function getproductsData() {
            productsServices.getAllProducts()
            .then(function(res) {
                $scope.products = res;
            });
        }

        $scope.addVarrientBox = function() {
            $scope.product.Variant.push(
                {
                    VariantName: null,
                    VariantValue: null
                }
            );
        };

        $scope.removeVarrientBox = function(index) {
            $scope.product.Variant.splice(index, 1);
        };

        $scope.onCancel = function() {
            setProductNull();
            getproductsData();
        };

        $scope.saveProduct = function() {
            if($scope.product.ProductId == null) {
                $scope.product.ProductId = $scope.products[0] ? _.maxBy($scope.products, function(o) { return o.ProductId; }).ProductId + 1 : 1;
                productsServices.addProduct($scope.product)
                .then(function(res) {
                    toaster.pop({
                        type: 'success',
                        title: 'Product Added',
                        showCloseButton: true,
                    });
                    $scope.products = res;
                    setProductNull();
                });
            } else {
                productsServices.updateProduct($scope.product)
                .then(function(res) {
                    toaster.pop({
                        type: 'success',
                        title: 'Product Updated',
                        showCloseButton: true,
                    });
                    $scope.products = res;
                    setProductNull();
                });
            }
        };

        $scope.editProduct = function(id) {
            $scope.product = _.find($scope.products, function(o) {
                return o.ProductId == id;
            });
            $scope.formName = 'Update Product';
        };

        $scope.deleteProduct = function(id) {
            productsServices.deleteProduct(id)
            .then(function(res) {
                toaster.pop({
                    type: 'warning',
                    title: 'Product Deleted',
                    showCloseButton: true,
                });
                $scope.products = res;
            });
        };
    }
})();
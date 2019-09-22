(function() {
    'use strict';

    angular.module('app').service('productsServices', productsServices);

    productsServices.$inject = ['httpMyJsonService', 'inventoryService', 'toaster'];
    function productsServices(httpMyJsonService, inventoryService, toaster) {
        var products = [];

        function getAllProducts() {
            return httpMyJsonService.getProducts()
            .then(function(resp) {
                products = resp.data;
                return products;
            }, function(err) {
                toaster.pop({
                    type: 'error',
                    body: err,
                    showCloseButton: true,
                });
                console.log(err);
            });
        }

        function addProduct(product) {
            products.push(product);
            return httpMyJsonService.putProducts(products)
            .then(function(resp) {
                products = resp.data;
                return inventoryService.addVariants(product)
                .then(function(res) {
                    return resp.data;
                });
            }, function(err) {
                toaster.pop({
                    type: 'error',
                    body: err,
                    showCloseButton: true,
                });
                console.log(err);
            });
        }

        function updateProduct(product) {
            _.find(products, function(o) {
                if(o.ProductId == product.ProductId) {
                    o = product;
                }
            });
            return httpMyJsonService.putProducts(products)
            .then(function(resp) {
                products = resp.data;
                return inventoryService.changeVariants(product)
                .then(function(res) {
                    return resp.data;
                });
            }, function(err) {
                toaster.pop({
                    type: 'error',
                    body: err,
                    showCloseButton: true,
                });
                console.log(err);
            });
        }

        function deleteProduct(productId) {
            products = _.filter(products, function(o) {
                return o.ProductId != productId;
            });
            return httpMyJsonService.putProducts(products)
            .then(function(resp) {
                return inventoryService.deleteVariants(productId)
                .then(function(res) {
                    return resp.data;
                });
            }, function(err) {
                toaster.pop({
                    type: 'error',
                    body: err,
                    showCloseButton: true,
                });
                console.log(err);
            });
        }

        return {
            getAllProducts: getAllProducts,
            addProduct: addProduct,
            updateProduct: updateProduct,
            deleteProduct: deleteProduct
        };
    }
})();
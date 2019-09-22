(function() {
    'use strict';

    angular.module('app').service('productDescriptionService', productDescriptionService);

    productDescriptionService.$inject = ['httpMyJsonService', 'productsServices', 'inventoryService'];
    function productDescriptionService(httpMyJsonService, productsServices, inventoryService) {
        
        var productDetails = {};
        var allProductVariants = [];

        function getProductsDetail(productId) {
            return productsServices.getAllProducts()
            .then(function(res) {
                productDetails = _.find(res, function(o) {
                    return o.ProductId == productId;
                });
                return inventoryService.getAllVariantData()
                .then(function(resp) {
                    allProductVariants = resp;
                    for(var i = 0; i<resp.length; i++) {
                        if(resp[i].ProductId == productId) {
                            productDetails.VariantArray = resp[i].VariantArray;
                            break;
                        }
                    }
                    return productDetails;
                });
            });
        }

        function buyProduct(productId, variantId) {
            var prd = _.find(allProductVariants, function(o) {
                return o.ProductId == productId;
            });
            for(var i = 0; i<prd.VariantArray.length; i++) {
                if(prd.VariantArray[i].VariantId == variantId) {
                    prd.VariantArray[i].Stock = prd.VariantArray[i].Stock - 1;
                    break;
                }
            }
            return inventoryService.updateVariant(prd)
            .then(function(res) {
                allProductVariants = res;
                return res;
            });
        }

        return {
            getProductsDetail: getProductsDetail,
            buyProduct: buyProduct
        };
    }
})();
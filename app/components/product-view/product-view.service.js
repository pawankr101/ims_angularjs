(function() {
    'use strict';

    angular.module('app').service('productViewService', productViewService);

    productViewService.$inject = ['httpMyJsonService', 'productsServices', 'inventoryService'];
    function productViewService(httpMyJsonService, productsServices, inventoryService) {
        
        var products = [];
        var allProductVariants = [];

        function getProductInventry() {
            var productInventory = [];
            return productsServices.getAllProducts()
            .then(function(resp) {
                products = resp;
                return inventoryService.getAllVariantData()
                .then(function(resps) {
                    allProductVariants = resps;
                    for(var i = 0; i<allProductVariants.length; i++) {
                        var obj = {};
                        var def = null;
                        def = _.find(allProductVariants[i].VariantArray, function(o) {
                            return o.isDefault == 'true';
                        });
                        if(def) {
                            obj.ProductId = allProductVariants[i].ProductId;
                            obj.ProductName = allProductVariants[i].ProductName;
                            obj.Price = def.Price;
                            obj.Discount = _.find(products, function(ob) { return ob.ProductId == obj.ProductId; }).Discount;
                        }
                        if(obj.ProductId) {
                            productInventory.push(obj);
                        }
                    }
                    return productInventory;
                });
            });
        }

        return {
            getProductInventry: getProductInventry
        };
    }
})();
(function() {
    'use strict';

    angular.module('app').service('inventoryService', inventoryService);

    inventoryService.$inject = ['httpMyJsonService', 'toaster'];
    function inventoryService(httpMyJsonService, toaster) {
        
        var allProductVariants = [];

        getAllVariantData();

        function getAllVariantData() {
            return httpMyJsonService.getVariants()
            .then(function(res) {
                allProductVariants = res.data;
                return allProductVariants;
            }, function(err) {
                toaster.pop({
                    type: 'error',
                    body: err,
                    showCloseButton: true,
                });
                console.log(err);
            });
        }

        function addVariants(product) {
            allProductVariants.push(genrateCombination(product));
            return httpMyJsonService.putVariants(allProductVariants)
            .then(function(res) {
                allProductVariants = res.data;
                return res.data;
            }, function(err) {
                toaster.pop({
                    type: 'error',
                    body: err,
                    showCloseButton: true,
                });
                console.log(err);
            });
        }

        function changeVariants(product) {
            for(var ch = 0; ch<allProductVariants.length; ch++) {
                if(allProductVariants[ch].ProductId == product.ProductId) {
                    allProductVariants[ch] = genrateCombination(product);
                }
            }
            return httpMyJsonService.putVariants(allProductVariants)
            .then(function(res) {
                allProductVariants = res.data;
                return res.data;
            }, function(err) {
                toaster.pop({
                    type: 'error',
                    body: err,
                    showCloseButton: true,
                });
                console.log(err);
            });
        }

        function deleteVariants(productId) {
            allProductVariants = _.filter(allProductVariants, function(o) {
                return o.ProductId != productId;
            });
            return httpMyJsonService.putVariants(allProductVariants)
            .then(function(res) {
                allProductVariants = res.data;
                return res.data;
            }, function(err) {
                toaster.pop({
                    type: 'error',
                    body: err,
                    showCloseButton: true,
                });
                console.log(err);
            });
        }

        function updateVariant(variant) {
            _.find(allProductVariants, function(o) {
                if(o.ProductId == variant.ProductId) {
                    o = variant;
                }
            });
            return httpMyJsonService.putVariants(allProductVariants)
            .then(function(res) {
                allProductVariants = res.data;
                return res.data;
            }, function(err) {
                toaster.pop({
                    type: 'error',
                    body: err,
                    showCloseButton: true,
                });
                console.log(err);
            });
        }

        function genrateCombination(product) {
            var Variant = product.Variant;
            var variantArr = [];
            var ind = 0;
            if (Variant[ind]) {
                for (var i = 0; i < Variant[ind].VariantValue.length; i++) {
                    var variant0 = Variant[ind].VariantValue[i].text;
                    if (Variant[ind + 1]) {
                        call(ind + 1, variant0);
                    } else {
                        variantArr.push(
                            {
                                VariantId: variantArr[0] ? _.maxBy(variantArr, function(o) { return o.VariantId; }).VariantId + 1 : 1,
                                VariantCombination: variant0,
                                Price: null,
                                Stock: null,
                                isDefault: false
                            }
                        );
                    }
                }
            }

            return {
                ProductId: product.ProductId,
                ProductName: product.ProductName,
                VariantArray: variantArr
            };

            function call(index, variantx) {
                for (var j = 0; j < Variant[index].VariantValue.length; j++) {
                    var variantxy = variantx;
                    variantxy = variantxy + "/" + Variant[index].VariantValue[j].text;
                    if (Variant[index + 1]) {
                        call(index + 1, variantxy);
                    } else {
                        variantArr.push(
                            {
                                VariantId: variantArr[0] ? _.maxBy(variantArr, function(o) { return o.VariantId; }).VariantId + 1 : 1,
                                VariantCombination: variantxy,
                                Price: null,
                                Stock: null,
                                isDefault: false
                            }
                        );
                    }
                }
            }
        }

        return {
            getAllVariantData: getAllVariantData,
            addVariants: addVariants,
            changeVariants: changeVariants,
            deleteVariants: deleteVariants,
            updateVariant: updateVariant
        };
    }
})();
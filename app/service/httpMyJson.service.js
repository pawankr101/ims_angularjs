(function() {
    'use strict';

    angular.module('app').factory('httpMyJsonService', httpMyJsonService);

    httpMyJsonService.$inject = ['$http'];
    function httpMyJsonService($http) {
        var productArrayUrl = 'https://api.myjson.com/bins/15d6sn';
        var variantArrayUrl = 'https://api.myjson.com/bins/7z6hv';
        var serviceObj = {};

        serviceObj.getProducts = function() {
            return $http({
                method: 'get',
                url: productArrayUrl
            });
        };

        serviceObj.putProducts = function(products) {
            return $http({
                method: 'put',
                url: productArrayUrl,
                data: products
            });
        };

        serviceObj.getVariants = function() {
            return $http({
                method: 'get',
                url: variantArrayUrl
            });
        };

        serviceObj.putVariants = function(variants) {
            return $http({
                method: 'put',
                url: variantArrayUrl,
                data: variants
            });
        };

        return serviceObj;
    }
})();
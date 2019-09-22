(function() {
    'use strict';
    
    angular.module('app').config(lazyLoad);

    lazyLoad.$inject=['$ocLazyLoadProvider'];
    function lazyLoad($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: [
                {
                    name: 'products',
                    files: [
                        'app/components/products/products.controller.js',
                        'app/components/products/products.service.js',
                        'app/components/inventory/inventory.service.js',
                        'app/service/httpMyJson.service.js'
                    ]
                },
                {
                    name: 'inventory',
                    files: [
                        'app/components/inventory/inventory.controller.js',
                        'app/components/inventory/inventory.service.js',
                        'app/service/httpMyJson.service.js'
                    ]
                },
                {
                    name: 'productView',
                    files: [
                        'app/components/product-view/product-view.controller.js',
                        'app/components/product-view/product-view.service.js',
                        'app/components/products/products.service.js',
                        'app/components/inventory/inventory.service.js',
                        'app/service/httpMyJson.service.js'
                    ]
                },
                {
                    name: 'productDiscription',
                    files: [
                        'app/components/product-description/productDescription.controller.js',
                        'app/components/product-description/productDescription.service.js',
                        'app/components/products/products.service.js',
                        'app/components/inventory/inventory.service.js',
                        'app/service/httpMyJson.service.js'
                    ]
                }
            ]
        });
    }
})();
(function(app) {
    'use strict';
    
    angular.module('app').config(configure);

    configure.$inject=['$stateProvider', '$urlRouterProvider'];
    function configure($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('app',{
            cache: true,
            views: {
                '':{
                    templateUrl:"app/main/main.html",
                    controller:'mainController as main'
                },
                'header@app': {
                    templateUrl: 'app/shared/layout/header/header.html',
                    controller:'headerController as header'
                }
            }
        })
        .state('app.products', {
            display_name: 'Components',
            url: '/products',
            cache: true,
            views: {
                'pagecontent': {
                    templateUrl: 'app/components/products/products.html',
                    controller: 'productsController as products'
                }
            },
            resolve: {
                loadFiles: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('products');
                }]
            }
        })
        .state('app.inventory', {
            display_name: 'Components',
            url: '/inventory',
            cache: true,
            views: {
                'pagecontent': {
                    templateUrl: 'app/components/inventory/inventory.html',
                    controller: 'inventoryController as inventory'
                }
            },
            resolve: {
                loadFiles: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('inventory');
                }]
            }
        })
        .state('app.productView', {
            display_name: 'ProductView',
            url: '/productView',
            cache: true,
            views: {
                'pagecontent': {
                    templateUrl: 'app/components/product-view/product-view.html',
                    controller: 'productsViewController as productsView'
                }
            },
            resolve: {
                loadFiles: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('productView');
                }]
            }
        })
        .state('app.productDescription', {
            display_name: 'productDescription',
            url: '/productDescription/:productidd',
            cache: true,
            views: {
                'pagecontent': {
                    templateUrl: 'app/components/product-description/productDescription.html',
                    controller: 'productDescriptionController as productDescription'
                }
            },
            resolve: {
                loadFiles: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('productDiscription');
                }]
            }
        });
        $urlRouterProvider.otherwise('/products');
    }

})(window.app);
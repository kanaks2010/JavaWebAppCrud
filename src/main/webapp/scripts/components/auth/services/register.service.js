'use strict';

angular.module('crudApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });



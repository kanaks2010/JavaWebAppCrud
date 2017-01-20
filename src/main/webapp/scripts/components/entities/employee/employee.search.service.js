'use strict';

angular.module('crudApp')
    .factory('EmployeeSearch', function ($resource) {
        return $resource('api/_search/employees/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });

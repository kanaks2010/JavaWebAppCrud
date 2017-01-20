'use strict';

angular.module('crudApp')
    .factory('Employee', function ($resource, DateUtils) {
        return $resource('api/employees/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.dateofbirth = DateUtils.convertLocaleDateFromServer(data.dateofbirth);
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    data.dateofbirth = DateUtils.convertLocaleDateToServer(data.dateofbirth);
                    return angular.toJson(data);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    data.dateofbirth = DateUtils.convertLocaleDateToServer(data.dateofbirth);
                    return angular.toJson(data);
                }
            }
        });
    });

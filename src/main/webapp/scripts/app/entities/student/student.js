'use strict';

angular.module('crudApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('student', {
                parent: 'entity',
                url: '/students',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'crudApp.student.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/student/students.html',
                        controller: 'StudentController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('student');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('student.detail', {
                parent: 'entity',
                url: '/student/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'crudApp.student.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/student/student-detail.html',
                        controller: 'StudentDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('student');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Student', function($stateParams, Student) {
                        return Student.get({id : $stateParams.id});
                    }]
                }
            })
            .state('student.new', {
                parent: 'student',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/student/student-dialog.html',
                        controller: 'StudentDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    name: null,
                                    email: null,
                                    dateofbirth: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('student', null, { reload: true });
                    }, function() {
                        $state.go('student');
                    })
                }]
            })
            .state('student.edit', {
                parent: 'student',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/student/student-dialog.html',
                        controller: 'StudentDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Student', function(Student) {
                                return Student.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('student', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('student.delete', {
                parent: 'student',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/student/student-delete-dialog.html',
                        controller: 'StudentDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Student', function(Student) {
                                return Student.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('student', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });

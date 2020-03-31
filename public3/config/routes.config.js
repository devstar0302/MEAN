app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            abstract: true,
            data: {},
            templateUrl: 'pages/home/layout.html'
        })
        .state('home.index', {
            url: '/',
            views: {
                header: {
                    templateUrl: 'pages/home/header.html'
                },
                footer: {
                    templateUrl: 'pages/home/footer.html'
                },
                main: {
                    templateUrl: 'pages/home/index.html'
                }
            }
        })
        .state('login', {
            abstract: true,
            data: {},
            templateUrl: 'pages/login/layout.html'
        })
        .state('login.index', {
            url: '/login',
            views: {
                form: {
                    templateUrl: 'pages/login/index.html'
                }
            }
        })
        .state('login.register', {
            url: '/register',
            views: {
                form: {
                    templateUrl: 'pages/login/register.html'
                }
            }
        })
        .state('admin', {
            abstract: true,
            data: {},
            templateUrl: 'pages/admin/layout.html'
        })
        .state('admin.dashboard', {
            url: '/admin/dashboard',
            data: {
                auth: true
            },
            views: {
                content: {
                    templateUrl: 'pages/admin/dashboard.html'
                }
            }
        })
        .state('admin.users', {
            url: '/admin/users',
            // data: {
            //     auth: true,
            //     role: ['20']
            // },
            views: {
                content: {
                    templateUrl: 'pages/admin/users.html'
                }
            }
        })
        .state('admin.editor', {
            url: '/admin/editor',
            views: {
                content: {
                    templateUrl: 'pages/admin/editor.html'
                }
            }
        })
        .state('admin.404', {
            url: '/admin/404',
            views: {
                content: {
                    templateUrl: 'pages/admin/404.html'
                }
            }
        });
});
app.component('adminHeader', {
    templateUrl: 'components/admin-header/admin-header.component.html',
    controller: ['$mdSidenav', '$auth', '$state', '$localStorage', function ($mdSidenav, $auth, $state, $localStorage) {
        this.$onInit = function () {
        };
        this.logout = function () {
            $auth.logout().then(function () {
                $state.go('login.index');
                $localStorage.$reset();
            });
        };
        this.buildToggler = function (componentId) {
            $mdSidenav(componentId).toggle();
        };
        this.$onDestroy = function () {

        };
    }],
    controllerAs: 'vm',
    bindings: {}
});
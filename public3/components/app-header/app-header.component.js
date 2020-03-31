app.component('appHeader', {
    templateUrl: 'components/app-header/app-header.component.html',
    controller: ['$mdSidenav', function ($mdSidenav) {
        this.$onInit = function () {
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
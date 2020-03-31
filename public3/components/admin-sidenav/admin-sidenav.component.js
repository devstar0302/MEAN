app.component('adminSidenav', {
    templateUrl: 'components/admin-sidenav/admin-sidenav.component.html',
    controller: ['ssSideNav', 'API',function (ssSideNav, API) {
        this.$onInit = function () {
            API.all('admincp/get_admin_menu_left').post().then(function (response) {
                ssSideNav.sections = response.data.menu;
            });
            this.menu = ssSideNav;
            this.config = {
                autoHideScrollbar: true,
                theme: 'light',
                advanced: {
                    updateOnContentResize: true
                },
                scrollInertia: 20
            };
        };

        this.$onDestroy = function () {

        };
    }],
    controllerAs: 'vm',
    bindings: {}
});
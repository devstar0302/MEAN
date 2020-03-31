app.component('appLogin', {
    templateUrl: 'components/app-login/app-login.component.html',
    controller: ['$state', '$auth', '$localStorage', 'ToastService', function ($state, $auth, $localStorage, ToastService) {
        var vm = this;
        vm.$onInit = function () {
        };

        vm.login = function (check) {
            if(!check) {
                $auth.login({
                    email: vm.user.email,
                    password: vm.user.password
                }).then(function (response) {
                    if(response.data.errors) {
                        ToastService.error('Email or password.');
                    }else {
                        ToastService.show('Logged in successfully.')
                        $localStorage.role = response.data.data.user.roleId;
                        $auth.setToken(response.data);
                        $state.go('admin.dashboard');
                    }
                }).catch(function (response) {
                    console.log(response);
                    window.alert('Error: Login failed');
                });
            }
        };
        vm.$onDestroy = function () {

        };
    }],
    controllerAs: 'vm',
    bindings: {}
});
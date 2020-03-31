var UserDialogController = ['$scope', 'data', 'DialogService', 'API', 'ToastService', 'query', function
                            ($scope, data, DialogService, API, ToastService, query)
{
    var vm = this;
    vm.edit = !!data;
    vm.data = data ? angular.copy(data) : {};
    if(data) {vm.oldData = data;}
    vm.closeSave = false;
    API.all('api_get_role_list').post().then(function (response) {
        vm.listRole = response.data;
    });
    vm.close = function () {
        DialogService.hide();
    };

    vm.create = function(form) {
        if (form.$valid) {
            if(vm.edit) {
                API.all('change_profile').post(vm.data).then(function (response) {
                    query.reload = 1;
                    ToastService.show('Update user successfully.');
                    DialogService.hide();
                });
            }else {
                API.all('create_user').post(vm.data).then(function (response) {
                    query.reload = 1;
                    vm.data = {};
                    form.$setUntouched();
                    form.$setPristine();
                    ToastService.show('Add new user successfully.');
                    DialogService.hide();
                    if (vm.closeSave) { DialogService.hide();}
                });
            }
        }
    }
}];
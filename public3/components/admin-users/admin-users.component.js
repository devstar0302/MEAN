app.component('adminUsers', {
    templateUrl: 'components/admin-users/admin-users.component.html',
    controller: ['API', '$scope', 'DialogService', 'ToastService',function (API, $scope, DialogService, ToastService) {
        var vm = this;
        this.$onInit = function () {
            vm.query = {
                filter: '',
                order: '-registerDate',
                limit: 10,
                page: 1,
                reload: 0
            };
            vm.headers = [
                {
                    key: 'email',
                    label: 'Email',
                    filter: '',
                    option:''
                },
                {
                    key: 'roleName',
                    label: 'Role',
                    filter: '',
                    option:''
                },
                {
                    key: 'registerDate',
                    label: 'Register Date',
                    filter: 'date',
                    option: 'MMM d, y h:mm a'
                }
            ];
        };

        this.editRow = function (data, query) {
            var options = {
                controller: UserDialogController,
                bindToController: true,
                locals: {data: data, query: query}
            };
            DialogService.fromTemplate('user', options);
        };

        this.addRow = function (query) {
            var options = {
                controller: UserDialogController,
                bindToController: true,
                locals: {data: null, query: query}
            };
            DialogService.fromTemplate('user', options);
        };

        this.deleteRow = function (data, query) {
            var deleteId = [];
            angular.forEach(data, function (e) {
                deleteId.push(e.id);
            });
            DialogService.confirm('Suspend User', 'You are sure you want to delete this user', function () {
                API.all('suspend_user').post({id:deleteId}).then(function () {
                    query.reload = 1;
                    ToastService.show('Suspend '+deleteId.length+' user successfully.');
                });
            });
        };

        // $scope.$watch('filter.show', function (newValue, oldValue) {
        //     if(newValue) document.getElementById("search").focus();
        //     else document.getElementById("search").blur();
        // });

        this.$onDestroy = function () {

        };
    }],
    controllerAs: 'vm',
    bindings: {}
});
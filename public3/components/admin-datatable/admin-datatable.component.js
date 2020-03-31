app.component('adminDatatable', {
    templateUrl: 'components/admin-datatable/admin-datatable.component.html',
    controller: ['API', '$scope', '$filter',function (API, $scope, $filter) {
        var vm = this;
        this.$onInit = function () {
            this.limitOptions = [10, 15, 20];

            vm.selected = [];

            vm.filter = {
                options: {
                    debounce: 500
                }
            };

            vm.dataTable = {
                "total": 0,
                "data": []
            };
        };

        this.removeFilter = function () {
            vm.filter.show = false;
            vm.query.filter = '';
        };

        this.getDatas = function () {
            API.all(vm.linkData).post(vm.query).then(function (response) {
                vm.dataTable = response.data;
                vm.headers.forEach(function (e, i) {
                    if(e.filter !== ''){
                        vm.dataTable.data.forEach(function (f, j) {
                            f[e.key] = $filter(e.filter)(f[e.key],e.option);
                        })
                    }
                })
            });
        };

        this.edit = function (data) {
            vm.editRow(data, vm.query);
        };

        this.add = function () {
            vm.addRow(vm.query);
        };

        this.delete = function () {
            vm.deleteRow(vm.selected, vm.query);
        };

        // $scope.$watch('filter.show', function (newValue, oldValue) {
        //     if(newValue) document.getElementById("search").focus();
        //     else document.getElementById("search").blur();
        // });
        $scope.$watch('vm.query.reload', function (newValue, oldValue) {
            // if (!oldValue) bookmark = $scope.query.request.page;
            // if (newValue !== oldValue) $scope.query.request.page = 1;
            // if (!newValue) $scope.query.request.page = bookmark;
            // vm.getDatas();
            if(newValue === 1) {
                vm.getDatas();
                vm.query.reload = 0;
                vm.selected = [];
            }
        });
        $scope.$watch('vm.query.filter', function (newValue, oldValue) {
            // if (!oldValue) bookmark = $scope.query.request.page;
            // if (newValue !== oldValue) $scope.query.request.page = 1;
            // if (!newValue) $scope.query.request.page = bookmark;
            vm.getDatas();
        });
        this.$onDestroy = function () {

        };
    }],
    controllerAs: 'vm',
    bindings: {
        query: '<',
        headers: '<',
        linkData: '@',
        editRow: '<',
        deleteRow: '<',
        addRow: '<'
    }
});
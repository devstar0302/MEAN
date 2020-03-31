app.component('appGridList', {
    templateUrl: 'components/app-grid-list/app-grid-list.component.html',
    controller: ['$scope', function ($scope) {
        this.$onInit = function () {
            this.listColor = [
                '#F44336', '#607D8B',
                '#9C27B0', '#FF5722',
                '#3F51B5', '#FFC107',
                '#00BCD4', '#8BC34A',
                '#4CAF50', '#009688',
                '#FFEB3B', '#2196F3',
                '#FF9800', '#673AB7',
                '#795548', '#E91E63'
            ];
            this.listVendor = [
                'marc jacob',
                'fendi',
                'givenchy',
                'dolce and gabbana',
                'adidas',
                'gucci',
                'louis vuiton',
                'prada',
                'chloe',
                'marc jacoba',
                'fendib',
                'givenchyc'
            ];
            this.per_page = 4;
            this.current_page = 1;
            this.last_page = 60;
        };
        this.gotoPage = function () {
            console.log(this.current_page);
        };
        this.$onDestroy = function () {

        };
    }],
    controllerAs: 'vm',
    bindings: {}
});
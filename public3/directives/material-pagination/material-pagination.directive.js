app.directive('materialPagination',function () {
    return {
        restrict: 'EA',
        scope: {
            wmpTotal: '=',
            position: '@',
            gotoPage: '&',
            step: '=',
            currentPage: '='
        },
        controller: ['$scope', function ($scope) {
            var vm = this;

            vm.first = 'first_page';
            vm.last = 'last_page';
            vm.next = 'chevron_right';
            vm.previous = 'chevron_left';
            vm.index = 0;
            vm.step = $scope.step;

            vm.goto = function(index) {
                $scope.currentPage = vm.page[index];
            };

            vm.getoPre = function(){
                $scope.currentPage = vm.index;
                vm.index -= vm.step;
            };

            vm.getoNext = function(){
                vm.index += vm.step;
                $scope.currentPage = vm.index + 1;
            };

            vm.gotoFirst = function(){
                vm.index = 0;
                $scope.currentPage = 1;
            };

            vm.gotoLast = function(){
                vm.index = parseInt($scope.wmpTotal / vm.step) * vm.step;
                vm.index === $scope.wmpTotal ? vm.index = vm.index - vm.step : '';
                $scope.currentPage = $scope.wmpTotal;
            };

            $scope.$watch('currentPage', function() {
                $scope.gotoPage();
            });

            $scope.$watch('wmpTotal', function() {
                vm.init();
            });

            vm.init = function() {
                vm.stepInfo = (function() {
                    var i, result = [];
                    for (i = 0; i < vm.step; i++) {
                        result.push(i)
                    }
                    return result;
                })();

                vm.page = (function() {
                    var i, result = [];
                    for (i = 1; i <= $scope.wmpTotal; i++) {
                        result.push(i);
                    }
                    return result;
                })();

            };
        }],
        controllerAs: 'vm',
        template: [
            '<div layout="row" class="wan-material-paging" layout-align="{{ position }}">',
            '<md-button class="md-raised md-accent wmp-button" aria-label="First" ng-click="vm.gotoFirst()"><md-icon md-font-set="material-icons">{{ vm.first }}</md-icon></md-button>',
            '<md-button class="md-raised wmp-button" aria-label="Previous" ng-click="vm.getoPre()" ng-show="vm.index - 1 >= 0"><md-icon md-font-set="material-icons">{{ vm.previous }}</md-icon></md-button>',
            '<md-button class="md-raised wmp-button" aria-label="Go to page {{i+1}}" ng-repeat="i in vm.stepInfo"',
            ' ng-click="vm.goto(vm.index + i)" ng-show="vm.page[vm.index + i]" ',
            ' ng-class="{true: \'md-accent\', false: \'\'}[vm.page[vm.index + i] === currentPage]">',
            ' {{ vm.page[vm.index + i] }}',
            '</md-button>',
            '<md-button class="md-raised wmp-button" aria-label="Next" ng-click="vm.getoNext()" ng-show="vm.index + vm.step < wmpTotal"><md-icon md-font-set="material-icons">{{ vm.next }}</md-icon></md-button>',
            '<md-button class="md-raised md-accent wmp-button" aria-label="Last" ng-click="vm.gotoLast()"><md-icon md-font-set="material-icons">{{ vm.last }}</md-icon></md-button>',
            '</div>'
        ].join('')
    }
})
app.directive('tabsAutoplay', ['$interval', '$mdCompiler', function($interval, $mdCompiler) {
    return {
        restrict: 'A,E',
        require: 'mdTabs',
        link: function(scope, element, attrs, controllers) {
            var _this = angular.element(element);
            if(_this.hasClass('arrow-navigation')) {
                scope.selectedIndex = controllers.selectedIndex + 1;

                scope.nextPage = function() {
                    scope.selectedIndex = controllers.selectedIndex + 2;
                    return controllers.select(controllers.selectedIndex + 1);
                };
                scope.previousPage = function() {
                    scope.selectedIndex = controllers.selectedIndex + 2;
                    return controllers.select(controllers.selectedIndex - 1);
                };
                element.on('click', function () {
                    scope.selectedIndex = controllers.selectedIndex + 1;
                });
                scope.$watch('selectedIndex', function (a, b) {
                    scope.tabsLength = controllers.tabs.length;
                });
                var pagination = _this.find('md-pagination-wrapper');
                $mdCompiler.compile({
                    template: '<md-button class="md-icon-button" ng-disabled="selectedIndex === tabsLength" ng-click="nextPage()"><md-icon md-font-set="material-icons">chevron_right</md-icon></md-button>'
                }).then(function(compileData) {
                    compileData.link(scope);
                    pagination.append(compileData.element);
                });
                $mdCompiler.compile({
                    template: '<md-button class="md-icon-button" ng-disabled="selectedIndex === 1" ng-click="previousPage()"><md-icon md-font-set="material-icons">chevron_left</md-icon></md-button>'
                }).then(function(compileData) {
                    compileData.link(scope);
                    pagination.prepend(compileData.element);
                });
            }
            var defaultDelay = 2000,
                tabsAutoplayDelay = attrs.tabsAutoplay || defaultDelay;

            var tabsAutoplayInterval = $interval(function() {
                if(_this.hasClass('arrow-navigation')) {
                    scope.selectedIndex = controllers.selectedIndex + 2;
                }
                var nextTab;
                for (var i = controllers.selectedIndex + 1; i <= controllers.tabs.length; i++) {
                    nextTab = controllers.tabs[i];
                    if (nextTab && (nextTab.scope.disabled !== true)) {
                        return controllers.select(nextTab.getIndex());
                    }
                }
                return controllers.select(0);
            }, tabsAutoplayDelay);

            var cleanup = function() {
                $interval.cancel(tabsAutoplayInterval);
                element.off('click', cleanup);
            };
            var cleanupClick = function () {
                $interval.cancel(tabsAutoplayInterval);
                tabsAutoplayInterval = $interval(function () {
                    if (_this.hasClass('arrow-navigation')) {
                        scope.selectedIndex = controllers.selectedIndex + 2;
                    }
                    var nextTab;
                    for (var i = controllers.selectedIndex + 1; i <= controllers.tabs.length; i++) {
                        nextTab = controllers.tabs[i];
                        if (nextTab && (nextTab.scope.disabled !== true)) {
                            return controllers.select(nextTab.getIndex());
                        }
                    }
                    return controllers.select(0);
                }, tabsAutoplayDelay);
            };
            element.on('click', cleanupClick);
            scope.$on('$destroy', cleanup);
        }
    }
}]);

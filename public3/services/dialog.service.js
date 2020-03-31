app.service('DialogService', function ($mdDialog) {
    this.fromTemplate = function (template, options) {
        if (!template) {
            return false;
        }

        if (!options) {
            options = {};
        }

        options.parent = angular.element(document.body);
        options.clickOutsideToClose = true;
        options.fullscreen = true;
        options.controllerAs = 'vm';
        options.templateUrl = './dialogs/' + template + '/' + template + '.dialog.html'

        return $mdDialog.show(options);
    };

    this.hide = function (params) {
        return $mdDialog.hide(params);
    };

    this.cancel = function () {
        return $mdDialog.cancel();
    };

    this.alert = function (title, content, params) {
        var alert = $mdDialog.alert(params)
            .title(title)
            .content(content)
            .ariaLabel(content)
            .ok('Ok');

        return $mdDialog.show(alert);
    };

    this.confirm = function (title, content, params) {
        var confirm = $mdDialog.confirm()
            .title(title)
            .content(content)
            .ariaLabel(content)
            .ok('Ok')
            .cancel('Cancel');

        return $mdDialog.show(confirm).then(function() {
            params();
        });
    };

    this.prompt = function(title, content, placeholder, params) {
        var prompt = $mdDialog.prompt(params)
            .title(title)
            .textContent(content)
            .placeholder(placeholder)
            .ariaLabel(placeholder)
            .ok('Ok')
            .cancel('Cancel');

        return $mdDialog.show(prompt);
    }
})
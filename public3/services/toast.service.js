app.service('ToastService', function ($mdToast) {
    var delay = 6000,position = 'top right', action = 'OK';

    this.show = function (content) {
        if (!content) {
            return false;
        }

        return $mdToast.show(
            $mdToast.simple()
                .content(content)
                .position(position)
                .action(action)
                .hideDelay(delay)
        );
    };

    this.error = function(content) {
        if (!content) {
            return false;
        }

        return $mdToast.show(
            $mdToast.simple()
                .content(content)
                .position(position)
                .theme('warn')
                .action(action)
                .hideDelay(delay)
        );
    }
})
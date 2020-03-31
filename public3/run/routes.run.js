app.run(function ($state, $transitions, $auth, $window) {
    $transitions.onBefore({to: function ($state) {
        return $state.data && $state.data.auth
    }}, function () {
        if (!$auth.isAuthenticated()) {
            return $state.target('login.index', undefined, {location: false});
        }
    }, {priority:10});
    $transitions.onBefore({to: function ($state) {
        return $state.data && $state.data.role && $state.data.role.length > 0 && $state.data.role.indexOf($window.localStorage['ngStorage-role']) === -1;
    }}, function () {
        return $state.target('login.index', undefined, {location: false});
    }, {priority:11});
})
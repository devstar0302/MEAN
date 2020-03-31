app.config(function ($mdThemingProvider) {

    $mdThemingProvider.theme('default')
        .primaryPalette('grey')
        .warnPalette('teal')
        .accentPalette('grey');

    $mdThemingProvider.theme('warn');

    $mdThemingProvider.theme('dark')
        .dark();
});
app.config(function ($authProvider) {

    $authProvider.httpInterceptor = function () {
        return true;
    };
    $authProvider.loginUrl = '/login';
    $authProvider.signupUrl = '/api/register';
    $authProvider.tokenRoot = 'data';
});
app.service('API', function (Restangular, ToastService, $window) {
    var headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/x.nodejs.v1+json'
    };

    return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer
            .setBaseUrl('/api/')
            .setDefaultHeaders(headers)
            .setErrorInterceptor(function(response) {
                if (response.status === 422 || response.status === 401) {
                    for (var error in response.data.errors) {
                        return ToastService.error(response.data.errors[error][0]);
                    }
                }
                if (response.status === 500) {
                    return ToastService.error(response.statusText)
                }
            })
            .addFullRequestInterceptor(function(element, operation, what, url, headers) {
                var token = $window.localStorage.satellizer_token;
                if (token) {
                    headers.Authorization = 'Bearer ' + token;
                }
            });
    });
})
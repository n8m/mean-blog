var blg = angular.module('blog', ['ngRoute', 'ngResource', 'ngAnimate', 'ngSanitize', 'hljs', 'angular-flip']);

blg.config(function ($routeProvider, $locationProvider, $routeParams) {

    $locationProvider.html5Mode(true);

    $routeProvider.when('/posts', {
        templateUrl: 'partials/posts.html',
        controller: 'PostsCtrl'
    });

    $routeProvider.when('/post/:urlTitle', {
        templateUrl: 'partials/single_post.html',
        controller: 'SinglePostCtrl'
    });

    $routeProvider.when('/admin', {
        templateUrl: 'partials/admin.html',
        controller: 'AdminCtrl'
    });

    $routeProvider.when('/admin/newpost', {
        templateUrl: 'partials/add_edit_post.html',
        controller: 'AddEditPostCtrl'
    });

    $routeProvider.when('/admin/edit/:urlTitle', {
        templateUrl: 'partials/add_edit_post.html',
        controller: 'AddEditPostCtrl'
    });

    $routeProvider.when('/admin/auth', {
        templateUrl: 'partials/auth.html',
        controller: 'AuthCtrl'
    })

    if (!$routeParams._escaped_fragment_) {
        $routeProvider.when('/', {
            redirectTo: '/posts'
        });
    }

    $routeProvider.when('/404', {
        templateUrl: 'partials/404.html',
    });

    if (!$routeParams._escaped_fragment_) {
        $routeProvider.otherwise({
            redirectTo: '/404',
        });
    }


});

blg.service("PostResource", function ($resource) {
    return $resource(
        "api/posts/:id:urlTitle", {}, {
            get: {
                method: 'GET',
                params: {
                    urlTitle: '@urlTitle'
                }
            },
            save: {
                method: 'POST'
            },
            delete: {
                method: 'DELETE',
                params: {
                    id: '@id'
                }
            },
            update: {
                method: "PUT"
            }
        }
    );
})

blg.factory('Auth', ['$http', function ($http) {
    return{
        isLoggedIn: false,
        checkSession: function (successCallback, errorCallback) {
            $http({
                method: 'GET',
                url: "api/session/",
            })
                .success(function () {
                    if (successCallback) {
                        successCallback();
                    }
                })
                .error(function () {
                    if (errorCallback) {
                        errorCallback();
                    }
                });
        },
        logout: function (callback) {
            $http({
                method: 'GET',
                url: "api/logout/",
            })
                .success(callback);
        },
        login: function (user, errorCallback, successCallback) {
            $http({
                method: 'POST',
                url: "api/login",
                data: {username: user.username, password: user.password}
            })
                .success(successCallback)
                .error(errorCallback)
        }

    }
}])

blg.factory('Tags', ['$http', function ($http) {
    return{
        get: function (callback) {
            $http({
                method: 'GET',
                url: "api/tags/",
            })
                .success(callback);
        }
    }
}])

blg.service('MetaTags', function () {
    return metaTags = {
        default: function () {
            metaTags.title = "Meangu - FullStack Javascript на русском";
            metaTags.description = "Full Stack Javascript на русском. Туториалы, статьи, переводы";
            metaTags.keywords = "Mean stack, Javascript, Angular, AngularJS, Node, NodeJS, Mongo, MongoDB, ExpressJS";
        },
        title: "",
        description: "",
        keywords: ""
    }
})


blg.service('TagIcons', function () {
    return tagIcons =
    {
        'AngularJS': 'icon-angular',
        'NodeJS': 'icon-node',
        'MongoDB': 'icon-mongo',
        'PassportJS': 'icon-passport',
//        'MongooseJS': 'M',
        'Bootstrap': 'icon-bootstrap',
        'JQuery': 'icon-jquery'
    }
})

blg.constant('Config', {
    title: "MeAngu",
    root: "http://meangu.ru",
//    root: "http://localhost/blog/app",
    description: "Full Stack Javascript на русском",
    postsOnPageByDefault: 5,
});

blg.constant('Lang', {
    readMore: "Читать далее",
    title: "Заголовок",
    urlTitle: "URL",
    tags: "Тэги",
    author: "Автор",
    content: "Текст поста",
    shortContent: "Краткое описание",
    add: "Добавить",
    savePost: "Сохранить пост",
    Translation: "Перевод",
    translation: "перевод",
    addNewPost: "Добавить пост",
    sure: "Уверены?",
    login: "Логин",
    password: "Пароль",
    authError: "Неправильно",
    footerText: "MeanGu - Javascript fullstack на русском: Node, Angular, Express, Mongo и другое"
});

blg.filter('date', function () {
    return function (input) {
        if (input) {
            var dateArr = input.split(" ");
            var day = dateArr[2];
            var year = dateArr[3];
            var index = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(dateArr[1]);
            var month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'][index];
            return day + ' ' + month + ' ' + year;
        }
    }
})
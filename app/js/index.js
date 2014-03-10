var blg = angular.module('blog', ['ngRoute', 'ngResource', 'ngAnimate', 'ngSanitize', 'hljs', 'angular-flip']);

blg.config(function ($routeProvider, $locationProvider) {

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

    $routeProvider.when('/', {
        redirectTo: '/posts'
    });
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

blg.factory('TagIcons', function () {
    var tagIcons =
    {
        'AngularJS': 'A',
        'NodeJS': 'N',
        'MongoDB': 'M',
        'ExpressJS': 'E',
        'PassportJS': 'P',
        'MongooseJS': 'M',
        'Bootstrap': 'B'
    }

    return tagIcons;

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

blg.filter('addIcons', function (TagIcons) {
    return function (tag) {
        if (TagIcons[tag]) {
            return TagIcons[tag] + tag;
        }
    }
})
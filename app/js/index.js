var blg = angular.module('blog', ['ngRoute', 'ngResource', 'ngAnimate', 'ngSanitize', 'ngDisqus', 'hljs']);

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

blg.config(function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(false);

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

blg.directive('whenScrolled', function ($window, $document) {
    return function (scope, elm, attr) {
        angular.element($window).bind('scroll', function () {
            var totalHeight = $document[0].body.clientHeight;
            var visibleHeight = $window.innerHeight;
            var scroll = angular.element($window)[0].scrollY;
            if (totalHeight - visibleHeight - scroll === 0) {
                scope.$apply(attr.whenScrolled);
            }
        });
    };
});

blg.directive('spinner', function (Config) {
    return {
        restrict: 'E',
        template: "<img src=" + Config.root + "/img/spinner.gif>",
        replace: true
    }
})

blg.directive('dynamic', function ($compile) {
    return {
        restrict: 'A',
        replace: true,
        link: function (scope, ele, attrs) {
            scope.$watch(attrs.dynamic, function(html) {
                ele.html(html);
                $compile(ele.contents())(scope);
            });
        }
    };
});

blg.service("PostResource", function ($resource, Config) {
    return $resource(
        Config.apiRoot + "/posts/:id:urlTitle", {}, {
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

blg.factory('Tags', ['$http', 'Config', function ($http, Config) {
    return{
        get: function (callback) {
            $http({
                method: 'GET',
                url: Config.apiRoot + "/tags/",
            })
                .success(callback);
        }
    }
}])


blg.constant('Config', {
    title: "MeAngu",
    root: "http://ruangular.herokuapp.com",
//    root: "http://localhost/blog/app",
    apiRoot: "/api",
//    apiRoot: "http://localhost:1337/api",
    description: "Full Stack Javascript на русском",
    avatarLink: "img/avatar.png",
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
    password: "Пароль"


});
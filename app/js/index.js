var blg = angular.module('blog', ['ngRoute', 'ngResource', 'ngAnimate', 'ngDisqus']);

blg.filter('date', function () {
    return function (input) {
        return input.split(' ')[0].split('T').join(' ');
    }
})

blg.config(function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(false);

    $routeProvider.when('/posts', {
        templateUrl: 'partials/posts.html',
        controller: 'PostsCtrl'
    });

    $routeProvider.when('/posts/new', {
        templateUrl: 'partials/add_post.html',
        controller: 'AddPostCtrl'
    });

    $routeProvider.when('/post/:urlTitle', {
        templateUrl: 'partials/single_post.html',
        controller: 'SinglePostCtrl'
    });

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

blg.directive('spinner', function(Config){
    return {
        restrict: 'E',
        template: "<img src=" + Config.root + "/img/spinner.gif>",
        replace: true
    }
})

blg.service("PostResource", function ($resource, Config) {
    return $resource(
        Config.apiRoot + "/posts/:urlTitle", {}, {
            get: {
                method: 'GET',
                params: {
                    urlTitle: '@urlTitle'
                }
            },
            save: {
                method: 'POST'
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
    title: "NAME - как охуенно символично",
    root: "http://ruangular.herokuapp.com/",
    apiRoot: "/api",
    description: "Блог об NodeJS, AngularJS, ExpressJS, Mongoose, MongoDB",
    avatarLink: "img/avatar.png",
    postsOnPageByDefault: 5,
});

blg.constant('Lang', {
    paginationBefore: "Раньше",
    paginationAfter: "Позже",
    readMore: "Читать далее",
    title: "Заголовок",
    urlTitle: "URL",
    tags: "Тэги",
    author: "Автор",
    content: "Текст поста",
    shortContent: "Краткое описание",
    add: "Добавить",
    savePost: "Сохранить пост"
});
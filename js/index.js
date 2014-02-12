var blg = angular.module('blog', ['ngRoute', 'ngResource', 'ngAnimate']);

blg.filter('date', function(){
    return function(input){
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

blg.factory("TagResource", function ($resource, Config) {
    return $resource(
        Config.apiRoot + "/tags"
    );
});

blg.constant('Config', {
    title: "NAME - как охуенно символично",
    root: "http://localhost/blog",
    apiRoot: "http://localhost:1337/api",
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

blg.controller('ConfigCtrl', function ($scope, Lang, Config, TagResource) {
    $scope.config = Config;
    $scope.lang = Lang;
    $scope.tags = TagResource.query();

})

blg.controller("SideCtrl", function ($scope) {
})

blg.controller("PostsCtrl", function ($scope, Config, PostResource, $routeParams) {
    $scope.posts = [];

    var postsQueryParams = {limit: Config.postsOnPageByDefault};

    if ($routeParams.tags) {
        postsQueryParams.tags = $routeParams.tags;
    }

    if ($routeParams.search) {
        postsQueryParams.search = $routeParams.search;
    }

    $scope.$watch($routeParams, function () {
        $scope.posts = [];
        $scope.loadPosts();
    })

    $scope.loadPosts = function () {
        postsQueryParams.offset = $scope.posts.length;

        PostResource.query(postsQueryParams, function (posts) {
            for (var i = 0, len = posts.length; i < len; i++) {
                $scope.posts.push(posts[i]);
            }
        });
    };

//    (function init() {
//        $scope.loadPosts();
//    })();
})

blg.controller('SinglePostCtrl', function ($scope, $routeParams, PostResource, Config) {

    if ($routeParams.urlTitle) {
        var urlTitle = $routeParams.urlTitle;
        $scope.post = PostResource.get({urlTitle: urlTitle});
    }
    else {
        $scope.is404 = true;
    }

})

blg.controller('AddPostCtrl', function ($scope, PostResource) {
    $scope.newPost = {
        tags: [
            {
                title: 'Первый тэг'
            },
            {
                title: 'Второй тэг'
            }
        ]
    }

    $scope.addTag = function (tag) {
        //Tag added from list of existed tags
        if (tag) {
            $scope.newPost.tags.push(tag);
        }
        //Tag added from input
        else {
            $scope.newPost.tags.push($scope.tag);
            $scope.tag = '';
        }
    }

    $scope.deleteTag = function (index) {
        $scope.newPost.tags.splice(index, 1);
    }

    $scope.savePost = function () {
        PostResource.save($scope.newPost);
    }

})
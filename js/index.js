var blg = angular.module('blog', ['ngRoute', 'ngResource', 'ngAnimate']);

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

    $routeProvider.when('/', {
        redirectTo: '/posts'
    });
});

blg.service("PostResource", function ($resource, Config) {
    return $resource(
        Config.apiRoot + "/posts/:urlTitle", {}, {
            get: {
                method: 'GET',
                params: {
                    urlTitle: '@urlTitle'
                }
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
});

blg.controller('ConfigCtrl', function ($scope, Lang, Config) {
    $scope.config = Config;
    $scope.lang = Lang;
})

blg.controller("PostsCtrl", function($scope, Config, TagResource, PostResource, $routeParams){
    $scope.posts = [];
    $scope.tags = TagResource.query();

    var postsQueryParams = {limit: Config.postsOnPageByDefault};

    if ($routeParams.tags) {
        postsQueryParams.tags = $routeParams.tags;
    }

    if($routeParams.search)  {
        postsQueryParams.search = $routeParams.search;
    }

    $scope.$watch($routeParams, function(){
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
var blg = angular.module('blog', ['ngRoute', 'ngResource', 'ngAnimate']);

blg.config(function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(false);

    $routeProvider.when('/post/:urlTitle', {
        templateUrl: 'partials/post.html',
    });
    $routeProvider.when('/', {
        templateUrl: 'partials/main.html',
    });
});

blg.service("PostResource", function ($resource, Config) {
    return $resource(
        Config.apiRoot + "/posts/:urlTitle",{},{
            get: {
                method: 'GET',
                params:{
                    urlTitle: '@urlTitle'
                }
            }
        }
    );
})

blg.service("Posts", function(){
    var posts = [];
    return posts;
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

blg.controller('MainCtrl', function ($scope, Config, Lang, TagResource, Posts, PostResource) {
    $scope.posts = Posts;
    var limit = Config.postsOnPageByDefault;

    $scope.loadPosts = function () {
        PostResource.query({offset: $scope.posts.length, limit: Config.postsOnPageByDefault}, function (posts) {
            for(var i = 0,len=posts.length;i<len;i++){
                $scope.posts.push(posts[i]);
            }
        });
    };

    $scope.config = Config;
    $scope.lang = Lang;
    $scope.tags = TagResource.query();

    (function init(){
        $scope.loadPosts();
    })();


})

blg.controller('postCtrl', function ($scope, $routeParams, Posts, PostResource) {
    var urlTitle = $routeParams.urlTitle;

    var alreadyLoadedPost = Posts.filter(function (element) {
        return element.urlTitle === $routeParams.urlTitle;
    })[0];

    $scope.post = alreadyLoadedPost || PostResource.get({urlTitle: urlTitle});

})
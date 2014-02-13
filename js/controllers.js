blg.controller('ConfigCtrl', function ($scope, $http, Lang, Config, Tags) {
    $scope.config = Config;
    $scope.lang = Lang;

    Tags.get(function (data) {
        $scope.tags = data;
    })

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

        $scope.postsLoading = true;

        postsQueryParams.offset = $scope.posts.length;

        PostResource.query(postsQueryParams, function (posts) {

            $scope.postsLoading = false;

            for (var i = 0, len = posts.length; i < len; i++) {
                $scope.posts.push(posts[i]);
            }
        });
    };

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
        tags: ['Первый тэг', 'Второй тэг']
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
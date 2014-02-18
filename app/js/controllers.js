blg.controller('ConfigCtrl', function ($scope, Lang, Config, Tags) {
    $scope.config = Config;
    $scope.lang = Lang;

    Tags.get(function (data) {
        $scope.tags = data;
    })

})

blg.controller("SideCtrl", function ($scope) {
})

blg.controller("AdminCtrl", function ($scope, PostResource, Lang) {

    $scope.postsLoading = true;

    $scope.posts = PostResource.query(function(){
        $scope.postsLoading = false;
    });

    $scope.deletePost = function (post, index) {

        if (confirm(Lang.sure)) {
            post.deleting = true;

            PostResource.delete({id: post._id}, function (response) {
                if (response.status == "OK") {
                    $scope.posts.splice(index, 1);
                }
                ;
            })
        }
    }
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

blg.controller('AddEditPostCtrl', function ($scope, PostResource, $timeout, $routeParams, $location) {

    if ($routeParams.urlTitle) {
        $scope.post = PostResource.get({urlTitle: $routeParams.urlTitle});
    }
    else {
        $scope.post = {tags: []};
    }

    $scope.addTag = function (tag) {
        //Tag added from list of existed tags
        if (tag) {

            $scope.post.tags.push(tag);

        }
        //Tag added from input
        else {
            $scope.post.tags.push($scope.tag);
            $scope.tag = '';
        }
    }

    $scope.deleteTag = function (index) {
        $scope.post.tags.splice(index, 1);
    }

    var successSavingHandler = function (response) {
        if (response.status == "OK") {
            $scope.postSaving = false;
            $location.path('admin');
        }
    }

    $scope.savePost = function () {
        $scope.postSaving = true;

        //if post already exist and we have edited it. We use POST
        if ($routeParams.urlTitle) {
            PostResource.update($scope.post, successSavingHandler);
        }
        //if we saving new post. We use PUT
        else {
            PostResource.save($scope.post, successSavingHandler);
        }


    }

})
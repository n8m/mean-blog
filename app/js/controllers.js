blg.controller('ConfigCtrl', function ($scope, Lang, Config, Tags, $location, Auth, MetaTags) {

    $scope.auth = Auth;

    Auth.checkSession(function () {
        Auth.isLoggedIn = true;
    })

    $scope.config = Config;
    $scope.lang = Lang;
    $scope.metaTags = MetaTags;
    MetaTags.default();


    Tags.get(function (data) {
        $scope.tags = data;
    })

    $scope.logout = function () {
        Auth.logout(function () {
            Auth.isLoggedIn = false;
            $location.path('/');
        })
    }

})

blg.controller("SideCtrl", function ($scope) {
})

blg.controller("AuthCtrl", function ($scope, $location, Auth) {
    $scope.doAuth = function () {

        $scope.authError = false;

        Auth.login($scope.user,
            //if auth fails
            function () {
                $scope.user = {};
                $scope.authError = true;
            },
            //if auth success
            function () {
                Auth.isLoggedIn = true;
                $location.path('/admin');
            }
        )
    }
})

blg.controller("AdminCtrl", function ($scope, PostResource, Lang, $location, Auth) {

    Auth.checkSession(null, function () {
        $scope.loggedin = false;
        $location.path('/admin/auth');
    })

    $scope.postsLoading = true;

    $scope.posts = PostResource.query(function () {
        $scope.postsLoading = false;
    });

    $scope.deletePost = function (post, index) {

        if (confirm(Lang.sure)) {
            post.deleting = true;

            PostResource.delete({id: post._id}, function (response) {
                if (response.status == "OK") {
                    $scope.posts.splice(index, 1);
                }

            })
        }
    }
})

blg.controller("PostsCtrl", function ($scope, Config, PostResource, $routeParams, $location, MetaTags) {

    MetaTags = MetaTags.default();

    $scope.posts = [];

    $scope.readMore = function (urlTitle) {
        $location.path('/post/' + urlTitle);
    }

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

blg.controller('SinglePostCtrl', function ($scope, $routeParams, PostResource, Config, MetaTags) {

    $scope.contentLoaded = false;

    if ($routeParams.urlTitle) {
        var urlTitle = $routeParams.urlTitle;
        PostResource.get({urlTitle: urlTitle}, function (data) {

            $scope.post = data;

            if ($scope.post.title) {
                $scope.contentLoaded = true;
                MetaTags.description = $scope.post.shortContent;
                MetaTags.keywords = $scope.post.tags.join(', ');
            }
            else {

                $scope.is404 = true;

            }
        }, function () {
            console.log(arguments);
        });
    }
})

blg.controller('AddEditPostCtrl', function ($scope, PostResource, $timeout, $routeParams, $location, $filter, Auth) {

    Auth.checkSession(null, function () {
        $scope.loggedin = false;
        $location.path('/admin/auth');
    })


    if ($routeParams.urlTitle) {
        $scope.post = PostResource.get({urlTitle: $routeParams.urlTitle});

    }
    else {
        $scope.post = {tags: []};
    }

    $scope.addTag = function (tag) {
        //Tag added from list of existed tags
        if (tag) {
            if ($scope.post.tags.indexOf(tag) === -1) {
                $scope.post.tags.push(tag);
            }

        }
        //Tag added from input
        else {
            if ($scope.post.tags.indexOf(tag) === -1) {
                $scope.post.tags.push($scope.tag);
                $scope.tag = '';
            }
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
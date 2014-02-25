var blg = angular.module('blog', ['ngRoute', 'ngResource', 'ngAnimate', 'ngSanitize', 'hljs']);

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
            if (totalHeight - visibleHeight - scroll === 0 && !scope.postsLoading) {
                scope.$apply(attr.whenScrolled);
            }
        });
    };
});

blg.directive('tagAddable', function () {
    return {
        controller: function ($scope, $element, $attrs, $parse) {
            $scope.addHtmlTag = function (fieldId, startTag, endTag) {
                elm = angular.element(document.getElementById(fieldId));

                var startSel = elm[0].selectionStart;
                var endSel = elm[0].selectionEnd;
                var value = elm[0].value;

                if (startSel === endSel) {
                    return;
                }
                var selected = value.slice(startSel, endSel)
                var before = value.slice(0, startSel);
                var after = value.slice(endSel, value.length);

                var newValue = before + startTag + selected + endTag + after;

                //to update ng-model binded to textarea value
                var textAreaModel = $parse($attrs.ngModel);
                textAreaModel.assign($scope, newValue);
            }
        }
    }
})


blg.directive('dirDisqus', function ($window) {
    return {
        restrict: 'E',
        scope: {
            disqus_shortname: '@disqusShortname',
            disqus_identifier: '@disqusIdentifier',
            disqus_title: '@disqusTitle',
            disqus_url: '@disqusUrl',
            disqus_category_id: '@disqusCategoryId',
            disqus_disable_mobile: '@disqusDisableMobile',
            readyToBind: "@"
        },
        template: '<div id="disqus_thread"></div><a href="http://disqus.com" class="dsq-brlink">comments powered by <span class="logo-disqus">Disqus</span></a>',
        link: function (scope) {

            scope.$watch("readyToBind", function (isReady) {

                // If the directive has been called without the 'ready-to-bind' attribute, we
                // set the default to "true" so that Disqus will be loaded straight away.
                if (!angular.isDefined(isReady)) {
                    isReady = "true";
                }
                if (scope.$eval(isReady)) {
                    // put the config variables into separate global vars so that the Disqus script can see them
                    $window.disqus_shortname = scope.disqus_shortname;
                    $window.disqus_identifier = scope.disqus_identifier;
                    $window.disqus_title = scope.disqus_title;
                    $window.disqus_url = scope.disqus_url;
                    $window.disqus_category_id = scope.disqus_category_id;
                    $window.disqus_disable_mobile = scope.disqus_disable_mobile;

                    console.log($window.disqus_identifier);

                    // get the remote Disqus script and insert it into the DOM, but only if it not already loaded (as that will cause warnings)
                    if (!$window.DISQUS) {
                        var dsq = document.createElement('script');
                        dsq.type = 'text/javascript';
                        dsq.async = true;
                        dsq.src = '//' + scope.disqus_shortname + '.disqus.com/embed.js';
                        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
                    } else {
                        $window.DISQUS.reset({
                            reload: true
                        });
                    }
                }
            });
        }
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
            scope.$watch(attrs.dynamic, function (html) {
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
//    root: "http://ruangular.herokuapp.com",
    root: "http://localhost/blog/app",
//    apiRoot: "/api",
    apiRoot: "http://localhost:1337/api",
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
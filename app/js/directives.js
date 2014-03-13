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

blg.directive('compilebb', function ($compile) {
    return {
        restrict: 'A',
        replace: true,
        link: function (scope, ele, attrs) {
            scope.$watch(attrs.compilebb, function (html) {

                    if (html === undefined) {
                        return;
                    }

                    //regExp finding [b],[/b],[em],[/em],[code],[/code],[hl],[/hl],[title],[/title] and \n
                    var bbCodesRegExp = /\[b\]|\[\/b\]|\[em\]|\[\/em\]|\[code\]|\[\/code\]|\[hl\]|\[\/hl\]|\[title\]|\[\/title\]|\n/g;

                    var map = {
                        "[b]": "<strong>",
                        "[/b]": "</strong>",
                        "[em]": "<em>",
                        "[/em]": "</em>",
                        "[code]": "<span hljs>",
                        "[/code]": "</span>",
                        "[hl]": "<span class=\'highlighted\'>",
                        "[/hl]": "</span>",
                        "[title]": "<h2>",
                        "[/title]": "</h2>",
                        "\n": "<br>",
                    }

                    //variable for current tag (to not convert \n -> <br> inside the [code][/code])
                    var currentTag;

                    html = html.replace(bbCodesRegExp, function (match) {

                        //not replace \n with <br> inside [/code]
                        if (currentTag == '[code]' && match == "\n") {
                            return match;
                        }

                        var tag = map[match];
                        currentTag = match;

                        if (tag) {
                            return tag;
                        }
                        else return match;
                    })

                    ele.html(html);
                    $compile(ele.contents())(scope);
                }
            )

        }
    }

})

blg.directive('tagIcon', ['TagIcons', '$timeout', function (TagIcons, $timeout) {
    return {
        restrict: 'A',
        link: function (scope, el) {
            $timeout(function () {
                if (TagIcons[el.html()]) {
                    el.addClass('tag-icon ' + TagIcons[el.html()]);
                }
            }, 0);
        }
    }
}])

blg.directive('pressEnterKey', function () {
    return function (scope, el, attrs) {
        el.bind("keydown keypress", function (event) {
            event.preventDefault();

            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.pressKeyEnter;
                });
            }
        });
    }
})
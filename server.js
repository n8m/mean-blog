var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var textSearch = require('mongoose-text-search');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
    function (username, password, done) {

        if (username === config.adminLogin) {

            bcrypt.compare(password, config.adminPassword, function (err, isMatch) {
                if (err) {
                    console.log(err);
                    done(null, false);
                } else {
                    if (isMatch) {
                        done(null, true);
                    }
                    else {
                        done(null, false);
                    }
                }
            });
        }
        else {
            done(null, false);
        }
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

mustAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        return res.send(401, 'User is not authorized');
    }

};

var app = express();

var postSchema = mongoose.Schema({
    title: String,
    urlTitle: String,
    shortContent: String,
    content: String,
    tags: [String],
    date: String,
    author: String,
    translation: Boolean
})

postSchema.plugin(textSearch);
postSchema.index({ title: 'text', content: 'text', author: 'text', tags: "text" });

var Post = mongoose.model('Post', postSchema);

var config = {
    adminLogin: 'n8m',
    adminPassword: '$2a$10$bz5WMFhiyVufcm/Z7v2a4emYTBRSrOsyJD5KiBVeYr0tvicfrWSAW',
    salt: '$2a$10$bz5WMFhiyVufcm/Z7v2a4e',
    mongoURL: 'mongodb://name:K0llider@ds063218.mongolab.com:63218/angudb',
}


mongoose.connect(config.mongoURL, function (err) {
    if (err) {
        console.log('ERROR connecting to: ' + config.mongoURL + '. ' + err);
    } else {
        console.log('Succeeded connected to: ' + config.mongoURL);
    }
});

app.use(express.static(path.join(__dirname, "app"))); // запуск статического файлового сервера, который смотрит на папку public/ (в нашем случае отдает index.html)
app.use(express.cookieParser());
app.use(express.bodyParser()); // стандартный модуль, для парсинга JSON в запросах
app.use(express.methodOverride()); // поддержка put и delete
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router); // модуль для простого задания обработчиков путей
app.use(require('prerender-node').set('prerenderToken', 'Tve6yMKDsJE20UEo8ANx'));//для prerender -> для SEO


app.use(function (req, res, next) {
    var fragment = req.query._escaped_fragment_;

    if (!fragment) return next();

    if (fragment === "" || fragment === "/")
        fragment = "/index.html";

    console.log('static');
    console.log(fragment);

    try {
        var file = __dirname + "/snapshots" + fragment;
        res.redirect(file);
    } catch (err) {
        res.send(404);
    }
});


app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "meangu.ru");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.post('/api/login', passport.authenticate('local'), function (req, res) {
    res.send(200, {status: 'OK'});

});

app.get('/api/logout', function (req, res) {
    req.logout();
    res.send(200, {status: 'OK'});
});

app.get('/api/session', mustAuthenticated, function (req, res) {
    res.send(200, {status: 'OK'});
})


app.get('/api/posts', function (req, res) {
    var postsQueryParams = {};

    if (req.query.tags) {
        if (typeof req.query.tags === 'string') {
            postsQueryParams = {tags: req.query.tags};
        }
        else {
            postsQueryParams = {tags: { $in: req.query.tags}};
        }
    }

    if (req.query.search) {
        var result = [];

        Post.textSearch(req.query.search, {limit: req.query.limit, language: "russian"}, function (err, output) {
            if (err) {
                res.send(500, {error: err});
            }
            else {
                for (var i = req.query.offset, len = output.results.length; i < len && i < req.query.offset + req.query.limit; i++) {
                    result.push(output.results[i].obj);
                }
                res.send(result);
            }
        });
    }

    Post.find(postsQueryParams).skip(req.query.offset).limit(req.query.limit).sort({date: -1}).exec(function (e, posts) {
        res.send(posts);
    });

})


app.get('/api/posts/:urlTitle*', function (req, res) {

    var urlTitle = req.param('urlTitle');

    Post.findOne({urlTitle: urlTitle}).exec(function (err, post) {
        if (!post) {
            res.send(404, {error: 'Not found'});
        }
        else {
            if (err) {
                res.send(500, {error: err});
            }
            else {
                res.send(post);
            }
        }
    });
})

app.post('/api/posts', mustAuthenticated, function (req, res) {

    var newPost = req.body;
    newPost.date = new Date();

    Post.create(newPost, function (err) {
        if (err) {
            res.send(500, {error: err});
        }
        else {
            res.send(200, {status: 'OK'});
        }
    })

})

app.put('/api/posts', mustAuthenticated, function (req, res) {
    var id = req.body._id;
    delete req.body._id;

    Post.findByIdAndUpdate(id, req.body, function (err, post) {
        console.log(arguments);
        if (!post)
            res.send(404, {error: 'Not Found'});
        else {
            if (err) {
                res.send(500, {error: err});
            }
            else {
                res.send(200, {status: 'OK'});
            }
        }
    })
})

app.delete('/api/posts/:id*', mustAuthenticated, function (req, res) {
    Post.findByIdAndRemove(req.param('id'), function (err, post) {
        if (!post) {
            res.send(404, {error: 'Not found'});
        }
        else {
            if (!err) {
                res.send(200, {status: 'OK'});
            }
            else {
                res.send(500, {error: err})
            }
        }
    });
})

app.get('/api/tags', function (req, res) {

    //where to put this function?
    function removeDuplicates(arr) {
        arr.sort();
        var i = arr.length - 1;
        while (i > 0) {
            if (arr[i] === arr[i - 1]) arr.splice(i, 1);
            i--;
        }
    }

    Post.find({}, {tags: 1, _id: 0}).exec(function (err, tags) {
        var allTags = [];

        for (var i = 0, len = tags.length; i < len; i++) {
            for (var j = 0, leng = tags[i].tags.length; j < leng; j++) {
                allTags.push(tags[i].tags[j]);
            }
        }
        removeDuplicates(allTags);
        res.send(allTags);
    })
})


app.get('/*', function (req, res, next) {
    res.sendfile(__dirname + '/app/index.html');
});


app.listen(process.env.PORT || 1337, function () {
    console.log('Express server listening on port' + process.env.PORT);
});



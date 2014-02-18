var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var textSearch = require('mongoose-text-search');

var app = express();


var postSchema = mongoose.Schema({
    title: String,
    urlTitle: String,
    shortContent: String,
    content: String,
    tags: [String],
    date: String,
    author: String
})

postSchema.plugin(textSearch);
postSchema.index({ title: 'text', content: 'text', author: 'text', tags: "text" });

var Post = mongoose.model('Post', postSchema);

var uristring = 'mongodb://name:K0llider@ds063218.mongolab.com:63218/angudb' || 'mongodb://localhost/angudb';

mongoose.connect(uristring, function (err) {
    if (err) {
        console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + uristring);
    }
});

app.use(express.favicon()); // отдаем стандартную фавиконку, можем здесь же свою задать
app.use(express.logger('dev')); // выводим все запросы со статусами в консоль
app.use(express.bodyParser()); // стандартный модуль, для парсинга JSON в запросах
app.use(express.methodOverride()); // поддержка put и delete
app.use(app.router); // модуль для простого задания обработчиков путей
app.use(express.static(path.join(__dirname, "app"))); // запуск статического файлового сервера, который смотрит на папку public/ (в нашем случае отдает index.html)


app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

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

    Post.find(postsQueryParams).skip(req.query.offset).limit(req.query.limit).exec(function (e, posts) {
        res.send(posts);
    });

});

app.get('/api/posts/:urlTitle*', function (req, res) {

    var urlTitle = req.param('urlTitle');

    Post.findOne({urlTitle: urlTitle}).exec(function (err, post) {
        if (err) {
            res.send(500, {error: err});
        }
        else {
            res.send(post);
        }
    });
})

app.post('/api/posts', function (req, res) {
    var newPost = req.body;
    newPost.date = new Date();

    Post.create(newPost, function (err) {
        if (err) {
            res.send(500, {error: err});
        }
        else {
            res.send(200);
        }
    })

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

app.listen(process.env.PORT || 1337, function () {
    console.log('Express server listening on port 1337');
});



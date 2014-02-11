var express = require('express');
var mongoose = require('mongoose');
var textSearch = require('mongoose-text-search');


var app = express();

// create our schema
var postSchema = mongoose.Schema({
    title: String,
    urlTitle: String,
    shortContent: String,
    content: String,
    tags: [String],
    date: String,
    author: String
})

// give our schema text search capabilities
postSchema.plugin(textSearch);

// add a text index to the tags array
postSchema.index({ title: 'text', content: 'text', author: 'text', tags: "text" });

// test it out
var Post = mongoose.model('Post', postSchema);

//var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error:'));
//db.once('open', function callback () {
//    console.log('connected');
//});

var tagSchema = mongoose.Schema({
    title: String,
    urlTitle: String
})

var Tag = mongoose.model('Tag', postSchema);

mongoose.connect('mongodb://localhost/angudb', function () {


});

//var posts = [
//    {
//        "title": "Assistix",
//        "urlTitle": "West",
//        "shortContent": "Ipsum adipisicing sunt amet amet sunt qui aute commodo ipsum. Sit duis non eu consectetur minim. Adipisicing qui duis adipisicing dolore nisi pariatur dolor Lorem id culpa do Lorem culpa ex. Labore ea esse consequat incididunt nisi cupidatat. Veniam tempor quis id laborum voluptate occaecat duis ipsum voluptate consectetur consectetur aute. Ex aliquip ipsum magna sit in laborum proident velit cillum aliquip aliquip esse consequat sunt. Consectetur laboris ipsum sint ad anim sit ea anim.\r\n",
//        "content": "Anim ullamco in id tempor nostrud irure in in do magna. Nisi non eu ut incididunt occaecat aute sunt Lorem amet sunt sunt proident. Est elit excepteur et non cupidatat sit et.\r\nExercitation consectetur elit voluptate ullamco ullamco non reprehenderit esse reprehenderit. Officia deserunt ut ipsum laboris exercitation enim nisi id consectetur. Nulla commodo voluptate non culpa nostrud proident do. Velit mollit sit nisi id.\r\nEx aliqua ea quis velit deserunt. Anim aliqua adipisicing duis laborum ea nulla esse do qui do. Cupidatat commodo nisi minim occaecat dolor cillum adipisicing proident.\r\n",
//        "tags": [
//            "duis",
//            "fugiat",
//            "laborum",
//            "nisi",
//            "do",
//            "pariatur",
//            "eiusmod"
//        ],
//        "date": "2003-11-19T21:51:34 -03:00",
//        "author": "Diana"
//    },
//    {
//        "title": "Dragbot",
//        "urlTitle": "Sexton",
//        "shortContent": "Aute ullamco aute duis veniam enim voluptate incididunt proident. Ullamco anim occaecat laboris ut. Voluptate nostrud deserunt eiusmod enim sint ad. Sunt commodo mollit ullamco culpa in ut amet laboris sunt deserunt cillum. Cillum id exercitation officia Lorem voluptate pariatur. Aute laborum tempor minim dolore aliqua incididunt anim reprehenderit mollit proident eu cupidatat sunt id. Dolor culpa nisi aliqua magna fugiat minim elit reprehenderit.\r\n",
//        "content": "Est excepteur commodo nisi labore dolor culpa non aliqua in reprehenderit veniam incididunt sint pariatur. Est aute aliquip ullamco eu eu cupidatat exercitation consequat. Pariatur laborum amet deserunt consectetur eu. Ad veniam sint commodo nisi esse elit occaecat elit. Pariatur incididunt velit in qui amet cillum mollit eu magna eu ea occaecat laboris anim. Labore cillum ipsum magna consequat Lorem in exercitation ut eiusmod.\r\nId sint culpa eu proident laborum proident ut est adipisicing eu labore duis nisi. Ea ut cillum ad pariatur commodo qui. Exercitation pariatur deserunt non anim cillum do nostrud. Eiusmod sit esse id esse amet ipsum esse dolor cupidatat ipsum esse laborum enim. Elit enim officia ad ex labore ipsum tempor est reprehenderit amet ex ex non nisi.\r\nAliquip culpa ea Lorem fugiat cillum. Fugiat et ex ad nisi aliqua sit occaecat. Tempor amet mollit anim magna proident. Sunt quis veniam cillum anim reprehenderit cillum in incididunt ipsum aliquip fugiat nostrud aliquip. Ea tempor mollit adipisicing cupidatat.\r\n",
//        "tags": [
//            "commodo",
//            "aliquip",
//            "sint",
//            "eu",
//            "magna",
//            "laboris",
//            "cupidatat"
//        ],
//        "date": "2006-04-15T13:44:19 -04:00",
//        "author": "Della"
//    },
//    {
//        "title": "Malathion",
//        "urlTitle": "Greer",
//        "shortContent": "Cupidatat non commodo proident non occaecat fugiat. Sint culpa minim ut ea dolor amet laboris non aliquip ex aliqua. Irure enim culpa labore cupidatat consectetur ipsum culpa qui deserunt ea. Do proident consequat est tempor consectetur fugiat eu. Esse proident do mollit velit occaecat in sint nostrud et. Laboris eiusmod culpa nisi cillum duis ipsum veniam commodo dolore eu ut quis do.\r\n",
//        "content": "Deserunt cillum esse non duis enim cillum Lorem ut mollit magna. Incididunt aliqua qui magna labore incididunt nulla aute est deserunt ea dolore. Elit ullamco voluptate commodo aliquip consequat nostrud tempor qui aliquip ullamco fugiat dolore. Adipisicing anim anim pariatur culpa excepteur sint culpa. Qui nisi mollit do sit ea exercitation veniam veniam id non amet ut amet voluptate. Ex id quis ut elit.\r\nUllamco labore laborum dolor irure in ad anim. Lorem minim aute do fugiat ea cillum tempor fugiat mollit dolore. Commodo laboris irure excepteur sit adipisicing do pariatur nulla commodo velit exercitation nisi. Pariatur laborum magna magna eu mollit veniam adipisicing Lorem ut adipisicing ullamco irure minim.\r\nElit occaecat qui dolore aliqua. Amet mollit non do consectetur reprehenderit elit ea cillum veniam sit ex mollit nulla qui. Tempor excepteur reprehenderit sint id voluptate ex in commodo amet magna exercitation. Mollit voluptate mollit minim ullamco sunt officia eiusmod reprehenderit est sint occaecat nisi. Eiusmod elit elit duis dolore culpa ipsum voluptate consequat. Consectetur ut qui officia proident dolore. Labore nisi ex labore cupidatat eiusmod nisi duis velit est sint excepteur.\r\n",
//        "tags": [
//            "incididunt",
//            "non",
//            "ad",
//            "exercitation",
//            "enim",
//            "irure",
//            "sint"
//        ],
//        "date": "1992-11-02T02:39:44 -03:00",
//        "author": "Angelina"
//    },
//    {
//        "title": "Tersanki",
//        "urlTitle": "Fuller",
//        "shortContent": "Dolore est labore cillum aliqua. Enim aliqua commodo in esse cupidatat irure aute amet aliquip duis commodo. Magna enim commodo dolore tempor deserunt sit minim voluptate laboris culpa dolor aliqua ea. Enim ut dolor pariatur adipisicing cupidatat aute qui dolor qui quis sint excepteur. Voluptate exercitation eiusmod officia aliquip ut aute ullamco anim Lorem. Proident ut ipsum incididunt dolor commodo sunt nisi non minim nulla ullamco. Quis Lorem aliquip tempor sint elit exercitation culpa quis.\r\n",
//        "content": "Voluptate magna in ex anim et est eiusmod amet non commodo cillum. Id enim et in velit aliquip excepteur. Lorem anim labore proident do dolore occaecat labore cillum consequat aute sint ex. Aliquip enim amet aliquip duis dolor officia ut officia. Elit fugiat fugiat sit et.\r\nVeniam sit ullamco veniam aute. Anim Lorem nostrud laboris ad veniam culpa excepteur proident adipisicing ad nulla ea. Est non consequat excepteur minim voluptate laborum nulla sunt irure ullamco.\r\nSit aliquip officia tempor enim ex velit Lorem est irure reprehenderit elit Lorem labore dolore. Aute exercitation sunt ex quis. Anim dolore laboris nulla enim dolore id in. Consectetur ad tempor proident quis magna ad.\r\n",
//        "tags": [
//            "elit",
//            "dolore",
//            "minim",
//            "sint",
//            "dolore",
//            "et",
//            "eu"
//        ],
//        "date": "1999-07-13T15:52:01 -04:00",
//        "author": "Yates"
//    },
//    {
//        "title": "Opticall",
//        "urlTitle": "Simon",
//        "shortContent": "Deserunt Lorem dolor do proident amet est. Deserunt exercitation sunt nostrud in commodo reprehenderit ut. Anim amet minim consectetur enim deserunt nisi eiusmod ad. Deserunt deserunt deserunt labore occaecat qui laborum.\r\n",
//        "content": "Duis qui pariatur culpa cupidatat irure est ad occaecat irure cupidatat excepteur labore consectetur anim. Sit do ut magna labore sint. Do est laborum incididunt exercitation ad nostrud duis labore aute.\r\nAd dolore qui irure exercitation qui ad et qui proident ipsum velit. Est incididunt id cillum aliqua minim proident exercitation do et aliquip do aliquip. Incididunt exercitation ullamco minim sunt aliquip. Commodo cupidatat est pariatur reprehenderit mollit irure amet amet veniam aliqua eiusmod anim ad enim. Ea et commodo ipsum sint do velit in. Pariatur incididunt do duis ullamco dolore ut cillum ipsum labore elit ex eiusmod cillum excepteur.\r\nReprehenderit duis eu Lorem nisi reprehenderit irure enim esse. Exercitation dolor reprehenderit est fugiat fugiat aute reprehenderit ea quis fugiat anim dolore. Ex dolore in adipisicing officia Lorem.\r\n",
//        "tags": [
//            "eiusmod",
//            "minim",
//            "culpa",
//            "proident",
//            "enim",
//            "ea",
//            "laboris"
//        ],
//        "date": "2000-08-08T02:48:37 -04:00",
//        "author": "Brady"
//    },
//    {
//        "title": "Genekom",
//        "urlTitle": "Martin",
//        "shortContent": "Qui adipisicing magna commodo eiusmod labore id nulla non enim ut qui est. Do est consectetur proident sit id anim. Consectetur ut commodo duis culpa Lorem velit consectetur nostrud dolor.\r\n",
//        "content": "Do nulla id aliquip nulla excepteur. Aliquip nostrud et non elit nulla labore adipisicing excepteur reprehenderit dolor commodo elit dolor nulla. Nisi reprehenderit do aute laboris ea mollit ullamco ea sunt elit Lorem sunt. Id et non proident dolore proident et consectetur consequat eu exercitation dolore adipisicing. Culpa dolore tempor commodo ex culpa esse do. In Lorem commodo incididunt excepteur dolor velit sint anim.\r\nVeniam ex exercitation laboris velit fugiat aliquip adipisicing deserunt sunt in incididunt laboris. Labore exercitation culpa fugiat cupidatat velit enim nisi qui eiusmod officia eiusmod ipsum veniam est. Tempor eiusmod culpa est officia minim tempor fugiat sit.\r\nIncididunt incididunt pariatur et eu occaecat enim irure nulla tempor in duis incididunt occaecat enim. Consectetur eu commodo nulla quis ut duis Lorem. Laborum enim voluptate anim ullamco minim occaecat velit reprehenderit reprehenderit consectetur cupidatat irure veniam. Cupidatat voluptate consequat minim sit minim irure Lorem velit labore amet laboris. Eiusmod magna ipsum aute fugiat enim anim incididunt excepteur laboris.\r\n",
//        "tags": [
//            "incididunt",
//            "excepteur",
//            "deserunt",
//            "voluptate",
//            "proident",
//            "sit",
//            "aute"
//        ],
//        "date": "1991-01-06T17:49:14 -03:00",
//        "author": "Lesley"
//    },
//    {
//        "title": "Magneato",
//        "urlTitle": "Patrick",
//        "shortContent": "Tempor et ex ad labore ut. Cillum ipsum duis eiusmod labore elit. Proident minim laboris deserunt duis ea velit tempor velit ipsum ipsum. Eiusmod excepteur labore elit incididunt.\r\n",
//        "content": "Fugiat tempor excepteur mollit tempor in nisi velit ullamco commodo exercitation. Culpa ullamco elit exercitation cupidatat proident occaecat cillum laborum pariatur est aute ad. Cupidatat aute ad elit laboris consequat qui cupidatat commodo minim labore culpa. Esse dolore duis reprehenderit ipsum exercitation veniam do velit sint do aliquip. Occaecat ex dolor cillum anim mollit consectetur aliqua ut ipsum incididunt non reprehenderit eiusmod. Tempor exercitation tempor aliquip duis Lorem anim. Laboris aliquip irure exercitation consectetur laboris officia velit minim ad laborum laboris aliqua eu.\r\nAdipisicing ut consectetur culpa culpa elit non tempor consequat adipisicing incididunt. Qui elit irure magna ullamco magna do aliquip et tempor. Cillum voluptate consequat ullamco consectetur ullamco velit. Dolor incididunt Lorem ea dolor cillum in. Deserunt aute labore enim tempor aute veniam.\r\nIncididunt Lorem exercitation est officia sit. Sit veniam veniam laborum mollit occaecat proident laboris labore non elit aliqua ex ipsum. Id exercitation occaecat consectetur sint ad tempor ad ullamco. Mollit ad excepteur consequat aliqua.\r\n",
//        "tags": [
//            "laboris",
//            "ut",
//            "proident",
//            "velit",
//            "amet",
//            "amet",
//            "laboris"
//        ],
//        "date": "2013-12-25T05:37:05 -03:00",
//        "author": "Peters"
//    },
//    {
//        "title": "Comvey",
//        "urlTitle": "Pope",
//        "shortContent": "Eiusmod sunt tempor irure est consequat deserunt ullamco. Mollit ipsum eu nostrud officia officia non cupidatat adipisicing. Irure anim ipsum voluptate nisi. Mollit dolor pariatur fugiat eiusmod dolor velit pariatur nostrud. Minim tempor ut magna eu aute anim pariatur amet aliqua anim et.\r\n",
//        "content": "Lorem sit aliqua in esse ex. Adipisicing velit reprehenderit aute culpa cupidatat quis sit proident veniam adipisicing sit. Incididunt ex velit proident id amet laboris excepteur laboris commodo consectetur officia veniam. Sunt est esse nisi culpa in. Consequat aute veniam laborum ut consectetur esse dolor deserunt incididunt ullamco mollit nulla consequat. Incididunt esse occaecat et sunt labore ea ipsum.\r\nEu id aute ea reprehenderit voluptate. Amet laboris in incididunt veniam enim ipsum et consequat irure ut duis anim. Anim do id nostrud velit irure cillum aute consequat consectetur id occaecat labore magna amet.\r\nDuis nostrud ea fugiat quis duis cillum. Aliquip ut voluptate anim occaecat ad sit cupidatat proident Lorem tempor esse. Duis sit minim minim culpa cupidatat id aliquip consequat dolor sint cillum aliquip eiusmod. Nostrud excepteur proident eiusmod sit est ullamco minim eiusmod duis amet voluptate proident anim. Aliquip eiusmod consequat officia sit eu Lorem amet nostrud voluptate exercitation. Quis ipsum ex ex anim dolore ad aliqua.\r\n",
//        "tags": [
//            "proident",
//            "in",
//            "culpa",
//            "anim",
//            "occaecat",
//            "ex",
//            "Lorem"
//        ],
//        "date": "1999-08-11T01:50:41 -04:00",
//        "author": "Price"
//    },
//    {
//        "title": "Mobildata",
//        "urlTitle": "Juarez",
//        "shortContent": "Reprehenderit Lorem duis aliquip fugiat irure aliquip qui nisi nulla eu Lorem. Cillum nostrud adipisicing velit do est sint ad aliqua officia enim excepteur officia qui. Do culpa id ea exercitation enim.\r\n",
//        "content": "Enim dolor do sit amet commodo ipsum officia id excepteur anim excepteur. Amet et aliquip Lorem amet pariatur consectetur adipisicing ut labore elit eiusmod cupidatat consectetur. Velit eiusmod aute do non et ullamco do consequat officia anim proident. Tempor et proident velit magna consequat minim ad ad enim irure et. Consectetur veniam commodo ipsum officia adipisicing ex irure non cillum sit. Consectetur commodo in Lorem ipsum ut sit. Laboris sunt reprehenderit qui elit culpa laboris.\r\nEa ad irure proident reprehenderit reprehenderit consectetur laborum deserunt ex irure sint id. Consectetur qui mollit ullamco ex ex non veniam amet. Esse labore velit officia sint aliqua ad dolor fugiat. Reprehenderit dolor non reprehenderit in et id voluptate et proident. Sit reprehenderit quis anim sit consectetur cillum est.\r\nIncididunt consequat et voluptate consequat deserunt. Duis pariatur nulla commodo eiusmod qui nulla est fugiat sint mollit reprehenderit. Qui incididunt veniam ullamco eiusmod exercitation Lorem aliquip nisi eiusmod laborum dolore aliquip voluptate. Tempor adipisicing laboris sint tempor. Esse ut dolor exercitation et dolor. Veniam laborum ex eu voluptate ullamco tempor est eu aliqua in qui. In voluptate laborum ex qui esse cupidatat in nostrud.\r\n",
//        "tags": [
//            "veniam",
//            "ex",
//            "laborum",
//            "velit",
//            "aliqua",
//            "amet",
//            "exercitation"
//        ],
//        "date": "2005-08-05T18:26:33 -04:00",
//        "author": "Ann"
//    },
//    {
//        "title": "Hinway",
//        "urlTitle": "Chaney",
//        "shortContent": "Mollit sint officia esse et occaecat nulla sint eiusmod eu fugiat magna occaecat qui cupidatat. Incididunt sit laborum incididunt pariatur non occaecat elit sit cupidatat minim enim do nisi id. Et sunt aute duis velit proident quis sunt qui sint occaecat pariatur ex excepteur. Proident consequat elit excepteur nostrud sunt. Consequat tempor anim adipisicing aute magna pariatur minim occaecat. Anim ut officia eu laborum dolor occaecat elit. Velit deserunt est adipisicing nisi Lorem minim ut excepteur.\r\n",
//        "content": "Esse consectetur pariatur consequat exercitation id veniam velit culpa commodo sit. Dolor id proident velit non adipisicing non reprehenderit cupidatat commodo. Amet officia dolor nostrud adipisicing duis dolor. Ea dolor ullamco officia magna consectetur ut cupidatat minim est deserunt ea in nisi.\r\nIn mollit quis sint minim dolore eu reprehenderit sunt eiusmod ut. Pariatur occaecat proident adipisicing ullamco cillum magna amet dolor irure pariatur. Eu incididunt esse ad ullamco aliqua.\r\nNon eiusmod esse ex in non ea ea quis et nostrud nulla aliqua fugiat amet. Proident et veniam duis est incididunt laborum sint non pariatur excepteur ut officia elit veniam. Ipsum aliqua eu in in mollit elit anim dolor. Eu ipsum labore voluptate voluptate et irure. Aliquip laboris id sunt ullamco. Anim excepteur deserunt adipisicing sunt anim cillum consectetur anim pariatur labore et irure tempor aliquip. Enim culpa est culpa in anim non commodo labore et.\r\n",
//        "tags": [
//            "ipsum",
//            "mollit",
//            "mollit",
//            "occaecat",
//            "nostrud",
//            "nostrud",
//            "ullamco"
//        ],
//        "date": "2003-07-20T23:54:09 -04:00",
//        "author": "Mallory"
//    },
//    {
//        "title": "Fortean",
//        "urlTitle": "Aguirre",
//        "shortContent": "Officia ex adipisicing officia ex aute quis. Consectetur occaecat laborum amet excepteur anim adipisicing adipisicing Lorem labore. Reprehenderit anim ex ullamco officia do. Laborum eiusmod reprehenderit magna ipsum nostrud pariatur aliquip aliquip voluptate non commodo. Consequat incididunt nulla occaecat nisi nulla consequat do nisi. Non amet dolor aute qui. Aliqua dolor laboris consequat fugiat magna commodo eu aute eu velit minim qui laborum ullamco.\r\n",
//        "content": "Occaecat esse est dolor ipsum. Minim laborum labore in dolore quis tempor et. Cupidatat sunt est adipisicing pariatur ullamco quis cillum. Enim est laboris nulla eu dolore est labore minim mollit reprehenderit tempor non. Nulla cillum voluptate sunt eu duis. Do laboris non anim anim sit dolore excepteur enim adipisicing in.\r\nDolore eiusmod quis exercitation aute in consequat commodo laboris dolore. Elit sunt consequat ea elit anim nulla. Culpa est elit eu amet aute mollit tempor id velit enim magna velit ea. Fugiat aliquip est culpa nulla sit. Velit incididunt incididunt fugiat ea amet ullamco. Consectetur veniam irure labore labore ea consequat reprehenderit. Dolore eu amet consectetur duis magna enim labore esse cillum sunt culpa labore fugiat.\r\nAdipisicing officia tempor in irure qui magna laboris eu Lorem proident. Non nostrud incididunt excepteur incididunt irure id. Est amet ea enim veniam elit sunt magna sunt esse duis ea. Eiusmod ad mollit ipsum magna voluptate esse ex. Mollit voluptate eiusmod aute duis.\r\n",
//        "tags": [
//            "velit",
//            "sunt",
//            "officia",
//            "commodo",
//            "ipsum",
//            "fugiat",
//            "voluptate"
//        ],
//        "date": "1998-10-12T06:38:51 -04:00",
//        "author": "Weber"
//    },
//    {
//        "title": "Andershun",
//        "urlTitle": "Barrett",
//        "shortContent": "Esse ut cillum mollit adipisicing adipisicing cupidatat voluptate fugiat consectetur enim incididunt velit. Ea laborum dolore sint commodo consequat excepteur consequat eu. Occaecat enim dolor mollit enim id proident id. Tempor ex irure ea do ad quis laboris nostrud in laboris. Pariatur est irure dolore est reprehenderit elit reprehenderit laboris laborum nisi est.\r\n",
//        "content": "Enim id reprehenderit culpa nisi sunt ullamco nostrud et in mollit minim nostrud. Deserunt anim excepteur occaecat commodo ipsum consequat ipsum cupidatat laboris. Aute enim voluptate pariatur id mollit nisi pariatur enim dolor sunt magna elit est. Sint voluptate enim ea tempor.\r\nEst dolor aliqua ullamco quis et excepteur nostrud aute velit. Officia ut eu anim eiusmod. Ex exercitation incididunt minim dolor adipisicing laborum ea proident laboris minim laboris. Excepteur nostrud Lorem ullamco pariatur pariatur ut Lorem anim ea incididunt anim labore tempor.\r\nNulla veniam aliqua irure labore minim ex pariatur. Id ea sint ut consequat commodo anim. Sit anim ipsum aliquip laborum aute et amet proident magna dolor aliqua esse magna. Ad laborum pariatur anim ipsum minim non ut anim aliquip id aliqua esse eiusmod. Irure ea Lorem consequat aliquip et et ad mollit reprehenderit sunt.\r\n",
//        "tags": [
//            "esse",
//            "aliqua",
//            "mollit",
//            "nostrud",
//            "nulla",
//            "eu",
//            "enim"
//        ],
//        "date": "2011-12-19T01:19:12 -03:00",
//        "author": "Cote"
//    },
//    {
//        "title": "Primordia",
//        "urlTitle": "Dominguez",
//        "shortContent": "Ipsum non tempor qui laboris amet consectetur eiusmod voluptate do officia. Adipisicing aliqua veniam non incididunt laboris adipisicing voluptate consectetur ut occaecat laboris velit adipisicing. Ipsum ullamco occaecat ad ex officia et mollit labore proident non occaecat aliquip exercitation ullamco.\r\n",
//        "content": "Dolore labore consectetur anim cillum esse esse culpa et est voluptate excepteur. Magna laborum velit nisi deserunt consequat Lorem. Culpa enim reprehenderit eiusmod irure commodo ex. Aliqua id pariatur qui adipisicing sunt fugiat aliqua sunt. Aliqua do excepteur velit non non excepteur cupidatat dolore ea. Ipsum eiusmod est mollit voluptate tempor proident dolor deserunt. Quis laboris ad esse reprehenderit et amet mollit dolor officia.\r\nVeniam eu deserunt cillum deserunt fugiat in labore incididunt dolore proident ex. Aliqua voluptate esse aliquip aute exercitation. Adipisicing deserunt et ullamco fugiat mollit eu sint enim minim id fugiat. Ad ullamco nulla qui ipsum occaecat veniam duis excepteur quis sunt ad anim magna nisi. Mollit ex commodo tempor aliquip. Veniam voluptate ipsum laboris nostrud anim nulla dolore esse duis duis. Consequat excepteur laboris labore in Lorem officia sint laborum fugiat proident qui.\r\nProident dolore irure nisi adipisicing est occaecat anim cillum fugiat officia irure in est dolor. Et laborum nisi excepteur minim et velit ullamco deserunt ut. Esse magna et fugiat incididunt amet adipisicing reprehenderit officia proident ad non. Qui excepteur do aliquip in est amet Lorem eu qui magna nulla consequat officia ex.\r\n",
//        "tags": [
//            "laboris",
//            "fugiat",
//            "labore",
//            "incididunt",
//            "elit",
//            "nisi",
//            "exercitation"
//        ],
//        "date": "2007-07-04T06:01:43 -04:00",
//        "author": "Cassie"
//    },
//    {
//        "title": "Hometown",
//        "urlTitle": "Cain",
//        "shortContent": "Officia dolor incididunt tempor tempor consectetur ipsum eiusmod magna cillum. Irure nisi deserunt dolore ipsum culpa commodo. Amet tempor officia voluptate consequat adipisicing excepteur esse nostrud magna. Sit cillum ea aliqua do proident duis ex est ipsum exercitation incididunt commodo Lorem. Id eu aliquip nulla mollit ea consequat ullamco aute sint. Esse consequat fugiat ad quis nostrud cillum.\r\n",
//        "content": "Adipisicing non pariatur do elit irure sunt ex nostrud cillum anim. Pariatur reprehenderit excepteur eiusmod ipsum nisi magna quis cupidatat laborum mollit est. Officia aliquip consectetur do dolore. Ex dolore elit nulla sit enim proident laborum. Magna non laboris ea elit non ea aliquip.\r\nAmet Lorem exercitation aliquip Lorem labore ullamco nostrud cillum. Do cupidatat dolor ipsum sint quis. Nostrud nostrud nostrud et enim ad sit nostrud nulla dolore dolor voluptate. Ad eu excepteur non eu.\r\nEa do laborum ullamco excepteur aute pariatur nostrud do occaecat Lorem laboris dolore duis. Occaecat enim ut aute est ex nostrud. Reprehenderit reprehenderit est aute adipisicing elit deserunt id aliqua occaecat irure. Voluptate ut ullamco ad reprehenderit in voluptate anim labore occaecat reprehenderit elit enim nisi. Sint deserunt minim excepteur eiusmod veniam ut in ut ipsum sunt et ut aliqua reprehenderit. Ut laboris quis qui pariatur.\r\n",
//        "tags": [
//            "cupidatat",
//            "aute",
//            "elit",
//            "duis",
//            "enim",
//            "aliqua",
//            "veniam"
//        ],
//        "date": "2002-07-30T05:42:52 -04:00",
//        "author": "Yolanda"
//    },
//    {
//        "title": "Kongle",
//        "urlTitle": "Hoffman",
//        "shortContent": "Veniam eu esse excepteur laboris exercitation laborum ipsum Lorem anim ea amet ipsum. Aliqua adipisicing mollit exercitation excepteur enim aute. Lorem ea pariatur eu Lorem velit aliquip sunt nostrud irure cillum eiusmod.\r\n",
//        "content": "Et et pariatur cupidatat cupidatat non ea et aute enim magna non. Elit dolor aliqua sit laboris ullamco enim anim ullamco tempor aute reprehenderit. Mollit aliqua tempor labore Lorem velit tempor consectetur aute mollit exercitation. Ea quis duis sit cupidatat quis exercitation consectetur aliqua ad. Magna Lorem quis mollit laborum officia et irure aliqua ad culpa labore excepteur. Excepteur reprehenderit occaecat non eiusmod aliquip ex officia dolor.\r\nIpsum nisi reprehenderit ex nisi sunt amet et cupidatat adipisicing eu mollit adipisicing. Enim ut amet eiusmod anim ad ullamco pariatur elit ut aute dolor consectetur fugiat. Officia ea ullamco labore irure consectetur non. Aliqua esse cupidatat ex culpa quis velit.\r\nSint est elit sint consectetur cupidatat cupidatat commodo tempor in exercitation. Est ut mollit deserunt nisi. Duis adipisicing velit dolore incididunt eu ea ad.\r\n",
//        "tags": [
//            "sit",
//            "nostrud",
//            "exercitation",
//            "nulla",
//            "adipisicing",
//            "consequat",
//            "id"
//        ],
//        "date": "1996-08-18T08:00:21 -04:00",
//        "author": "Judy"
//    },
//    {
//        "title": "Pigzart",
//        "urlTitle": "Dorsey",
//        "shortContent": "Id proident dolore ex ullamco aliqua officia ipsum veniam sint adipisicing aliquip pariatur. Velit reprehenderit occaecat reprehenderit dolor aliqua fugiat nostrud qui ad magna. Esse amet et officia exercitation sint ad.\r\n",
//        "content": "Occaecat nulla deserunt qui incididunt sunt eu in est. Id amet nisi aliqua in ad occaecat laboris amet enim sit dolor et. Consectetur anim do esse mollit nisi deserunt dolor tempor sit aliqua laborum. Voluptate enim et anim fugiat adipisicing minim proident Lorem cillum adipisicing minim voluptate in aliqua.\r\nSint fugiat reprehenderit do duis irure magna aliquip aliqua aliqua. Lorem eu nulla aliqua deserunt. Officia non fugiat anim eiusmod. Proident adipisicing laboris commodo dolor consectetur.\r\nConsequat adipisicing laboris proident culpa veniam sit quis qui pariatur amet cillum amet mollit. Aute proident in ad eiusmod irure Lorem cupidatat. Proident nisi amet nulla tempor commodo occaecat Lorem minim. Ullamco esse minim cillum labore magna dolor cillum aliquip ex non sunt. Dolor enim nisi fugiat do sit magna exercitation culpa veniam laborum.\r\n",
//        "tags": [
//            "est",
//            "ullamco",
//            "Lorem",
//            "laboris",
//            "voluptate",
//            "occaecat",
//            "nulla"
//        ],
//        "date": "2003-02-11T13:28:52 -03:00",
//        "author": "Goodman"
//    },
//    {
//        "title": "Boilcat",
//        "urlTitle": "Beach",
//        "shortContent": "Consectetur culpa officia ad et est ea id eu esse labore. Proident aliqua elit duis deserunt eiusmod consectetur est labore esse in tempor ut magna. Do consectetur aliqua veniam eu tempor ad fugiat aliquip Lorem ea excepteur culpa velit minim. Aute cillum nisi culpa consectetur.\r\n",
//        "content": "Incididunt culpa non mollit Lorem aliqua ea. Anim labore sint excepteur sint pariatur amet excepteur mollit excepteur dolor aute. Quis occaecat sint adipisicing in pariatur nulla. Occaecat ea veniam aute officia dolore tempor aliquip irure deserunt esse. Voluptate aliqua do cupidatat sit ad duis dolor exercitation laborum dolore ea aliquip reprehenderit.\r\nAliquip qui nostrud enim duis laborum do aute elit elit in aliqua. Labore sint laboris enim elit voluptate adipisicing. Aute dolor cillum ea qui nisi minim ut. Velit cillum et esse mollit ipsum consequat ullamco sunt ipsum ullamco eiusmod consectetur aliqua.\r\nSit cillum commodo quis veniam ullamco dolore ad incididunt irure tempor non. Nulla sunt fugiat tempor tempor est aliqua reprehenderit quis occaecat laboris consequat voluptate et. Adipisicing ad consequat pariatur id.\r\n",
//        "tags": [
//            "nisi",
//            "Lorem",
//            "aliqua",
//            "culpa",
//            "magna",
//            "quis",
//            "fugiat"
//        ],
//        "date": "1997-04-10T06:14:28 -04:00",
//        "author": "Lorena"
//    },
//    {
//        "title": "Glasstep",
//        "urlTitle": "Whitehead",
//        "shortContent": "Qui sint sunt voluptate voluptate culpa aliqua dolor deserunt eu laborum voluptate est. Anim ad aliqua ut nostrud dolor. Exercitation ipsum mollit veniam Lorem enim officia pariatur velit eu veniam ex consequat consectetur ipsum. Incididunt dolor aute irure sunt. Reprehenderit sit et commodo nostrud in eiusmod exercitation.\r\n",
//        "content": "Et labore eu cillum dolor non ipsum proident elit in dolore aute. Anim nisi commodo id officia. Cillum sint aute nulla reprehenderit exercitation officia in elit sint sunt magna in qui qui. Adipisicing sint amet commodo cupidatat ad reprehenderit. Consequat dolor tempor id deserunt do ut incididunt tempor sint enim tempor amet esse. Pariatur consectetur aute duis aute et exercitation commodo enim est id.\r\nExcepteur commodo dolor non officia pariatur veniam ex adipisicing. Officia laboris minim nulla cupidatat id labore adipisicing anim exercitation laboris reprehenderit consequat exercitation. Cillum laborum consequat ut labore commodo irure in nisi et eiusmod labore ipsum sit consectetur. Mollit laboris cupidatat officia eiusmod excepteur sit. Enim reprehenderit eiusmod ea deserunt.\r\nMinim ad occaecat quis pariatur quis tempor ea enim. Aliquip exercitation quis qui occaecat. Consectetur consectetur duis et ut reprehenderit velit consectetur mollit consectetur.\r\n",
//        "tags": [
//            "minim",
//            "in",
//            "ut",
//            "commodo",
//            "dolore",
//            "consectetur",
//            "excepteur"
//        ],
//        "date": "1995-09-22T22:11:30 -04:00",
//        "author": "Landry"
//    }
//]

//var tags = [
//    {
//        title: "Пост",
//        urlTitle: "post"
//
//    },
//    {
//        title: "Интересно",
//        urlTitle: "interesno"
//    }
//];

//for(var i = 0, len=tags.length;i<len;i++){
//    tags[i] = new Tag(tags[i]);
//    tags[i].save(function(e){
//        console.log(e);
//    })
//}

app.use(express.favicon()); // отдаем стандартную фавиконку, можем здесь же свою задать
app.use(express.logger('dev')); // выводим все запросы со статусами в консоль
app.use(express.bodyParser()); // стандартный модуль, для парсинга JSON в запросах
app.use(express.methodOverride()); // поддержка put и delete
app.use(app.router); // модуль для простого задания обработчиков путей


app.get('/api/posts', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

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

        postSchema.index({ title: 'text', content: 'text', author: 'text', tags: "text" });


        Post.textSearch(req.query.search, {limit: req.query.limit}, function (err, output) {
            if (err) console.log(err);

            for (var i = req.query.offset, len = output.results.length; i < len && i < req.query.offset + req.query.limit; i++) {
                result.push(output.results[i].obj);
            }
            console.log(output.results.length);

            res.send(result);


        });


    }

    Post.find(postsQueryParams).skip(req.query.offset).limit(req.query.limit).exec(function (e, posts) {
        res.send(posts);
    });

});

app.get('/api/posts/:urlTitle*', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    var urlTitle = req.param('urlTitle');

    Post.findOne({urlTitle: urlTitle}).exec(function (err, post) {
        res.send(post);
    });
})

app.get('/api/tags', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

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
        for(var i = 0,len = tags.length;i<len;i++){
            for(var j = 0, length = tags[i].tags.length;j<length;j++){
                allTags.push(tags[i].tags[j]);
            }
        }
        removeDuplicates(allTags);

        for(var i = 0,len = allTags.length;i<len;i++){
            allTags[i] = {title: allTags[i]};
        }

        res.send(allTags);
    })
})

app.listen(1337, function () {
    console.log('Express server listening on port 1337');
});
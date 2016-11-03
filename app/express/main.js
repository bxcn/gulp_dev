const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();

app.set('views', './views')
app.set("view engine", "ejs");
app.use("/Public/",express.static(path.join(__dirname, 'Public')));



var admin = express();

admin.on('mount', function (parent) {
  console.log('Admin Mounted');
  //console.log(parent); // refers to the parent app
});

admin.get('/', function (req, res) {
  res.send('Admin Homepage');
});

app.get('/index', function (req, res) {
  console.log(app.Public+"images/"); // /admin
  //res.send('Hello World!/static');
  console.log(app.locals.title);
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});

app.use('/admin', admin);


const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});


console.log();

/*
//利用Express托管静态文件
app.use(express.static('Public'));
app.use(express.static('html'));

app.set('views', './views')
app.engine('.ejs', require('ejs').__express);
//;


app.locals.title = 'My App';
app.locals.email = 'me@myapp.com';


app.get('/index', function (req, res) {
  console.log(app.mountpath); // /admin
  //res.send('Hello World!/static');
  console.log(app.locals.title);
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});


// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});
// 一个中间件栈，对任何指向 /user/:id 的 HTTP 请求打印出相关信息
app.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// 一个中间件栈，处理指向 /user/:id 的 GET 请求
app.get('/user/:id', function (req, res, next) {
  console.log('ID:', req.params.id);
  next();
}, function (req, res, next) {
  res.send('User Info');
});

// 处理 /user/:id， 打印出用户 id
app.get('/user/:id', function (req, res, next) {
  res.end(req.params.id);
});


const birds = require('./birds');
app.use("/birds",birds);

const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
*/

/*
路由是指如何定义应用的端点（URIs）以及如何响应客户端的请求。
路由是由一个 URI、HTTP 请求（GET、POST等）和若干个句柄组成，
它的结构如下： app.METHOD(path, [callback...], callback)， 
app 是 express 对象的一个实例， METHOD 是一个 HTTP 请求方法， 
path 是服务器上的路径， callback 是当路由匹配时要执行的函数。
*/
var path = require('path');
//错误处理
var createError = require('http-errors');
//网络应用框架
var express = require('express');
//cookie解析器
var cookieParser = require('cookie-parser');
//日志打印
var logger = require('morgan');
//跨域组件
var cors = require('cors');
//token解密校验
var expressJWT = require('express-jwt');
//加密秘钥
const { PRIVATE_KEY } = require('./utils/constant');

// 路由表
var articleRouter = require('./routes/article');
var usersRouter = require('./routes/users');
var commentRouter = require('./routes/comment');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//调用跨域默认配置
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//token校验应放在路由之前
app.use(expressJWT({
  secret: PRIVATE_KEY
}).unless({
  //白名单,除了这⾥写的地址，其他的URL都需要验证
  path: ['/api/user/register', '/api/user/login','/api/user/upload','/api/article/allList','/api/article/detail','/api/comment/list']
}));

// 路由拦截
app.use('/api/article', articleRouter);
app.use('/api/user', usersRouter);
app.use('/api/comment', commentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//错误中间件
app.use(function (err, req, res, next) {
  //token校验失败
  if (err.name === 'UnauthorizedError') {
    // 这个需要根据自⼰的业务逻辑来处理理
    res.status(401).send({ code: -1, msg: 'token验证失败' });
  } else {
    //将错误参数传入error.jade
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }

});

module.exports = app;

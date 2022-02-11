var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sql = require('mssql')

var indexRouter = require('./routes/index');
var customersRouter = require('./routes/customers');
var categoriesRouter=require('./routes/categories');
var brandsRouter = require('./routes/brands');
var orderItemsRouter= require('./routes/orderItems');
var ordersRouter=require('./routes/order');
var productsRouter=require('./routes/products');
var staffsRouter=require('./routes/staffs');
var stocksRouter=require('./routes/stocks');
var storesRouter=require('./routes/stores');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/customers', customersRouter);
app.use('/categories', categoriesRouter);
app.use('/brands',brandsRouter);
app.use('/orderItems',orderItemsRouter);
app.use('/orders',ordersRouter);
app.use('/products',productsRouter);
app.use('/staffs',staffsRouter);
app.use('/stocks',stocksRouter);
app.use('/stores',storesRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// var config = {
//   user: "sa",
//   password: "admin123",
//   server: "LAPTOP-6RDEM0OU\\SQLEXPRESS",
//   database: "TUT01DB",
//   options: {
//     trustedConnection: true
//   },
//   port: '1433',
//   trustServerCertificate: true,
// };

// sql.connect(config).then(pool => {
//   // Query  
//   return pool.request().query('select * from login3')
// }).then(result => {
//   console.dir(result)
// }).catch(err => {
//   console.log("the err",err)
// // ... error checks
// });

const server =app.listen(process.env.PORT || 3000, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
  
  
});

module.exports = app;

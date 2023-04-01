var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const connectDatabase = require('./config/db');
const userModel = require('./models/userModel');
const orderModel = require('./models/orderModel');
const inventoryModel = require('./models/inventoryModel');

//Import DATA từ File JSON vào MongoDB
const fs = require('fs');
//1.User
const userData = JSON.parse(fs.readFileSync('./data/user.json', 'utf-8'));
const importUserData = async () => {
  try {
    await userModel.create(userData)
    console.log("Import data user thành công!");
    process.exit();
  } catch (error) {
    console.log("Error", error);
  }
}
importUserData();

//2.Order
const orderData = JSON.parse(fs.readFileSync('./data/order.json', 'utf-8'));
const importOrderData = async () => {
  try {
    await orderModel.create(orderData)
    console.log("Import data order thành công!");
    process.exit();
  } catch (error) {
    console.log("Error", error);
  }
}
importOrderData();

//3.Inventory
const inventoryData = JSON.parse(fs.readFileSync('./data/inventory.json', 'utf-8'));
const importInventoryData = async () => {
  try {
    await inventoryModel.create(inventoryData)
    console.log("Import data inventory thành công!");
    process.exit();
  } catch (error) {
    console.log("Error", error);
  }
}
importInventoryData();


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var inventoryRouter = require('./routes/inventories');

var app = express();
connectDatabase();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/inventory', inventoryRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

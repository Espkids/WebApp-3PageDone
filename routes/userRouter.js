const express = require('express');
const app = express();
const userRouter = express.Router();
const Employee = require('../models/employee');
var userLogin = "";

userRouter.route('/').get(function (req, res) {  //render หน้า login
  res.render('login', { err: false });
});

userRouter.route('/register').get(function (req, res) {  //render หน้า register
  res.render('register', { err: false });
});

userRouter.route('/forgotpassword').get(function (req, res) {  //render หน้า ลืมรหัสผ่าน
  res.render('forgotpassword', { err: false });
});

userRouter.route('/forgotpassword').post(function (req, res) {  //render หน้า ลืมรหัสผ่าน
  const emp_id = req.body.emp_id;
  const emp_email = req.body.email
  Employee.findOne({ ID_employee: emp_id, email: emp_email }, function (err, employee) {
    console.log(employee)
    if (employee) {
      employee.ID_employee = employee.ID_employee;
      employee.password = req.body.newpassword;
      employee.firstName = employee.firstname;
      employee.lastName = employee.lastname;
      employee.birthday = employee.birthday;
      employee.gender = employee.gender;
      employee.address = employee.address;
      employee.telephone = employee.telephone;
      employee.email = employee.email;
      employee.position = employee.position;
      console.log("username : "+employee.ID_employee+"\nnew password : "+employee.password)
      employee.save()
      res.redirect('/home')
    } else {
      res.render("forgotpassword", { err: true });
    }
  });
});

userRouter.route('/หน้าหลัก').get(function (req, res) {  //render หน้าหลัก
  res.render('หน้าหลัก', { err: false });
});

userRouter.route('/test').get(function (req, res) {  //render หน้าหลัก
  res.render('test', { err: false });
});

userRouter.route("/login").post(function (req, res) { //function ของ login
  const emp_id = req.body.username;
  const password = req.body.password;
  console.log(emp_id)
  Employee.findOne({ ID_employee: emp_id, password: password }, function (err, employee) {
    if (err) {
      res.status(400).send("No have user");
      res.render("login", { err: true });
    } else {
      if (employee) {
        userLogin = emp_id
        res.render("หน้าหลัก");
      } else {
        res.render("login", { err: true });
      }
    }
  });
});

userRouter.route('/register').post(function (req, res) {  //Add User ของ register
  const DataUser = new Employee(req.body);
  const EMP_ID = req.body.ID_employee;
  Employee.findOne({ ID_employee: EMP_ID }, function (err, userInServer) { //Check ว่ามีรหัสพนักงานในระบบหรือไม่
    if (userInServer) {
      Employee.find(function (err, employee) {
        if (err) {
          console.log(err);
        }
        else {
          console.log('have user in server')
          res.render('register', { login: userLogin, err: true, employee: employee }); //render collection "users"
        }
      });
    } else {
      console.log(DataUser);
      DataUser.save();
      res.redirect('/home');
    }
  });
});


module.exports = userRouter;
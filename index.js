const express = require('express')
const router = express.Router()
var cors = require('cors')
var mysql = require('mysql');
const app = express()
var md5 = require('md5');
var cookieParser = require('cookie-parser')
app.use(cookieParser())
// app.use(require('./router/auth'))
app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// var bodyParser = require('body-parser')

var jwt = require('jsonwebtoken');
var jwtkey = 'node_app_pack';


var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'mernapp'
});



app.get('/', function (req, res) {
    // res.cookie('jwt', 'rock', { expires: new Date(Date.now() + 60000), httpOnly: true })
      // Cookies that have not been signed
  // console.log('Cookies: ', req.cookies.jwt)

  // Cookies that have been signed
  // console.log('Signed Cookies: ', req.signedCookies)

    res.send('<h1>Mern Test</h1>')
  })

  app.get('/getuser', function (req, res) {
    connection.query('SELECT * FROM user', function (error, results, fields) {
        if (error) throw error;
        res.send(results)
    });
  })

  app.post('/register', function (req, res) {
    var sql = "INSERT INTO user (username, Email,number,Password) VALUES ('"+req.body.username+"', '"+req.body.email+"', '"+req.body.phone+"', '"+md5(req.body.password)+"')";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      jwt.sign({ _id: result.insertId }, jwtkey,(err,token) => {
        res.send({message:'Successfull',id:result.insertId,token:token})
      })
    });
  })

  app.post('/login', function (req, res) {
    connection.query('SELECT * FROM user', function (error, results, fields) {
      if (error) throw error;
      res.send(results)
    });
  })

  app.post('/password', function (req, res) {
    let text1 = md5(req.body.pass).toString();
    let text2 = req.body.checkpass.toString();
    // res.cookie('jwt', 'mini', { 
    //                             expires: new Date(Date.now() + 60000),
    //                             httpOnly: true ,
    //                             domain: 'http://localhost:4040'
    //                           })
    if( text1 == text2 ){
      jwt.sign({ _id: req.body.id }, jwtkey,(err,token) => {
       
          // res.cookie('jwt',token)
          res.send({message:'Successfull',id:req.body.id,token:token})
      })
    }else{
      res.send({message:'Failed'})
    }
  })

  app.post('/verifyuser', function (req, res) {
    jwt.verify(req.body.token, jwtkey,(err,token) => {
        if(err){
          res.send('Result Not Found')
        }
        res.send(token)
    })
  })

  app.post('/updateprofile', function (req, res) {
    var sql = "UPDATE user SET username ='"+req.body.user+"', Email ='"+req.body.email+"', nickname ='"+req.body.nick+"' WHERE id = "+req.body.id+"";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      res.send(result);
    });

  })



  app.listen(4040)



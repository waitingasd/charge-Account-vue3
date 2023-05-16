var http = require('http')
// http.createServer(function (res, rep) {
//   // 发送http头部
//   // http状态值：200 ： OK
//   // 内容类型：text/plain。并用charset=UTF-8解决输出中文乱码
//   rep.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'})
//   rep.end('Hello World!')
// }).listen(8080)
// console.log('Server running at http://10.10.0.89:8080/')

// var http = require('http')
// var url = require('url')
// var server = http.createServer(function (request, response) {
//   var queryObj = url.parse(req.url, true).query;
//   var name = queryObj.name
// })

const express = require('express') // 引入express框架
const cheerio = require('cheerio') // 引入cheerio，可以理解成Node.js版的jQuery，使用方式跟jQuery一样
const superagent = require('superagent') // 引入superagent做http代理

// var app = express()

// app.get('/', function (req, res, next) {
//   superagent.get('http://www.gov.cn/xinwen/yaowen.htm')
//     .end(function (err, sres) {
//       if (err) {
//         return next(err)
//       }
//       var $ = cheerio.load(sres.text)
//       var items = []
//       $('.list h4 a').each(function (idx, element) {
//         console.log(element, 'element==========')
//         var $element = $(element)
//         items.push({
//           title: $element.text()
//         })
//       })

//       res.send(items)
//     })
// })

// app.listen(8888, function () {
//   console.log('app is listening at http://localhost:8888/ \n 请手动打开网址')
// })

const bodyParse = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')  // 通过jsonwebtoken生成令牌发送给客户端，客户端请求时就可以带上令牌证明自己的身份
// const db = require('./mysql.js') // 引入连接数据库的js
const app = express();
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({extended: true}))
app.use(cors())
const mysql = require('mysql')

const conn = mysql.createConnection({
  user: 'root',
  password: 'root',
  host: 'localhost',
  database: 'charge'
})
conn.connect(err => {
  if (err) {
    console.log(err, '连接失败')
    return
  }
  console.log('连接成功')
})
// app.use(bodyParse.urlencoded({extended:false})) ;
// 处理根目录的get请求
// app.get('/',function(req,res){
//     res.sendfile('表单提交.html') ;
//     console.log('服务器等待请求中...');
// })
app.post('/login', function (req, res, next) {
  // 通过req.body可以获取前端post请求传给服务器的参数
  username = req.body.name
  password = req.body.password
  const userToken = {
    jzxToken: username
  };
  const token = jwt.sign(userToken, 'token', { expiresIn: "24h" }); // 过期时间为24h
  const sql = 'select * from users where phone = ?'
  conn.query(sql, username, (err, result) => {
    if (err) {
      res.send({
        code: 20000,
        msg: '账号密码错误，登陆失败！',
        status: 0
      })
      return
    }
    if (result) {
      if (password !== result[0].password) {
        res.send({
          code: 20000,
          msg: '账号密码错误，登陆失败！',
          status: -1
        })
        return
      }
      res.send({
        code: 0,
        msg: '恭喜你！登陆成功',
        data: result,
        status: 0,
        token
      })
    }
  })
  /* 
    jwt.sign(payload, secretOrPrivateKey, [options, callback]) 用来生成令牌
    sign可以接收三个参数：
      1.payload 必须是一个object，buffer或者string，用来保存一些信息
      2.secretOrPrivateKey 是包含HMAC算法的密钥或RSA和ECDSA的PEM编码私钥的string或buffer 使用secert进行加密，加密和解密都是用secert
      3.options包括以下选项：{
        itemalgorithm：加密算法（默认值：HS256）
        expiresIn：以秒表示或描述时间跨度zeit / ms的字符串。如60，“2 days”，“10h”，“7d”， -Expiration time，过期时间
        notBefore：定义在什么时间之前，该jwt都是不可用的。以秒表示或描述时间跨度zeit / ms的字符串。如：60，“2days”，“10h”，“7d”
        audience
        issuer：jwt签发者
        jwtid： jwt的唯一身份标识，主要用来作为一次性token,从而回避重放攻击
        subject：jwt所面向的用户
        noTimestamp
        header
      }
    jwt.verify(token,secret,callback) 用于解析客户端用户请求数据时携带的token，判断是否放行
  */
  // res.json(req.body)
  // res = req.body
  // res.send('登陆账号：' + name + '登陆密码：' + password)
})

app.get('/getUserInfo', function(req, res, next) {
  let parts = req.headers.authorization.split(' ');
  let token = ''
  let userData = ''
  // 通过req.query可以获取前端页面发起get请求传递给服务器的参数
  try {
    if (parts.length == 2) {
      let scheme = parts[0]
      let unique = parts[1]
      if (/^Bearer$/i.test(scheme)) {
        token = unique // 获取前端传过来的token
      }
    }
    jwt.verify(token, 'token', (err, data) => {
      if (err) {
        console.log(err, 'err')
        res.send({
          code: 20000,
          msg: '登录信息已过期，请重新登录',
          status: -1
        })
        return
      }
      if (data) {
        userData = data
      }
    })
    const sql = 'select * from users where phone = ?'
    conn.query(sql, userData.jzxToken, (err, data) => {
      if (err) {
        res.send({
          code: 20000,
          msg: '获取失败',
          status: -1
        })
        return
      }
      if (data) {
        res.send({
          code: 0,
          data: data[0],
          msg: '获取成功',
          status: 0
        })
      }
    })
  } catch(e) {
    next(e)
  }
})

// 注销账号
app.get('/deleteAccount', function(req, res, next) {
  let parts = req.headers.authorization.split(' ');
  let token = ''
  let userData = ''
  // 通过req.query可以获取前端页面发起get请求传递给服务器的参数
  try {
    if (parts.length == 2) {
      let scheme = parts[0]
      let unique = parts[1]
      if (/^Bearer$/i.test(scheme)) {
        token = unique // 获取前端传过来的token
      }
    }
    jwt.verify(token, 'token', (err, data) => {
      if (err) {
        res.send({
          code: 20000,
          msg: '登录信息已过期，请重新登录',
          status: -1
        })
        return
      }
      if (data) {
        userData = data
      }
    })
    const sql = 'delete from users where username = ?;'
    console.log(userData.jzxToken, 'userData.jzxToken')
    conn.query(sql, userData.jzxToken, (err, result) => {
      if (err) {
        console.log(err, 'err====')
        res.send({
          code: 20000,
          msg: '注销失败',
          status: 0
        })
        return
      }
      if (result) {
        res.send({
          code: 0,
          msg: '注销成功！',
          status: 0
        })
      }
    })
  } catch(e) {
    next(e)
  }
})

// 注册账号
app.post('/registUser', function (req, res, next) {
  // 通过req.body可以获取前端post请求传给服务器的参数
  phoneNumber = req.body.phoneNumber
  password = req.body.password
  againPassword = req.body.againPassword
  const querySql = 'select * from users where phone = ?' 
  const sql = 'insert into users(phone, password) values (?, ?)'
  conn.query(querySql, phoneNumber, (err, result) => {
    console.log(err, result, 'err, result')
    if (err) {
      res.send({
        code: 20000,
        msg: '网络异常~',
        status: 0
      })
      return
    }
    if (result.length !== 0) {
      res.send({
        code: 20000,
        msg: '该手机号已被注册过，请更换手机号~',
        status: 0
      })
    } else {
      if (password !== againPassword) {
        res.send({
          code: 20000,
          msg: '两次密码不一致，请重新输入！',
          status: 0
        })
        return
      } else {
        conn.query(sql, [phoneNumber, password], (err, result) => {
          if (err) {
            res.send({
              code: 20000,
              msg: '注册失败！请重新注册~',
              status: 0
            })
            return
          }
          if (result) {
            res.send({
              code: 0,
              msg: '注册成功！请重新登陆！',
              status: 0
            })
            return
          }
        })
      }
    }
  })
})
app.listen(8888, function () {
  console.log('app is listening at http://127.0.0.1:8888/ \n 请手动打开网址')
})


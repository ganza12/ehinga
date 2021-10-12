import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from 'express';
import dbConnection from "./config/dbConnection";
import { successConsole} from './utils/functions';
import * as morgan from 'morgan';
import * as cors from 'cors'
import * as bodyParser from 'body-parser'

const PORT = process.env.PORT || 5000
const app = express();
app.use(morgan('tiny'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// // parse application/json
app.use(bodyParser.json())
app.use(cors());
app.use(express.urlencoded({extended : false}));

// adding headers
app.use((req:any, res:any,next:any) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization')
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE', 'GET')
      return res.status(200).json({})
    }
    next()
  })



app.use('/api/members',require('./routes/MemberRoute'))


app.get('/api/', (req, res) => res.send({
  msg: 'app is running'
}));

app.use((req, res, next) => {
  const error = new Error('Page Not Found');
  // error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      msg: error.message,
    },
  });
});


createConnection(dbConnection).then(async connection => {
        app.listen(PORT,()=>{
            console.log(successConsole())
    })
}).catch((error) => console.log(error));




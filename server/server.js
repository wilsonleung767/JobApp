import express from 'express'
import mongoose from 'mongoose'


import schema from './schema.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import JobRouter from './api/job.js'


const app = express();
// const db = mongoose.connection;
// mongoose.connect(url, {})
//     .then(result => console.log("database connected"))
//     .catch(err => console.log(err))

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors({orogin: '*'}))

app.use('/api/job', JobRouter)


app.get('/', (req,res) => {
    res.send("<h1>hello from node js app</h1>")
})

const PORT =  8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
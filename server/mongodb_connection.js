import express from 'express'
import mongoose from 'mongoose'

const url = "mongodb+srv://wilsonleung:04875398MON@cluster0.haikpzt.mongodb.net/JobApp?retryWrites=true&w=majority"
mongoose.connect(url, {})
.then(res => console.log("database connected"))
.catch(err => console.log(err))

const db = mongoose.connection;

export default db
import { Schema, model } from 'mongoose';

const JobSchema = new Schema({
    title : { type: String },
    location: { type: String },
    employer:{ type: String },
    salary: { type: String },
    postDate: { type: String }, 
    description: { type: String },

})

const Job = model('Job', JobSchema)

export default {Job}
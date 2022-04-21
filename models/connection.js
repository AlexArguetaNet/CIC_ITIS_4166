const mongoose = require('mongoose');
const { title } = require('process');
const Schema = mongoose.Schema;

// Schema
const connectionSchema = new Schema({

    title: {type: String, required: [true, 'title is required']},
    topic: {type: String, required: [true, 'topic is required']},
    details: {type: String, required: [true, 'details are required']},
    location: {type: String, required: [true, 'location is required']},
    date: {type: String, required: [true, 'date is required']},
    startTime: {type: String, required: [true, 'start time is required']},
    endTime: {type: String, required: [true, 'end time is required']},
    hostName: {type: String, required: [true, 'host name is required']},
    imageUrl: {type: String, required: [true, 'image is required']},
    creator: {type: Schema.Types.ObjectId, ref:'User'}

},
{timestamps: true}
);

// Collection name is 'connections' in MongoDb
module.exports = mongoose.model('Connection', connectionSchema);





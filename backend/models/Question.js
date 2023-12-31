const mongoose = require('mongoose')
const {Schema} = mongoose;

const QuestionSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },

    title:{
        type:String,
        required:true,
    },

    question:{
        type:String,
        required:true,
    },

    tags:{
        type:String,
        required:true,
    },

    members: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "user" 
    }],

    postedBy:{
        type:String,
        required:true
    },

    date:{
        type:Date,
        default:Date.now()
    },

    votes:[{
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User', 
        },
        direction: {
          type: String,
          enum: ['up', 'down'],
        }
    }]
})

const question = mongoose.model('question', QuestionSchema);
question.createIndexes();
module.exports = question;
const mongoose = require('mongoose')

const postSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    likes: {
        type: Number, 
        default: 0 
    },
    caption:{
        type: String,
    },
    image:{
        type:String,
        required:true
    },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }], 
    comments: [
        {
          userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
          username: { type: String, required: true },
          comment: { type: String, required: true },
          createdAt: { type: Date, default: Date.now },
        },
      ],
})

const posts=mongoose.model('posts',postSchema)
module.exports=posts
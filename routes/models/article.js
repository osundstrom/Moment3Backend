//mongoose
const mongoose = require("mongoose");

//schema 
const articleSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true, 
        trim: true, 
    },
    description: {
        type: String,
        required: true, 
    },
    content: { 
        type: String,
        required: true, 
    },
    author: { 
        type: String,
        required: true, 
    },
    post_created: { 
        type: Date,
        default: Date.now,
    },
    image:{
        type: String,
        required: true,
    }},
    { collection: "articles" });

//skapar model
const articleModel = mongoose.model("articleModel", articleSchema);

//exporterar
module.exports = articleModel;
const mongoose = require("mongoose"); //Import mongoose to connect to MongoDB

// Schema: The structure of our documents - similar to tables in SQL (Relational) DBs.

const todoSchema = mongoose.Schema(
     //Id:number - not rquired as Mongdo DB generates ID automatically
    {text: {type: String, required: true},
    duedate: {type: Date, default:Date.now}}

);

// Create the model

const todoModel = mongoose.model("duetodos",todoSchema); // uses the duetodos (collection) database we created in MongoDB Atlas

//Allow export/import

module.exports = todoModel;

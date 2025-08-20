// Import Express to your project

// import express, { urlencoded } from 'express';  // es 6 method

const express = require("express"); // using common js method Handles the API Endpoint (HTTP Request)
const cors= require("cors");  //Controls security restrictions when using different API endpoint.
const mongoose = require("mongoose");
//instantiate express

const app = express();


// Using ES6 imports - connect to Database MongoDB
// import mongoose from 'mongoose';

const port = 3000; //Port number for localhost

const mongoDBConnectionString = process.env.mongoDBConnectionString;  //Connect to MongoDB using connection string (25-A Project Cluster0) and the specific DB ("todoDB")

//Importing model
const todoModel = require("./model/todo.js");  // the Model is set up for the todos collection

//Setting up middleware  - Just before we reach the back end.

app.use(express.json()); // Ensuring or data sent in json form
app.use(express.urlencoded({extended:true}));  // Some characteres like % are deciphered accordingly in the URL.
app.use(cors("*"));  // Allowing backend to accept any request from any IP address. * for wildcard.

// Mongoose to connect to the database and then Start the server. 

mongoose.connect(mongoDBConnectionString).then(function () {

    console.log("Database connected");
    // start your server here.
    app.listen(port, () => {  // Listen function boots up the server. Only one machine to use per port.
        console.log(`Server is running at port ${port}`);
    });

    }).catch(function (error) {
    console.log("Error connecting to the database")
    });

//HTTP methods. (using CRUD) These are exucuted immediately while the listen function will wait
// for any HTTP request to actually be perfomed.

//Get (Read) Request. The get function requires two paramets, a route and a function.

app.get("/todosdate", async (req,res) => {
  // res.send("Hello GREGGY AND BONNIE"); here res parameter is an object, send is a method.
  try { //using try/catch keywords.
      
      const response = await todoModel.find({}); //find{} filters nothing and returns all documents from the model.
      //console.log(response);
      res.status(200).json(response); //ensure data in json format

  } catch (error) {  
    console.log(error);
  }
});

// Post (Create) Method

app.post("/todosdate", async(req,res) => {
  try {
    //res.send("Your Post is working");
    //console.log(req.body);
    const todo = req.body; // 
    // Create the new item in the database
    const newItem = await todoModel.create(todo);
    res.status(200).send("Successful");
    
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error: "+error);
  }
})

//Delete method

app.delete("/todosdate/:id" , async (req,res) => {
  try {
    
    let id = req.params.id;
    
    console.log(id);
    const deletdItem = await todoModel.deleteOne({ //using the todoModel that uses the namesake database/collection.
      _id: id
    })
    res.status(200).send("Delete successful");

  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
})

// Update (PUT) method

app.put("/todosdate/:id" , async (req,res) => {
  try {
    
    let id = req.params.id;
    const  {text  } = req.body;

    const updateOptions = {text: text};
    const updatedItem = await todoModel.findByIdAndUpdate(
      id, updateOptions);
      
    console.log(id);
    
    res.status(200).send("Update successful");

  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
})

// Update the date

app.put("/todosupdate/:id" , async (req,res) => {
  try {
    
    let id = req.params.id;
    const  date = req.body.duedate;

    const updateOptions = {duedate: date};
    const updatedItem = await todoModel.findByIdAndUpdate(
      id, updateOptions);
      
    console.log(id);
    
    res.status(200).send("Update successful");

  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
})


// Using another get method to count documents

app.get("/count", async (req,res) => {
  // res.send("Hello GREGGY AND BONNIE"); here res parameter is an object, send is a method.
  try { //using try/catch keywords.
      
      const count = await todoModel.countDocuments({}); // Counts all doucments.
      const countJson = {text:count};
      res.send(countJson);

  } catch (error) {  
    console.log(error);
  }
});
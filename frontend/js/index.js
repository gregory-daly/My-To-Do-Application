// Adding the live date
const today = document.querySelector(".today");
const options = {weekday:"long",year:"numeric",month:"long",day:"numeric"}
const todaysDate = new Date().toLocaleDateString("en-AU",options)
today.innerHTML = todaysDate;

// Define the URL for out HTTP requests.
const url = "https://my-to-do-app-frontend.vercel.app/todosdate" // Update from Vercel backend

//"http://localhost:3000/todosdate"; 
let count = 0; // count the documents.

async function getTodos(){
    try {
        const options = {
            method:"GET",
            headers: {
                "Content-Type":"application/json"
            }
        }
    const response = await fetch(url,options);  // Sends the HTTP request out and waits fro reponse.
    const todos = await response.json();
    
   // Add database items dynamically
   const todoContainer = document.querySelector(".todo-items");
 
    
   todos.forEach((todo) => {
    //console.log(todo);
    //Method for counting document

    count +=1;
    const newTask = document.createElement("tr"); // Create the row container

    // Add the text of the todo.
    const newText = document.createElement("td");
    newText.innerText = todo.text; // Add the text from the items
   

    // Ad the due date here
    const newDate = document.createElement("td");
    const DueDate = new Date(todo.duedate);
    newDate.innerText = DueDate.toDateString();
    //.toLocaleDateString("en-AU",options); // Grab the due date
   
    // Add the Delete and update Buttons

   
    newTask.classList.add("todo-items-btn"); //Give the buttons style
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML= "<i class='bi bi-x-lg'></i>";
    const deleteData = document.createElement("td");
    deleteData.appendChild(deleteButton);

    const updateButton = document.createElement("button");
    updateButton.innerHTML = "<i class='bi bi-pencil'></i>";
    const updateData = document.createElement("td");
    updateData.appendChild(updateButton);
    
    
    // Add the date update button
    const dateUpdateBtn = document.createElement("button");
    dateUpdateBtn.innerHTML = "<i class='bi bi-pencil'></i>";
    const dateUpdateData = document.createElement("td");
    dateUpdateData.appendChild(dateUpdateBtn);


    newTask.appendChild(newText);
    newTask.appendChild(updateData);
    newTask.appendChild(newDate);
    newTask.appendChild(dateUpdateData);
    newTask.appendChild(deleteData);

    
    todoContainer.appendChild(newTask);
   // todoContainer.appendChild("Greg");

    //Delete button Event listener
    deleteButton.addEventListener("click",function(){
       // console.log("Delete button clicked");
        deleteItem(todo._id);
    });

    //Update Button Event listener

    updateButton.addEventListener("click",
        function(){
        console.log("Update Button Clicked");
        updateItem(todo);
    });

    //Date Update Button Event Listener

    dateUpdateBtn.addEventListener("click", () => {
        console.log ("Date Update Button Clicked");
        updateDate(todo);
    });

    document.getElementById("count").innerHTML= count; // Add the count total 

        } );
     } catch (error) {
        console.log(error);
    }
 }

getTodos();

let isUpdateing;

// Post Method
//First grab the input text (also used in update method)
let todo;
let dueDate;
const input = document.querySelector(".new-task");
const dateInput = document.querySelector(".due-date");
input.addEventListener("change", function(event){
    event.preventDefault();
    todo = event.target.value;
    console.log(todo);
})

dateInput.addEventListener("change", function(event){
    event.preventDefault();
    dueDate = event.target.value;
    console.log(dueDate);
})

// Asign the add button as post method (Includes condition for whether updating or posting)
const addButton = document.querySelector(".sub-btn");
addButton.addEventListener("click",function(){
    
        if (!isUpdateing){
         postHandler();
        } else {
         updateItem(newItem);
        }
     
     }
);

// Create the post method
async function postHandler(){
    try {
        const option = {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                text:todo,
                duedate:dueDate
            })
        }
        const response = await fetch(url,option);

        if (response.ok) {
            console.log("Sucessful")
            location.reload();
           // location.reload();
        } else {
            console.log("Post request failed")
        }
        
    } catch (error) {
        console.log(error);
        
    }
}

// Delete Method

async function deleteItem(id){
    console.log(id);

    //Updating the URL to match the Id of deleted Item
    const url=`http://www.localhost:3000/todosdate/${id}`;

    try {
        const option = {
            method:"DELETE"
        }
        const deletedItem = await fetch(url,option);
        
        if (deletedItem.ok){
            console.log("Item is deleted")
            location.reload();
        //    location.reload();
        } else {
            console.log("Delete failed")
        }

    } catch (error) {
        console.log(error);
        
    }
}

// Update Method

async function updateItem(itemToUpdate) {
    console.log(itemToUpdate);
    
    const {_id,text}=itemToUpdate;

    // console.log(text);
    
    const updateURL=`http://www.localhost:3000/todosdate/${_id}`;
     //console.log(updateURL);
    
    input.value = text;
    
     isUpdateing=true;
     newItem = itemToUpdate;

    try {
        const option = {
            method:"PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({text:todo})  // Body must be a string and the content JSON?
        }

        const response = await fetch(updateURL,option);  // Send the http request.
        if (response.ok){
            console.log("Item Updated");
            location.reload();
        } else {
            console.log("Failed to update");
        }
    } catch (error) {
        console.log(error);   
    }
}

// Update Date

async function updateDate(itemToUpdate) {
    console.log(itemToUpdate);
    
    const {_id,duedate}=itemToUpdate;

    // console.log(text);
    
    const updateURL=`http://www.localhost:3000/todosupdate/${_id}`;
     //console.log(updateURL);
    
   let  update =new Date(dateInput.value);

   console.log(update);
   update = duedate;
    
     isUpdateing=true;
     newItem = itemToUpdate;

    try {
        const option = {
            method:"PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({duedate:dueDate})
        }

        const response = await fetch(updateURL,option);
        if (response.ok){
            console.log("Item Updated");
            console.log(update);
          location.reload();
        } else {
            console.log("Failed to update");
        }
    } catch (error) {
        console.log(error);   
    }
}


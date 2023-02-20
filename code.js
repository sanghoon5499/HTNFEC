// Things to do
// 1. make a for loop to run through each item in json
// 2. make each div a link to either private or public url
//     - determine which link to use with isLoggedIn
// 3. fill in 4 texts
// https://stackoverflow.com/questions/12523881/html-how-to-automate-the-creation-of-programmatically-create-divs

// api url
const api_url = "https://api.hackthenorth.com/v3/events";
  
// Defining async function
async function getapi(url) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();

    show(data);
}
// Calling that async function
getapi(api_url);

// Function to define innerHTML for HTML table
function show(data) {
    for (let i = 0; i < data.length; i++) {
        console.log(data[i])
        //console.log(data)

        let indexString = String(i+1);
        let typeId = "type-"+indexString;
        let titleId = "title-"+indexString;
        let descriptionId = "description-"+indexString;
        let relatedId = "related-"+indexString;

        let maxDescription = 120;
        if (data[i].description.length > maxDescription) {
            document.getElementById(descriptionId).innerHTML = data[i].description.slice(0, maxDescription) + "...";
        } else {
            document.getElementById(descriptionId).innerHTML = data[i].description;
        }
        

        document.getElementById(typeId).innerHTML = data[i].event_type;
        document.getElementById(titleId).innerHTML = data[i].name;
        document.getElementById(relatedId).innerHTML = data[i].related_events;
    }
    
    for (let j = 0; j < 5; j++) {
        let rowDiv = document.createElement("div");
        rowDiv.className = "row gy-5";
        rowDiv.style = "height:25vh; margin-top: 4vh;";

        for (let k = 0; k < 3; k++) {
            let itemDiv = document.createElement("div");
            itemDiv.className = "col p-3 align-self-start";
        }
    }

}
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
    console.log(data)

    // when generating, skip those which are private if user is not logged in

    let body = document.body;

    // Generate html elements
    let idCounter = 0;
    for (let j = 0; j < 5; j++) {
        let rowDiv = document.createElement("div");
        rowDiv.className = "row gy-5";
        rowDiv.style = "height:30vh; margin-top: 10vh; margin-bottom: 10vh; margin-left: 17.5vw; margin-right: 17.5vw;";

        for (let k = 0; k < 3; k++) {
            let itemDiv = document.createElement("div");
            itemDiv.className = "col p-3 align-self-start";
            itemDiv.style = "border: 2px solid black; border-radius: 2vh; height: 30vh; margin-left: 1vw; margin-right: 1vw";
            let public_url = data[idCounter].public_url;
            let private_url = data[idCounter].private_url;
            itemDiv.onclick = function() {
                // prioritize private url (check if user is logged in)
                window.open(public_url);
            }


            const type = document.createElement("p");
            type.textContent = data[idCounter].event_type;

            const title = document.createElement("h2");
            title.textContent = data[idCounter].name;

            const description = document.createElement("p");
            let maxDescription = 120;
            if (data[idCounter].description.length > maxDescription) {
                description.textContent = data[idCounter].description.slice(0, maxDescription) + "...";
            } else {
                description.textContent = data[idCounter].description;
            }

            const related = document.createElement("p");
            related.textContent = data[idCounter].related_events;


            itemDiv.appendChild(type);
            itemDiv.appendChild(title);
            itemDiv.appendChild(description);
            itemDiv.appendChild(related);

            rowDiv.appendChild(itemDiv);

            idCounter++;
        }
        body.appendChild(rowDiv);
    }
}
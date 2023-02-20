const api_url = "https://api.hackthenorth.com/v3/events";
  
async function getapi(url) {
    const response = await fetch(url);
    
    // Store data as JSON
    var data = await response.json();

    // Generate HTML code
    show(data);
}

// Calling async function
getapi(api_url);



// Function to define innerHTML for HTML table
function show(data) {
    console.log(data)
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    console.log(isLoggedIn);
    if (isLoggedIn == null || isLoggedIn == "false") {
        isLoggedIn = false;
    } else if (isLoggedIn == "true") {
        isLoggedIn = true;
    }

    // Hardcoded isLoggedIn value for testing
    // isLoggedIn = true;

    let body = document.body;

    // number of rows and columns should change based on device
    let rows = 5;
    let columns = 3;
    let isMobile = false;
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        rows = 15;
        columns = 1;
        isMobile = true;
    } 

    // Generate html elements
    let idCounter = 0;
    for (let j = 0; j < rows; j++) {
        // create the row of elements
        let rowDiv = document.createElement("div");
        rowDiv.className = "row gy-5";
        rowDiv.style = "height:30vh; margin-top: 10vh; margin-bottom: 10vh; margin-left: 17.5vw; margin-right: 17.5vw;";
        if (isMobile) {
            rowDiv.style = "height:25vh; margin-top: 6vh; margin-bottom: 10vh; margin-left: 7.5vw; margin-right: 7.5vw;";
        }
        

        for (let k = 0; k < columns; k++) {
            // skip html generation if event is private but user is not logged in
            if (data[idCounter].permission == "private" && !isLoggedIn) { idCounter++; }

            // EVENT BLOCK //////////////
            let itemDiv = document.createElement("div");
            itemDiv.className = "col p-3 align-self-start";
            itemDiv.style = "border: 2px solid black; border-radius: 2vh; height: 30vh; margin-left: 1vw; margin-right: 1vw";
            
            let public_url = data[idCounter].public_url;
            let private_url = data[idCounter].private_url;
            itemDiv.onclick = function() {
                // open link depending on login state
                if (isLoggedIn && private_url != "") {
                    window.open(private_url);
                } else if (public_url != "") {
                    window.open(public_url);
                }
                
            }

            // EVENT TYPE  //////////////
            //  - filter text before attaching
            const type = document.createElement("p");
            let event_type = "";
            switch(data[idCounter].event_type) {
                case "tech_talk": 
                    event_type = "Tech Talk";
                    break;
                case "workshop":
                    event_type = "Workshop";
                    break;
                case "activity":
                    event_type = "Activity";
                    break;
            }
            type.textContent = event_type;

            // TITLE       //////////////
            const title = document.createElement("h2");
            title.textContent = data[idCounter].name;

            // SPEAKER     //////////////
            //  - check if speaker exists before attaching
            const speaker = document.createElement("p");
            if (data[idCounter].speakers.length != 0) {
                speaker.textContent = data[idCounter].speakers[0].name;
            }
            
            // DESCRIPTION //////////////
            const description = document.createElement("p");
            let maxDescription = 120;
            // change length based on mobile, and on how long the title is
            //  - there is probably a better way by counting line numbers
            if (isMobile) {maxDescription = 70}
            if (data[idCounter].name.length < 35) {
                maxDescription+=45;
            } if (data[idCounter].name.length < 17) {
                maxDescription+=80;
            } 

            // truncation of description
            if (data[idCounter].description.length > maxDescription) {
                description.textContent = data[idCounter].description.slice(0, maxDescription) + "...";
            } else {
                description.textContent = data[idCounter].description;
            }

            // RELATED     //////////////
            //  - wasn't sure how to display this info; left it out.
            //const related = document.createElement("p");
            //related.textContent = data[idCounter].related_events;


            // attach each HTML element to its parent
            itemDiv.appendChild(type);
            itemDiv.appendChild(title);
            itemDiv.appendChild(speaker);
            itemDiv.appendChild(description);
            
            rowDiv.appendChild(itemDiv);

            idCounter++;
        }
        body.appendChild(rowDiv);
    }
}
const api_url = "https://api.hackthenorth.com/v3/events";


// runs the nested functions in order
async function getapi(url) {
    const response = await fetch(url);
    
    // Store data as JSON
    var data = await response.json();

    // Sort by time
    data.sort(sortByTime);

    // Generate HTML code
    show(data);
}

// Calling async function
getapi(api_url);


function sortByTime(a, b) {
    if (a.start_time < b.start_time) { return -1; }
    if (b.start_time < a.start_time) { return 1; }
    return 0;
}


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
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)){
        rows = data.length;
        columns = 1;
        isMobile = true;
    } 

    // used to determine if content should be rendered or not (based on isLoggedIn and private/public events)
    let renderEmpty = false;
    let renderEmptyRow = false;

    // Generate html elements
    let counter = 0;
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
            while (!renderEmpty && data[counter].permission == "private" && !isLoggedIn) {
                counter++;

                // if end of array
                if (counter == data.length) {
                    renderEmpty = true;
                }
            }
            
            
            // Create HTML elements and attach styles/attributes if need be
            let itemDiv = document.createElement("div");
            itemDiv.className = "col p-3 align-self-start";
            itemDiv.style = "margin-left: 1vw; margin-right: 1vw;";

            const type = document.createElement("p");
            const title = document.createElement("h2");
            const speaker = document.createElement("p");
            const description = document.createElement("p");
            const callToAction = document.createElement("p");
            callToAction.style = "position: absolute; bottom: 0; right: 1vw"



            // attach metadata if they exist
            if (!renderEmpty) {
                // EVENT BLOCK //////////////
                itemDiv.style = "border: 2px solid black; border-radius: 2vh; height: 32vh; margin-left: 1vw; margin-right: 1vw; background-color: white;";

                let public_url = data[counter].public_url;
                let private_url = data[counter].private_url;
                if (public_url != "" || private_url != "") {
                    itemDiv.style = "border: 2px solid black; border-radius: 2vh; height: 32vh; margin-left: 1vw; margin-right: 1vw; cursor: pointer; background-color: white;";
                }
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
                let event_type = "";
                switch(data[counter].event_type) {
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
                title.textContent = data[counter].name;

                // SPEAKER     //////////////
                //  - check if speaker exists before attaching
                if (data[counter].speakers.length != 0) {
                    speaker.textContent = data[counter].speakers[0].name;
                }
                
                // DESCRIPTION //////////////
                let maxDescription = 120;
                // change length based on mobile, and on how long the title is
                //  - there is probably a better way by counting line numbers
                if (isMobile) {maxDescription = 70}
                if (data[counter].name.length < 35) {
                    maxDescription+=45;
                } if (data[counter].name.length < 17) {
                    maxDescription+=80;
                } 

                // truncation of description
                if (data[counter].description.length > maxDescription) {
                    description.textContent = data[counter].description.slice(0, maxDescription) + "...";
                } else {
                    description.textContent = data[counter].description;
                }

                // RELATED     //////////////
                //  - wasn't sure how to display this info; left it out.
                //const related = document.createElement("p");
                //related.textContent = data[counter].related_events;

                // CALL TO ACTION ///////////
                callToAction.textContent = "Check it out >";
            }

            // attach each HTML element to its parent
            itemDiv.appendChild(type);
            itemDiv.appendChild(title);
            itemDiv.appendChild(speaker);
            itemDiv.appendChild(description);
            itemDiv.appendChild(callToAction);
            rowDiv.appendChild(itemDiv);

            counter++;
        }

        // if the row consists of empty (private) events, when don't render them
        if (!renderEmptyRow) {
            body.appendChild(rowDiv);
            if (renderEmpty) { renderEmptyRow = true; }
        } 
    }
}

function main() {
    window.open("./index.html", "_self");
}
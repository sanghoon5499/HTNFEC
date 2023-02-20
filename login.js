let isLoggedIn = localStorage.getItem("isLoggedIn");
console.log(isLoggedIn)

document.addEventListener("DOMContentLoaded", function () {
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    console.log("hello: "+isLoggedIn)
    if (isLoggedIn == "true") {
        console.log("1")
        document.getElementById("main_message").innerHTML = "Hello!";
        let userName = localStorage.getItem("name");
        document.getElementById("sub_message").innerHTML = "Welcome back "+userName;
        document.getElementById("email").style.display = "none";
        document.getElementById("password").style.display = "none";
        document.getElementById("login").style.display = "none";
        document.getElementById("logout").style.display = "inline";
    } else if (isLoggedIn == "false") {
        console.log("2")
        document.getElementById("main_message").innerHTML = "Welcome!";
        document.getElementById("sub_message").innerHTML = "Sign in to get started";
        document.getElementById("email").style.display = "inline";
        document.getElementById("password").style.display = "inline";
        document.getElementById("login").style.display = "inline";
        document.getElementById("logout").style.display = "none";
    }
});




// check if valid inputs
function login() {
    if (validation()) {
        // local storage is not the best way to store user login info,
        //  but it should work fine for this project
        localStorage.setItem("name", "Test User");
        localStorage.setItem("isLoggedIn", true);
        location.reload(); 
    }
}

function validation() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Normally would also validate email with regex
    if (email === '' || password === '') {
        alert("Please fill all fields");
        return false;
    } else {
        return true;
    }
}

function logout() {
    localStorage.setItem("isLoggedIn", false);
    console.log("logged out");
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    console.log(isLoggedIn)
    location.reload(); 
}

function main() {
    window.open("index.html");
}
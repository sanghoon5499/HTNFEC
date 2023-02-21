document.addEventListener("DOMContentLoaded", function () {
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn == "true") {
        document.getElementById("login").innerHTML = "Your account";
    } else if (isLoggedIn == "false" || isLoggedIn == null) {
        document.getElementById("login").innerHTML = "Login";
    } 
});
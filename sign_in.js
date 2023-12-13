document.getElementById("signin-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const userEmail = document.getElementById("email").value;
    const userPass = document.getElementById("password").value;
    if (userEmail === "admin@admin" && userPass === "admin") {
        window.location.href = "admin-main.html";
    } else {
        localStorage.setItem("userEmail", userEmail);
        localStorage.setItem("userPass", userPass);
        window.location.href = "main-page.html";
    }
});
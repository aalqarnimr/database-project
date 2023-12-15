const supabaseUrl = "https://vrvtmqckywwkrakjciyq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZydnRtcWNreXd3a3Jha2pjaXlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIzMzY3NTQsImV4cCI6MjAxNzkxMjc1NH0.TC_jAS54Muu2Nz0tjVrryX1tyqrcA05OHTu5KaUEWck";

var database = supabase.createClient(supabaseUrl, supabaseKey);

document.getElementById("signin-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const userEmail = document.getElementById("email").value;
  const userPass = document.getElementById("password").value;
  if (userEmail === "admin@admin" && userPass === "admin") {
    localStorage.setItem("userEmail", userEmail);
    localStorage.setItem("userPass", userPass);
    window.location.href = "admin-main.html";
  } else {
    localStorage.setItem("userEmail", userEmail);
    localStorage.setItem("userPass", userPass);
    window.location.href = "main-page.html";
  }
});

userIdData = document.querySelector("#id");
userPasswordData = document.querySelector("#password");
alertText = document.querySelector(".alert-text");

async function getUser() {
  console.log(userPasswordData.value);
  try {
    var { data, error } = await database.rpc("user_login", {
      user_id: parseInt(userIdData.value),
      password: userPasswordData.value
    });
    if (error) {
      throw error;
    }
    redirectUser(data);
    console.log("Data from table:", data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

function redirectUser(data){
  if (data.length !=0){
    var userData = data[0];
  }
  else{
    alertText.style.display = "block";
    return;
  }
  if (userData.user_type=="A"){
    localStorage.setItem("userID", userData.id);
    localStorage.setItem("userType", userData.user_type);
    window.location.href = "admin-main.html";
  }
  else if (userData.user_type=="R"){
    localStorage.setItem("userID", userData.id);
    localStorage.setItem("userType", userData.user_type);
    window.location.href = "main-page.html";
  }
  else if (userData.user_type=="D"){
    localStorage.setItem("userID", userData.id);
    localStorage.setItem("userType", userData.user_type);
    window.location.href = "main-page-donor.html";
  }
}
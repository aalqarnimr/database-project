userId = localStorage.getItem("userID");
userType = localStorage.getItem("userType");
profileButton = document.querySelector(".profile-href");
console.log(profileButton);
if (userType=="D"){
    profileButton.setAttribute("href","main-page-donor.html");
}
const supabaseUrl = "https://vrvtmqckywwkrakjciyq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZydnRtcWNreXd3a3Jha2pjaXlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIzMzY3NTQsImV4cCI6MjAxNzkxMjc1NH0.TC_jAS54Muu2Nz0tjVrryX1tyqrcA05OHTu5KaUEWck";
var database = supabase.createClient(supabaseUrl, supabaseKey);

const Fname = document.getElementById("firstname");
const Lname = document.getElementById("lastname");
const ID = document.getElementById("ID");
const email = document.getElementById("email");
const contact_number = document.getElementById("contact-number");
const Blood_type = document.getElementById("blood-type");
const birthdayLabel = document.querySelector('label[for="birthday"]');
const birthday = document.getElementById("birthday");
const medicalHistory = document.getElementById("medical-history");
const newMedicalHistory = document.getElementById("new-medical-history");
const newMedicalLabel = document.querySelector(
  'label[for="new-medical-history"]'
);
const weightLabel = document.querySelector('label[for="weight"]');
const weight = document.getElementById("weight");
const caseNumber = document.getElementById("caseNumber");
const caseNumberLabel = document.querySelector('label[for="caseNumber"]');
const Address = document.getElementById("address");
caseNumber.style.display = "none";
caseNumberLabel.style.display = "none";

async function setEnviroment() {
  if (userType == "D") {
    toggleDonorProfile();
    var { data, error } = await database.rpc("get_profileinfo_donor", {
      entered_id: parseInt(userId),
    });
    console.log(error);
    data = data[0];
    weight.value = data.weight;
    birthday.value = data.birthday;
  } else if (userType == "R") {
    toggleRecepientProfile();
    var { data, error } = await database.rpc("get_profileinfo_recipent", {
      entered_id: parseInt(userId),
    });
    data = data[0];
    caseNumber.value = data.case_number;
  }
  console.log(data);
  ID.value = userId;
  Fname.value = data.fname;
  Lname.value = data.lname;
  email.value = data.email;
  contact_number.value = data.contact_number;
  Blood_type.value = data.blood_type;
  Address.value = data.address;
  var { data, error } = await database.rpc("profileinfo_medicalhistory", {
    entered_id: parseInt(userId),
  });
  const listOfMedicalHistories = data.map((obj) => obj.medical_history);
  console.log(listOfMedicalHistories);
  medicalString = listToString(listOfMedicalHistories);
  medicalHistory.value = medicalString;
}
setEnviroment();

function toggleDonorProfile() {
  weight.style.display = "block";
  weightLabel.style.display = "block";
  birthday.style.display = "block";
  birthdayLabel.style.display = "block";
  caseNumber.style.display = "none";
  caseNumberLabel.style.display = "none";
}
function toggleRecepientProfile() {
  weight.style.display = "none";
  weightLabel.style.display = "none";
  birthday.style.display = "none";
  birthdayLabel.style.display = "none";
  caseNumber.style.display = "block";
  caseNumberLabel.style.display = "block";
}

function listToString(arr) {
  const reversedString = arr.join(",");
  return reversedString;
}

async function submitRequest(){
    const date = new Date();
    var { data, error } = await database.rpc("add_update_request", {
        user_id: parseInt(userId),
        weight:weight.value,
        address:Address,
        disease:newMedicalHistory.value,
        date:date
    }).then((response)=>{
        window.location.href= "submission.html";
    });
    console.log(error);
}
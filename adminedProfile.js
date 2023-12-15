const supabaseUrl = "https://vrvtmqckywwkrakjciyq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZydnRtcWNreXd3a3Jha2pjaXlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIzMzY3NTQsImV4cCI6MjAxNzkxMjc1NH0.TC_jAS54Muu2Nz0tjVrryX1tyqrcA05OHTu5KaUEWck";
var database = supabase.createClient(supabaseUrl, supabaseKey);

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const action = urlParams.get("action");
const userId = urlParams.get("userid");
const userType = urlParams.get("type");

const donRadio = document.querySelector(".donorRadio");
const recRadio = document.querySelector(".recipientRadio");
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
const Password = document.getElementById("password");
caseNumber.style.display = "none";
caseNumberLabel.style.display = "none";

async function setEnviroment() {
  if (action == "modify") {
    if (userType == "donor") {
      donRadio.disabled = true;
      recRadio.disabled = true;
      var { data, error } = await database.rpc("get_profileinfo_donor", {
        entered_id: parseInt(userId),
      });
      console.log(data);
      data = data[0];
      weight.value = data.weight;
      birthday.value = data.birthday;
    } else if (userType == "recipient") {
      recRadio.checked = true;
      donRadio.disabled = true;
      recRadio.disabled = true;
      const { data, error } = await database.rpc("get_profile_info_recipent", {
        entered_id: parseInt(userId),
      });
      caseNumber.value = data.case_number;
    }
    ID.value = userId;
    Fname.value = data.fname;
    Lname.value = data.lname;
    email.value = data.email;
    contact_number.value = data.contact_number;
    Blood_type.value = data.blood_type;
    Address.value = data.address;
    Password.value = data.password;
  }
  var { data, error } = await database.rpc("profileinfo_medicalhistory", {
    entered_id: parseInt(userId),
  });
  const listOfMedicalHistories = data.map((obj) => obj.medical_history);
  console.log(listOfMedicalHistories);
  medicalString = listToString(listOfMedicalHistories);
  medicalHistory.value = medicalString;
  medicalHistory.disabled = true;
  newMedicalHistory.style.display = "block";
  newMedicalLabel.style.display = "block";
}
setEnviroment();

async function saveMedicalHistory(list, id) {
  for (element in list) {
    var { data, error } = await database
      .from("Person_medical_history")
      .insert([{ id, medical_history: element }])
      .then((response) => {
        console.log("Medial history saved seccessfully");
      });
  }
}

function saveChanges() {
  const Fname = document.getElementById("firstname").value;
  const Lname = document.getElementById("lastname").value;
  const id = document.getElementById("ID").value;
  const email = document.getElementById("email").value;
  const contact_number = document.getElementById("contact-number").value;
  const Blood_type = document.getElementById("blood-type").value;
  const Birthday = document.getElementById("birthday").value;
  const medicalHistory = document.getElementById("medical-history").value;
  const Weight = document.getElementById("weight").value;
  const Address = document.getElementById("address").value;
  const Password = document.getElementById("password").value;
  const case_number = document.getElementById("caseNumber").value;
  const donRadio = document.querySelector(".donorRadio");
  const recRadio = document.querySelector(".recipientRadio");
  if (action != "modify") {
    database
      .from("PERSON")
      .insert([
        {
          id,
          Fname,
          Lname,
          email,
          contact_number,
          Blood_type,
          Address,
          Password,
        },
      ])
      .then((response) => {
        console.log("Data inserted to PERSON successfully:", response);
        if (donRadio.checked) {
          database
            .from("DONOR")
            .insert([
              {
                id,
                Birthday,
                Weight,
              },
            ])
            .then((response) => {
              console.log("Data inserted to DONOR successfully:", response);
            })
            .catch((error) => {
              console.error("Error inserting to DONOR data:", error);
            });
        } else if (recRadio.checked) {
          database
            .from("RECIPIENT")
            .insert({
              id,
              case_number,
            })
            .then((response) => {
              console.log("Data inserted to RECEPINET successfully:", response);
            })
            .catch((error) => {
              console.error("Error inserting to RECEPIENT data:", error);
            });
        }
        mappedObjects = stringToList(medicalHistory).map((element) => ({
          id: id,
          medical_history: element,
        }));
        database
          .from("Person_medical_history")
          .insert(mappedObjects)
          .then((response) => {
            console.log("Medial history saved seccessfully");
          });
      })
      .catch((error) => {
        console.error("Error inserting to PERSON data:", error);
      });
  } else {
    database
      .from("PERSON")
      .update([
        {
          id,
          Fname,
          Lname,
          email,
          contact_number,
          Blood_type,
          Address,
          Password,
        },
      ])
      .eq("id", id)
      .then((response) => {
        console.log("modified PERSON successfully:", response);
        if (donRadio.checked) {
          database
            .from("DONOR")
            .update([
              {
                id,
                Birthday,
                Weight,
              },
            ])
            .eq("id", id)
            .then((response) => {
              console.log("modified DONOR successfully:", response);
            })
            .catch((error) => {
              console.error("Error modifying DONOR data:", error);
            });
        } else if (recRadio.checked) {
          database
            .from("RECIPIENT")
            .update({
              id,
              case_number,
            })
            .eq("id", id)
            .then((response) => {
              console.log("modified RECEPINET successfully:", response);
            })
            .catch((error) => {
              console.error("Error inserting to RECEPIENT data:", error);
            });
        }
        if (newMedicalHistory.value != null) {
          database
            .from("Person_medical_history")
            .insert({ id, medical_history: newMedicalHistory.value })
            .then((response) => {
              console.log("Medial history saved seccessfully");
            });
        }
      })
      .catch((error) => {
        console.error("Error inserting to PERSON data:", error);
      });
  }
}
async function getPersonData() {
  console.log(database);
  try {
    var { data, error } = await database.from("PERSON").select("*");

    if (error) {
      throw error;
    }

    console.log("Data from table:", data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

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
function stringToList(str) {
  const itemList = str.split(",");
  return itemList;
}
function listToString(arr) {
  const reversedString = arr.join(",");
  return reversedString;
}

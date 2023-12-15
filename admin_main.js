otherReportsButtons = document.querySelector(".other-buttons");
otherReportsTable = document.querySelector(".otherReportsTable");
//-------------------------------database functions-------------------------------------------------------
const supabaseUrl = "https://vrvtmqckywwkrakjciyq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZydnRtcWNreXd3a3Jha2pjaXlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIzMzY3NTQsImV4cCI6MjAxNzkxMjc1NH0.TC_jAS54Muu2Nz0tjVrryX1tyqrcA05OHTu5KaUEWck";

var database = supabase.createClient(supabaseUrl, supabaseKey);
localStorage.setItem("database", database);
async function getPersonData() {
  try {
    var { data, error } = await database.rpc("get_persons_with_user_type");

    if (error) {
      throw error;
    }
    showUsers(data);
    console.log("Data from table:", data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}
async function getPersonData() {
  try {
    var { data, error } = await database.rpc("get_persons_with_user_type");

    if (error) {
      throw error;
    }
    showUsers(data);
    console.log("Data from table:", data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}
async function getRecepientRequests() {
  try {
    var { data, error } = await database.rpc("get_person_blood_requests");

    if (error) {
      throw error;
    }
    showRecepinetRequests(data);
    console.log("Data from table:", data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}
async function removeUser(id, type) {
  try {
    var { data, error } = await database
      .from("PERSON")
      .update({ Password: "1" })
      .eq("id", id);
    getPersonData();
    if (error) {
      console.error("Error deleting user:", error.message);
    } else {
      console.log("User deleted successfully:", data);
    }
  } catch (error) {
    console.error("Error performing deletion:", error.message);
  }
}
//---------------------------------database functions-------------------------------------------------------
getRecepientRequests()
function showUsers(data) {
  const usersTable = document.querySelector(".usersTable");
  console.log(data);
  data.forEach((element) => {
    const userTuple = document.createElement("div");
    userTuple.className = element.id;
    userTuple.innerHTML = `<i>${element.fname}</i>
        <i>${element.id}</i>
        <i>${element.user_type}</i>
        <i>${element.blood_type}</i>
        <i>
          <button class=${element.id} onclick="removeUser(${element.id},'${element.user_type}')">
            <img
              src="trash-xmark-svgrepo-com.svg"
              alt="remove"
              height="15"
            />
          </button>
          <button>
            <a href="adminedProfile.html?action=modify&userid=${element.id}&type=${element.user_type}">
              <img
                src="pen-square-svgrepo-com.svg"
                alt="modify"
                height="15"
              />
            </a>
          </button>
        </i>`;
    usersTable.append(userTuple);
  });
}
function showRecepinetRequests(data) {
  const resReqTable = document.querySelector(".resTable");
  console.log(data);
  data.forEach((element) => {
    const resReqTuple = document.createElement("div");
    resReqTuple.className = element.id;
    resReqTuple.innerHTML = `<i>${element.fname}</i>
        <i>${element.id}</i>
        <i>${element.blood_type}</i>
        <i>${element.amount}</i>
        <i>${element.charge}</i>
        <i>
          <button class=${element.id}>
            <img
                src="trash-xmark-svgrepo-com.svg"
                alt="remove"
                height="15"
            />
          </button>
          <button>
            <a href="adminedProfile.html?userid=${element.id}">
              <img
                src="check-mark-svgrepo-com.svg"
                alt="accept"
                height="15"
              />
            </a>
          </button>
        </i>`;
    resReqTable.append(resReqTuple);
  });
}

function showDonorRequests(data) {
  resReqTable = document.querySelector(".resTable");
  console.log(data);
  data.forEach((element) => {
    const resReqTuple = document.createElement("div");
    resReqTuple.className = element.id;
    resReqTuple.innerHTML = `<i>${element.fname}</i>
        <i>${element.id}</i>
        <i>${element.blood_type}</i>
        <i>
          <button class=${element.id}>
            <img
                src="trash-xmark-svgrepo-com.svg"
                alt="remove"
                height="15"
            />
          </button>
          <button>
              <img
                src="check-mark-svgrepo-com.svg"
                alt="accept"
                height="15"
              />
          </button>
        </i>`;
    resReqTable.append(resReqTuple);
  });
}
getPersonData();
getRecepientRequests();

function showCollectionDrives() {
  console.log(data);
  otherReportsTable.innerHTML = `<div class="d-r_header">
    <i>Drive ID</i>
    <i>Total blood Recieved</i>
    <i>Start Date</i>
    <i>End Date</i>
    </div>`;
  collectionDriveRow = document.createElement("div");
  collectionDriveRow.className = "1223";
  collectionDriveRow.innerHTML = `<i>1223</i>
    <i>27</i>
    <i>
        12/01/2023
    </i>
    <i>
        12/31/2023
    </i>`;
  otherReportsTable.append(collectionDriveRow);
}
function showConfirmedPayments() {
  otherReportsTable.innerHTML = `<div class="d-r_header"> <i>Donor  Name</i>
    <i>User ID</i>
    <i>Blood Type</i>
    <i>Requested Amount</i>
    <i>Paid (SAR):</i>
    </div>
    `;
  confirmedPaymentRow = document.createElement("div");
  confirmedPaymentRow.className = "1114927923";
  confirmedPaymentRow.innerHTML = `<i>Raid qahtani</i>
    <i>1114927923</i>
    <i>
        O+
    </i>
    <i>
        3
    </i>
    <i>
        3000
    </i>
    `;
  otherReportsTable.append(confirmedPaymentRow);
}

function addUser() {}

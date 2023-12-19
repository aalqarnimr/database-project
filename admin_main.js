const usersTable = document.querySelector(".usersTable");
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
async function getProfileData() {
  try {
    var { data, error } = await database.rpc("show_update_request");

    if (error) {
      throw error;
    }
    showProfileRequests(data);
    console.log("Data from table profile:", data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}
async function getDonationReceived() {
  try {
    var { data, error } = await database.rpc("get_admin_donations_recieved");
    showDonationsReceived(data);

    if (error) {
      throw error;
    }
    console.log("Data from table profile:", data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}
async function getDonationReceivedMonth() {
  try {
    var { data, error } = await database.rpc(
      "get_admin_donations_recieved_last_month"
    );
    showDonationsReceived(data);

    if (error) {
      throw error;
    }
    console.log("Data from table profile:", data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}
async function getDonationReceivedWeek() {
  console.log("hereee");
  try {
    var { data, error } = await database.rpc(
      "get_admin_donations_recieved_last_week"
    );
    showDonationsReceived(data);

    if (error) {
      throw error;
    }
    console.log("Data from table profile:", data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}
async function getCollectionDrives() {
  try {
    var { data, error } = await database.rpc(
      "get_admin_other_reports_collection_drives"
    );
    showCollectionDrives(data);

    if (error) {
      throw error;
    }
    console.log("Data from table profile:", data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}
async function getConfirmedPayments() {
  try {
    var { data, error } = await database.rpc(
      "admin_other_reports_confirmed_payments"
    );
    console.log(error);
    console.log(data);
    showConfirmedPayments(data);

    if (error) {
      throw error;
    }
    console.log("Data from table profile:", data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}
async function getAggregatedBlood() {
  try {
    var { data, error } = await database.rpc("get_aggregated_blood_amount");
    console.log(error);
    console.log(data);
    showAggregatedBlood(data[0]);

    if (error) {
      throw error;
    }
    console.log("Data from table profile:", data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}
async function confirmProfileRequest(id) {
  var { data, error } = await database
    .from("UPDATE_REQUEST")
    .select()
    .eq("id", parseInt(id));
  Idata = data[0];
  console.log(Idata);
  try {
    removeProfileReq(Idata.id);
    if (Idata.weight != null) {
      var { data, error } = await database
        .from("DONOR")
        .update({ weight: data.weight })
        .eq("id", Idata.id);
    }
    var { data, error } = await database
      .from("PERSON")
      .update({ address: Idata.address })
      .eq("id", Idata.id);
    if (Idata.disease != null) {
      var { data, error } = await database
        .from("Person_medical_history")
        .insert({ id: Idata.id, medical_history: Idata.disease });
    }

    if (error) {
      throw error;
    }
    console.log("Data from table profile:", data);
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
async function confirmDonationRequest(id) {
  try {
    date = new Date();
    collectionDrive = formatDate(date);
    removeDonationReq(id);
    if (!collectionDrive) {
      collectionDrive = null;
    } else {
      var { data, error } = await database
        .from("BLOOD_COLLECTION_DRIVE")
        .select()
        .eq("id", parseInt(collectionDrive));
      if (data.length == 0) {
        var { firstDay, lastDay } = getFirstLastDay(collectionDrive);
        var { data, error } = await database
          .from("BLOOD_COLLECTION_DRIVE")
          .insert({
            id: parseInt(collectionDrive),
            start_date: firstDay,
            end_date: lastDay,
          });
      }
    }

    var { data, error } = await database
      .from("DONTION_REQUEST")
      .delete()
      .eq("id", parseInt(id));

    var { data, error } = await database.from("BLOOD").insert({
      Did: parseInt(id),
      donation_date: date,
      drive_id: collectionDrive,
    });

    if (error) {
      throw error;
    }
    console.log("Data from table:", data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

const bloodCompatibility = {
  "A+": ["A+", "A-", "O+", "O-"],
  "A-": ["A-", "O-"],
  "B+": ["B+", "B-", "O+", "O-"],
  "B-": ["B-", "O-"],
  "AB+": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  "AB-": ["A-", "B-", "AB-", "O-"],
  "O+": ["O+", "O-"],
  "O-": ["O-"],
};
async function getCompatibleBlood(id, bloodType, payment, date) {
  openFloatingWindow();
  var { data, error } = await database
    .rpc("get_nonused_blood")
    .select()
    .in("blood_type", bloodCompatibility[bloodType.toUpperCase()]);
  console.log(data);
  console.log(error);
  console.log(bloodType);
  confirmButton = document.querySelector(".confirm-button");
  confirmButton.setAttribute("onclick", `ConfirmBloodReq("${id}","${date}")`);
  showCompatibleBlood(data, payment);
}
async function ConfirmBloodReq(id, date) {
  datew = new Date(date);
  chargeInput = document.querySelector("#price");
  selectedBags = getCheckedBoxes();
  closeFloatingWindow();
  if (chargeInput.value == null||chargeInput.value==0 ) {
    chargeValue = 0;
    isCharged = false;
  } else {
    chargeValue = chargeInput.value;
    isCharged = true;
  }
  dates = new Date();
  var { data, error } = await database
    .from("BLOOD")
    .update({ receiving_date: dates, Rid: id })
    .in("tag", selectedBags);
  console.log(selectedBags);
  var { data, error } = await database
    .from("BLOOD_REQUEST")
    .update({ date: dates, id: id, conformed: true,charged:isCharged })
    .match({ date: date, id: id }).then((req)=>{
      // window.location.reload();
    });
  console.log(error);
}

async function getDonationRequests() {
  try {
    var { data, error } = await database.rpc("get_donation_requests");

    if (error) {
      throw error;
    }
    showDonorRequests(data);
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
    const dicardedTuple = document.getElementsByClassName(id.toString());
    console.log(dicardedTuple);
    dicardedTuple[0].remove();
    var { data, error } = await database
      .rpc("delete_info", { user_id: id })
      .then((r) => {
        window.location.reload();
      });
    if (error) {
      console.error("Error deleting user:", error.message);
    } else {
      console.log("User deleted successfully:", data);
    }
  } catch (error) {
    console.error("Error performing deletion:", error.message);
  }
}
async function removeProfileReq(id) {
  try {
    var { data, error } = await database
      .from("UPDATE_REQUEST")
      .delete()
      .eq("id", id);
    const dicardedTuple = document.getElementsByClassName("p" + id.toString());
    console.log(dicardedTuple);
    dicardedTuple[0].remove();
    if (error) {
      console.error("Error deleting user:", error.message);
    } else {
      console.log("User deleted successfully:", data);
    }
  } catch (error) {
    console.error("Error performing deletion:", error.message);
  }
}
async function removeBloodReq(id, date) {
  try {
    dates = new Date(date);
    var { data, error } = await database
      .from("BLOOD_REQUEST")
      .delete()
      .match({ id: id, date: date });
    console.log(data);
    const dicardedTuple = document.getElementsByClassName(
      "r" + id.toString() + date
    );
    console.log(dicardedTuple);
    dicardedTuple[0].remove();
    if (error) {
      console.error("Error deleting user:", error.message);
    } else {
      console.log("User deleted successfully:", data);
    }
  } catch (error) {
    console.error("Error performing deletion:", error.message);
  }
}
async function removeDonationReq(id) {
  try {
    var { data, error } = await database
      .from("DONTION_REQUEST")
      .delete()
      .eq("id", id);
    const dicardedTuple = document.getElementsByClassName("d" + id.toString());
    console.log(dicardedTuple);
    dicardedTuple[0].remove();
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
getProfileData();
getDonationRequests();
getAggregatedBlood();
getCollectionDrives();
getDonationReceived();
function showUsers(data) {
  const usersTable = document.querySelector(".usersTable");
  console.log(data);
  data.forEach((element) => {
    const userTuple = document.createElement("div");
    userTuple.className = `${element.id}`;
    userTuple.innerHTML = `<i>${element.fname}</i>
        <i>${element.id}</i>
        <i>${element.user_type}</i>
        <i>${element.blood_type}</i>
        <i>
          <button class=d${element.id} onclick="removeUser(${element.id},'${element.user_type}')">
            <img
              src="trash-xmark-svgrepo-com.svg"
              alt="remove"
              height="15"
            />
          </button>
          <a href="adminedProfile.html?action=modify&userid=${element.id}&type=${element.user_type}">
          <button>
              <img
                src="pen-square-svgrepo-com.svg"
                alt="modify"
                height="15"
              />
              </button>
              </a>
          <a href="mailto:${element.email}">
          <button>
              <img
                src="email-svgrepo-com.svg"
                alt="modify"
                height="15"
              />
              </button>
              </a>
        </i>`;
    usersTable.append(userTuple);
  });
}
function showProfileRequests(data) {
  const resReqTable = document.querySelector(".proTable");
  console.log(data);
  data.forEach((element) => {
    const resReqTuple = document.createElement("div");
    resReqTuple.className = `p${element.user_id}`;
    resReqTuple.innerHTML = `<i>${element.user_id}</i>
        <i>${element.disease}</i>
        <i>${element.weight}</i>
        <i>${element.address}</i>
        <i>
          <button class=rb${element.user_id} onclick="removeProfileReq(${element.user_id})">
            <img
                src="trash-xmark-svgrepo-com.svg"
                alt="remove"
                height="15"
            />
          </button>
          <button onclick="confirmProfileRequest(${element.user_id})">
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
function showRecepinetRequests(data) {
  const resReqTable = document.querySelector(".resTable");
  console.log(data);
  data.forEach((element) => {
    const resReqTuple = document.createElement("div");
    resReqTuple.className = `r${element.id}${element.date}`;
    resReqTuple.innerHTML = `<i>${element.fname}</i>
        <i>${element.id}</i>
        <i>${element.blood_type}</i>
        <i>${element.quantity}</i>
        <i>${element.status}</i>
        <i>
          <button class=rb${element.id} onclick='removeBloodReq("${
      element.id
    }","${element.date}")'>
            <img
                src="trash-xmark-svgrepo-com.svg"
                alt="remove"
                height="15"
            />
          </button>
          <button onclick='getCompatibleBlood(${element.id}, "${
      element.blood_type
    }", "${element.status}","${element.date}")'>
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

function showDonorRequests(data) {
  resReqTable = document.querySelector(".donorTable");
  console.log(data);
  data.forEach((element) => {
    const resReqTuple = document.createElement("div");
    resReqTuple.className = `d${element.id}`;
    resReqTuple.innerHTML = `<i>${element.fname}</i>
        <i>${element.id}</i>
        <i>${element.blood_type}</i>
        <i>
          <button class=${element.id} onclick="removeDonationReq(${element.id})">
            <img
                src="trash-xmark-svgrepo-com.svg"
                alt="remove"
                height="15"
            />
          </button>
          <button onclick="confirmDonationRequest(${element.id})">
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

function showDonationsReceived(data) {
  const otherReportsTable = document.querySelector(".donorReceievedTable");
  console.log(otherReportsTable);
  otherReportsTable.innerHTML = `<div class="d-r_header">
    <i>Donor Name</i>
    <i>Donor ID</i>
    <i>Blood Type</i>
    <i>Date</i>
    </div>`;
  data.forEach((element) => {
    collectionDriveRow = document.createElement("div");
    collectionDriveRow.className = `dc${element.donor_name}`;
    collectionDriveRow.innerHTML = `<i>${element.donor_name}</i>
      <i>${element.user_id}</i>
      <i>
          ${element.blood_type}
      </i>
      <i>
          ${element.donation_date}
      </i>`;
    otherReportsTable.append(collectionDriveRow);
  });
}
function showCollectionDrives(data) {
  const otherReportsTable = document.querySelector(".otherRT");
  console.log(otherReportsTable);
  otherReportsTable.innerHTML = `<div class="d-r_header">
    <i>Drive ID</i>
    <i>Total blood Recieved</i>
    <i>Start Date</i>
    <i>End Date</i>
    </div>`;
  data.forEach((element) => {
    collectionDriveRow = document.createElement("div");
    collectionDriveRow.className = element.drive_id;
    collectionDriveRow.innerHTML = `<i>${element.drive_id}</i>
      <i>${element.total_blood_recieved}</i>
      <i>
          ${element.start_date}
      </i>
      <i>
          ${element.end_date}
      </i>`;
    otherReportsTable.append(collectionDriveRow);
  });
}
function showConfirmedPayments() {
  const otherReportsTable = document.querySelector(".otherRT");
  otherReportsTable.innerHTML = `<div class="d-r_header"> <i>Recipient  Name</i>
    <i>User ID</i>
    <i>Blood Type</i>
    <i>Requested Amount</i>
    <i>Paid (SAR):</i>
    <i>Date:</i>
    </div>
    `;
  data.forEach((element) => {
    confirmedPaymentRow = document.createElement("div");
    confirmedPaymentRow.className = `c${element.id}`;
    confirmedPaymentRow.innerHTML = `
    <i>${element.fname}</i>
    <i>${element.id}</i>
    <i>
        ${element.blood_type}
    </i>
    <i>
        ${element.requested_amount}
    </i>
    <i>
        ${element.price}
    </i>
    <i>
        ${element.date}
    </i>
    `;
    otherReportsTable.append(confirmedPaymentRow);
  });
}

function formatDate() {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;

  if ([4, 8, 12].includes(month)) {
    const year = currentDate.getFullYear().toString().substr(-2);
    return `${month.toString().padStart(2, "0")}${year}`;
  } else {
    return false;
  }
}

function getFirstLastDay(yearMonthString) {
  const year = 2000 + parseInt(yearMonthString.substring(2), 10);
  const month = parseInt(yearMonthString.substring(0, 2), 10);
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  return {
    firstDay: firstDay,
    lastDay: lastDay,
  };
}
console.log(formatDate());

function showAggregatedBlood(data) {
  console.log(data);
  const bloodList = document.querySelector(".aggregated");
  bloodList.innerHTML = `
        <li>A: ${data["A"] == null ? 0 : data["A"]}</li>
        <li>A+: ${data["A+"] == null ? 0 : data["A+"]}</li>
        <li>B: ${data["B"] == null ? 0 : data["B"]}</li></li>
        <li>B+: ${data["B+"] == null ? 0 : data["B+"]}</li></li>
        <li>AB: ${data["AB"] == null ? 0 : data["AB"]}</li></li>
        <li>AB+: ${data["AB+"] == null ? 0 : data["AB+"]}</li></li>
        <li>O: ${data["O"] == null ? 0 : data["O"]}</li></li>
        <li>O+: ${data["O+"] == null ? 0 : data["O+"]}</li></li>
  `;
}
function handlePeriodChange(selectedValue) {
  if (selectedValue === "All") {
    getDonationReceived();
  } else if (selectedValue === "Last-Week") {
    getDonationReceivedWeek();
  } else if (selectedValue === "Last-month") {
    getDonationReceivedMonth();
  }
}
function openFloatingWindow() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("floatingWindow").style.display = "block";

  document.body.style.overflow = "hidden";
}

function closeFloatingWindow() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("floatingWindow").style.display = "none";

  document.body.style.overflow = "auto";
}

function showCompatibleBlood(data, payment) {
  table = document.querySelector(".bloodTable");
  table.innerHTML = `<div class="bloodHeader">
  <i>Blood Type</i>
  <i>Donation Date</i>
  <i>Select</i>
  </div>`;
  priceInput = document.querySelector("#price");
  if (payment == "charged") {
    priceInput.style.display = "inline";
  } else {
    priceInput.style.display = "none";
  }
  data.forEach((element) => {
    console.log(element);
    newRow = document.createElement("div");
    newRow.className = element.tag_number;
    newRow.innerHTML = `<i>${element.blood_type}</i>
    <i>${element.donation_date}</i>
    <i><input type="checkbox" name="bloodchk1" class="bloodchk" id="${element.tag_number}"></i>`;
    table.append(newRow);
  });
}

function getCheckedBoxes() {
  const checkboxes = document.querySelectorAll(".bloodchk:checked");
  const checkedIds = [];
  checkboxes.forEach((checkbox) => {
    checkedIds.push(checkbox.id);
  });
  console.log("Checked IDs:", checkedIds);
  return checkedIds;
}

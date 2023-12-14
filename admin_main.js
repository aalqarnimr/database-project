otherReportsButtons = document.querySelector(".other-buttons");
otherReportsTable = document.querySelector(".otherReportsTable");
//---------------------------database functions-------------------------------------------------------
const supabaseUrl = "https://vrvtmqckywwkrakjciyq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZydnRtcWNreXd3a3Jha2pjaXlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIzMzY3NTQsImV4cCI6MjAxNzkxMjc1NH0.TC_jAS54Muu2Nz0tjVrryX1tyqrcA05OHTu5KaUEWck";

var database = supabase.createClient(supabaseUrl, supabaseKey);
localStorage.setItem("database", database);
async function getPersonData() {
    try {
      var { data, error } = await database.from('PERSON').select("*");
        
      if (error) {
        throw error;
      }
  
      console.log('Data from table:', data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }

//---------------------------database functions-------------------------------------------------------


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

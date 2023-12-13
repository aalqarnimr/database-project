otherReportsButtons = document.querySelector(".other-buttons");
otherReportsTable = document.querySelector(".otherReportsTable");

function showCollectionDrives(){
    otherReportsTable.innerHTML =  `<div class="d-r_header">
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
    </i>`
    otherReportsTable.append(collectionDriveRow);
}
function showConfirmedPayments(){
    otherReportsTable.innerHTML =  `<div class="d-r_header"> <i>Donor  Name</i>
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
    `
    otherReportsTable.append(confirmedPaymentRow);
}

function addUser(){
    
}
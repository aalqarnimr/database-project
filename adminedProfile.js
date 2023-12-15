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
const birthdayLabel = document.querySelector('label[for="birthday"]')
const birthday = document.getElementById("birthday");
const medicalHistory = document.getElementById("medical-history");
const weightLabel = document.querySelector('label[for="weight"]');
const weight = document.getElementById("weight");
const caseNumber = document.getElementById("caseNumber");
const caseNumberLabel = document.querySelector('label[for="caseNumber"]');
const Address = document.getElementById("address");
const Password = document.getElementById("password");
caseNumber.style.display = "none";
caseNumberLabel.style.display = "none";
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
    database
        .from('PERSON')
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
            console.log('Data inserted to PERSON successfully:', response);
        })
        .catch((error) => {
            console.error('Error inserting to PERSON data:', error);
        });
    if (donRadio.checked){
        database.from("DONOR").insert([{
            id,
            Birthday,
            Weight
        }]).then((response) => {
            console.log('Data inserted to DONOR successfully:', response);
        })
        .catch((error) => {
            console.error('Error inserting to DONOR data:', error);
        });
    }
    else if (recRadio.checked){
        database.from("RECIPIENT").insert({
            id,
            case_number
        }).then((response) => {
            console.log('Data inserted to RECEPINET successfully:', response);
        })
        .catch((error) => {
            console.error('Error inserting to RECEPIENT data:', error);
        });
    }
}
async function getPersonData() {
    console.log(database);
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


function toggleDonorProfile(){
    weight.style.display = "block";
    weightLabel.style.display = "block";
    birthday.style.display = "block";
    birthdayLabel.style.display = "block";
    caseNumber.style.display = "none";
    caseNumberLabel.style.display = "none";

}
function toggleRecepientProfile(){
    weight.style.display = "none";
    weightLabel.style.display = "none";
    birthday.style.display = "none";
    birthdayLabel.style.display = "none";
    caseNumber.style.display = "block";
    caseNumberLabel.style.display = "block";

}
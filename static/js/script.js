// ===========================================
// Landmark AI Explorer
// ===========================================


// -------------------------
// Elements
// -------------------------

const imageInput = document.getElementById("imageInput");
const uploadForm = document.getElementById("uploadForm");

const previewImage = document.getElementById("previewImage");
const loader = document.getElementById("loader");


const monumentName = document.getElementById("monumentName");
const state = document.getElementById("state");


const history = document.getElementById("history");
const architecture = document.getElementById("architecture");
const speciality = document.getElementById("speciality");


const builder = document.getElementById("builder");
const builtYear = document.getElementById("builtYear");
const dynasty = document.getElementById("dynasty");
const unesco = document.getElementById("unesco");
const timings = document.getElementById("timings");
const entryFee = document.getElementById("entryFee");
const bestTime = document.getElementById("bestTime");


const gallery1 = document.getElementById("gallery1");
const gallery2 = document.getElementById("gallery2");
const gallery3 = document.getElementById("gallery3");


const googleMapBtn = document.getElementById("googleMapBtn");


// Leaflet variables

let map = null;


// -------------------------
// Image Preview
// -------------------------

imageInput.addEventListener("change",()=>{


    const file = imageInput.files[0];


    if(!file)
        return;


    previewImage.src = URL.createObjectURL(file);


    previewImage.style.display="block";


});




// -------------------------
// Upload Prediction
// -------------------------


uploadForm.addEventListener("submit", async(e)=>{


    e.preventDefault();


    const file=imageInput.files[0];


    if(!file){

        alert("Select an image");

        return;

    }



    loader.style.display="block";



    const formData=new FormData();


    formData.append(
        "image",
        file
    );



    try{


        const response = await fetch(
            "/predict",
            {

                method:"POST",

                body:formData

            }
        );



        const data = await response.json();



        loader.style.display="none";



        updateUI(data);



    }


   catch(error){

    loader.style.display = "none";

    console.error("Error:", error);

}



});





// -------------------------
// Update Frontend
// -------------------------


function updateUI(data){



    monumentName.innerText =
    data.monument;



    state.innerText =
    data.state;



    history.innerText =
    data.history;



    architecture.innerText =
    data.architecture;



    speciality.innerText =
    data.speciality;



    builder.innerText =
    data.builder;



    builtYear.innerText =
    data.built_year;



    dynasty.innerText =
    data.dynasty;



    unesco.innerText =
    data.unesco;



    timings.innerText =
    data.timings;



    entryFee.innerText =
    data.entry_fee;



    bestTime.innerText =
    data.best_time;





    // -------------------------
    // Gallery
    // -------------------------


    if(data.gallery){


        gallery1.src =
        data.gallery[0];


        gallery2.src =
        data.gallery[1];


        gallery3.src =
        data.gallery[2];


    }






    // -------------------------
    // Leaflet Map
    // -------------------------
console.log(data);

    loadMap(

        data.latitude,

        data.longitude,

        data.monument

    );



    document
    .querySelector(".result-section")
    .scrollIntoView({

        behavior:"smooth"

    });



}







// -------------------------
// Leaflet Map Function
// -------------------------


function loadMap(lat,lon,name){



    if(map){

        map.remove();

    }



    map = L.map("map")
    .setView(
        [
            lat,
            lon
        ],
        15
    );





    L.tileLayer(

        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",

        {

        attribution:
        "&copy; OpenStreetMap contributors"

        }

    )

    .addTo(map);





    L.marker(

        [
            lat,
            lon
        ]

    )

    .addTo(map)

    .bindPopup(name)

    .openPopup();





    googleMapBtn.href =

    `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;


// =========================
// GEMINI AI CHAT
// =========================

const sendBtn = document.getElementById("sendBtn");
const userMessage = document.getElementById("userMessage");
const chatMessages = document.getElementById("chatMessages");

function appendMessage(sender, text) {

    const div = document.createElement("div");

    div.className = "message";
    div.innerHTML =
`<strong>${sender}:</strong><br>${marked.parse(text)}`;

    

    chatMessages.appendChild(div);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendBtn.addEventListener("click", async () => {

    const question = userMessage.value.trim();

    if(question === "") return;

    appendMessage("You", question);

    userMessage.value = "";

    try{

        const response = await fetch("/chat",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                monument: monumentName.innerText,

                question: question

            })

        });

        const data = await response.json();

        appendMessage("AI Guide", data.answer);

    }

    catch(err){

        appendMessage("AI Guide","Sorry, I couldn't answer your question.");

        console.log(err);

    }

});


}
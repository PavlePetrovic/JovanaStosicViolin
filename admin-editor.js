// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getDatabase, ref, set, get, child, update, remove } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcb76BGi4Et9gSaAJLqd5PFoXglqWq9SE",
  authDomain: "jovanastosicviolin-18273.firebaseapp.com",
  databaseURL: "https://jovanastosicviolin-18273-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "jovanastosicviolin-18273",
  storageBucket: "jovanastosicviolin-18273.appspot.com",
  messagingSenderId: "850170398562",
  appId: "1:850170398562:web:7e255aa1c9302084bf4e3b",
  measurementId: "G-YE4WF26R5E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getDatabase();

const address = document.getElementById("address");
const time = document.getElementById("time");
const description = document.getElementById("description");
const uploadBtn = document.getElementById("uploadConcert");
const concertsPublished = document.getElementById("concerts-published");
const datepickerInput = document.getElementById("datepickerTest");
let dateG;
const addressEdit = document.getElementById("address-edit");
const datepickerEdit = document.getElementById("datepickerTestEdit");
const timeEdit = document.getElementById("time-edit");
const descriptionEdit = document.getElementById("description-edit");
const uploadBtnEdit = document.getElementById("uploadConcertEdit");

const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const dateTest = datepicker("#datepickerTest", {
  onSelect: (date) => {
    console.log(date.dateSelected.getTime());
    dateG = date.dateSelected.getTime();
  },
});

const insertData = () => {
  const myId = uid();
  set(ref(db, "NewConcerts/Concerts/" + myId), {
    id: myId,
    address: address.value,
    time: time.value,
    date: dateG ? dateG : "",
    description: description.value,
  })
    .then(() => {
      modal.style.display = "none";
      window.location.reload();
    })
    .catch(() => {
      alert("Error");
    });
};

uploadBtn.addEventListener("click", insertData);

let brandNewTime;
const editedDatePicker = datepicker("#datepickerTestEdit", {
  onSelect: (date) => {
    brandNewTime = new Date(date.dateSelected.getTime());
  },
});

setTimeout(() => {
  for (let childBox of concertsPublished.children) {
    childBox.querySelector(".fa-trash").addEventListener("click", () => {
      let id = childBox.getAttribute("key");
      remove(ref(db, "NewConcerts/Concerts/" + id))
        .then(() => {
          window.location.reload();
        })
        .catch(() => {
          alert("you deleted error");
        });
    });
    childBox.querySelector(".fa-pen-to-square").addEventListener("click", () => {
      let id = childBox.getAttribute("key");
      const dbref = ref(db);

      get(child(dbref, "NewConcerts/Concerts/" + id))
        .then((snapshot) => {
          if (snapshot.exists()) {
            addressEdit.value = snapshot.val().address;
            timeEdit.value = snapshot.val().time;
            editedDatePicker.dateSelected = new Date(snapshot.val().date);
            datepickerEdit.value = editedDatePicker.dateSelected.toDateString();
            let dateEdit = editedDatePicker.dateSelected;
            descriptionEdit.value = snapshot.val().description;

            modalEdit.style.display = "flex";
            concertsPublished.style.display = "none";

            uploadBtnEdit.addEventListener("click", () => {
              update(ref(db, "NewConcerts/Concerts/" + id), {
                address: addressEdit.value,
                time: timeEdit.value,
                date: brandNewTime ? brandNewTime.getTime() : dateEdit.getTime(),
                description: descriptionEdit.value,
              })
                .then(() => {
                  modalEdit.style.display = "none";
                  window.location.reload();
                })
                .catch(() => {
                  alert("Error");
                });
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
}, 500);

const addConcert = document.getElementById("add-concert");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");
const modalEdit = document.getElementById("modal-edit");
const closeModalEdit = document.getElementById("close-modal-edit");

addConcert.addEventListener("click", () => {
  address.value = "";
  time.value = "";
  datepickerInput.value = "";
  description.value = "";
  modal.style.display = "flex";
  concertsPublished.style.display = "none";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  concertsPublished.style.display = "flex";
});

closeModalEdit.addEventListener("click", () => {
  modalEdit.style.display = "none";
  concertsPublished.style.display = "flex";
});

const listConcerts = async () => {
  const res = await axios.get("https://jovanastosicviolin-18273-default-rtdb.europe-west1.firebasedatabase.app/NewConcerts/Concerts.json");
  const data = await res.data;
  let concertsArray = [];

  if (data) {
    for (let obj in data) {
      concertsArray.push(data[obj]);
    }
  }

  concertsArray = concertsArray.sort((a, b) => b.date - a.date);
  concertsPublished.innerHTML = "";
  concertsArray.forEach((d, i) => {
    let publishedBox = document.createElement("div");
    publishedBox.classList.add("published-box");
    let timeP = document.createElement("p");
    timeP.classList.add("timeStyle");
    let addressP = document.createElement("p");
    addressP.classList.add("line-clamp");
    addressP.classList.add("addressStyle");
    let dateP = document.createElement("p");
    dateP.classList.add("dateStyle");

    publishedBox.setAttribute("key", d.id);
    timeP.innerHTML += d.time + "h";
    addressP.innerHTML += d.address;
    dateP.innerHTML += `${formatDate(d.date, { month: "short", day: "2-digit", year: "numeric" })}`;

    let iconsWrapper = document.createElement("div");
    iconsWrapper.classList.add("icons-wrapper");
    let edit = document.createElement("i");
    edit.classList.add("fa-solid");
    edit.classList.add("fa-pen-to-square");
    let trash = document.createElement("i");
    trash.classList.add("fa-solid");
    trash.classList.add("fa-trash");

    concertsPublished.appendChild(publishedBox);
    publishedBox.appendChild(timeP);
    publishedBox.appendChild(dateP);
    publishedBox.appendChild(addressP);
    publishedBox.appendChild(iconsWrapper);
    iconsWrapper.append(edit);
    iconsWrapper.appendChild(trash);
  });
};

listConcerts();

// value: string,
//   formatting: {
//     month: "numeric" | "2-digit" | "long" | "short" | "narrow" | undefined;
//     day: "numeric" | "2-digit" | undefined;
//     year: "numeric" | "2-digit" | undefined;
//   }

const formatDate = (value, formatting) => {
  if (!value) return value;
  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value));
};

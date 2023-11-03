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
const month = document.getElementById("month");
const day = document.getElementById("day");
const year = document.getElementById("year");
const description = document.getElementById("description");
const uploadBtn = document.getElementById("uploadConcert");
const concertsPublished = document.getElementById("concerts-published");

const addressEdit = document.getElementById("address-edit");
const timeEdit = document.getElementById("time-edit");
const monthEdit = document.getElementById("month-edit");
const dayEdit = document.getElementById("day-edit");
const yearEdit = document.getElementById("year-edit");
const descriptionEdit = document.getElementById("description-edit");
const uploadBtnEdit = document.getElementById("uploadConcertEdit");

const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const insertData = () => {
  const myId = uid();
  set(ref(db, "Concerts/" + myId), {
    id: myId,
    address: address.value,
    time: time.value,
    month: month.value,
    day: day.value,
    year: year.value,
    description: description.value,
  })
    .then(() => {
      modal.style.display = "none";
      window.location.reload();
    })
    .catch(() => {
      alert("Error occuerd");
    });
};

uploadBtn.addEventListener("click", insertData);

setTimeout(() => {
  for (let childBox of concertsPublished.children) {
    childBox.querySelector(".fa-trash").addEventListener("click", () => {
      let id = childBox.getAttribute("key");
      remove(ref(db, "Concerts/" + id))
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

      get(child(dbref, "Concerts/" + id))
        .then((snapshot) => {
          if (snapshot.exists()) {
            addressEdit.value = snapshot.val().address;
            timeEdit.value = snapshot.val().time;
            monthEdit.value = snapshot.val().month;
            dayEdit.value = snapshot.val().day;
            yearEdit.value = snapshot.val().year;
            descriptionEdit.value = snapshot.val().description;
            modalEdit.style.display = "flex";

            uploadBtnEdit.addEventListener("click", () => {
              console.log(id, addressEdit.value, timeEdit.value, monthEdit.value, dayEdit.value, yearEdit.value);
              update(ref(db, "Concerts/" + id), {
                address: addressEdit.value,
                time: timeEdit.value,
                month: monthEdit.value,
                day: dayEdit.value,
                year: yearEdit.value,
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
  modal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

closeModalEdit.addEventListener("click", () => {
  modalEdit.style.display = "none";
});

const listConcerts = async () => {
  const res = await axios.get("https://jovanastosicviolin-18273-default-rtdb.europe-west1.firebasedatabase.app/Concerts.json");
  const data = await res.data;
  let concertsArray = [];

  if (data) {
    for (let obj in data) {
      concertsArray.push(data[obj]);
    }
  }

  concertsArray = concertsArray.reverse();
  concertsPublished.innerHTML = "";
  concertsArray.forEach((d, i) => {
    let publishedBox = document.createElement("div");
    publishedBox.classList.add("published-box");
    let timeP = document.createElement("p");
    let addressP = document.createElement("p");
    let dateP = document.createElement("p");

    publishedBox.setAttribute("key", d.id);
    timeP.innerHTML += d.time;
    addressP.innerHTML += d.address;
    dateP.innerHTML += `${d.day} ${d.month} ${d.year}`;

    let edit = document.createElement("i");
    edit.classList.add("fa-solid");
    edit.classList.add("fa-pen-to-square");
    let trash = document.createElement("i");
    trash.classList.add("fa-solid");
    trash.classList.add("fa-trash");

    concertsPublished.appendChild(publishedBox);
    publishedBox.appendChild(timeP);
    publishedBox.appendChild(addressP);
    publishedBox.appendChild(dateP);
    publishedBox.appendChild(edit);
    publishedBox.appendChild(trash);
  });
};

listConcerts();

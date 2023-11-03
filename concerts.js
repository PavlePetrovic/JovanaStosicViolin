const concertsBox = document.querySelector("#concerts-box");

const listConcertsPublic = async () => {
  const res = await axios.get("https://jovanastosicviolin-18273-default-rtdb.europe-west1.firebasedatabase.app/Concerts.json");
  const data = await res.data;
  const concertsArray = [];

  if (data) {
    for (let obj in data) {
      concertsArray.push(data[obj]);
    }
  }

  concertsBox.innerHTML = "";
  concertsArray.reverse();
  concertsArray.forEach((d) => {
    let concertCard = document.createElement("div");
    concertCard.classList.add("concert-card");
    let concertTimePlace = document.createElement("div");
    concertTimePlace.classList.add("concert-time-place");
    let concertTime = document.createElement("p");
    concertTime.classList.add("concert-time");
    let concertLine1 = document.createElement("div");
    concertLine1.classList.add("concert-line-1");
    let concertAdress = document.createElement("p");
    concertAdress.classList.add("concert-adress");
    let concertDescription = document.createElement("p");
    concertDescription.classList.add("concert-description");

    let concertDate = document.createElement("div");
    concertDate.classList.add("concert-date");
    let concertDayMonth = document.createElement("p");
    concertDayMonth.classList.add("concert-day-month");
    let concertLine2 = document.createElement("div");
    concertLine2.classList.add("concert-line-2");
    let concertYear = document.createElement("p");
    concertYear.classList.add("concert-year");

    concertTime.innerHTML += d.time;
    concertAdress.innerHTML += d.address;
    concertDayMonth.innerHTML += `${d.day} ${d.month}`;
    concertYear.innerHTML += `${d.year}`;
    concertDescription.innerHTML += `${d.description}`;

    concertsBox.appendChild(concertCard);
    concertCard.appendChild(concertTimePlace);
    concertTimePlace.appendChild(concertTime);
    concertTimePlace.appendChild(concertLine1);
    concertTimePlace.appendChild(concertAdress);
    concertTimePlace.appendChild(concertDescription);
    concertCard.appendChild(concertDate);
    concertDate.appendChild(concertDayMonth);
    concertDate.appendChild(concertLine2);
    concertDate.appendChild(concertYear);
  });
};

listConcertsPublic();

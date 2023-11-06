const concertsBox = document.querySelector("#concerts-box");

const listConcertsPublic = async () => {
  const res = await axios.get("https://jovanastosicviolin-18273-default-rtdb.europe-west1.firebasedatabase.app/NewConcerts/Concerts.json");
  const data = await res.data;
  let concertsArray = [];

  if (data) {
    for (let obj in data) {
      concertsArray.push(data[obj]);
    }
  }

  concertsBox.innerHTML = "";
  concertsArray = concertsArray.sort((a, b) => b.date - a.date);
  concertsArray.forEach((d) => {
    let concertCard = document.createElement("div");
    concertCard.classList.add("concert-card");
    let concertTimePlace = document.createElement("div");
    concertTimePlace.classList.add("concert-time-place");
    let concertDate = document.createElement("p");
    concertDate.classList.add("concert-date-new");
    let concertLine1 = document.createElement("div");
    concertLine1.classList.add("concert-line-1");
    let concertAdress = document.createElement("p");
    concertAdress.classList.add("concert-adress");
    let concertDescription = document.createElement("p");
    concertDescription.classList.add("concert-description");

    let concertTimeNewBox = document.createElement("div");
    concertTimeNewBox.classList.add("concert-time-new-box");
    let concertTime = document.createElement("p");
    concertTime.classList.add("concert-time-new");

    concertDate.innerHTML += `${formatDate(d.date, { month: "short", day: "2-digit", year: "numeric" })}`;
    concertAdress.innerHTML += d.address;
    concertTime.innerHTML += d.time + "h";
    concertDescription.innerHTML += `${d.description}`;

    concertsBox.appendChild(concertCard);
    concertCard.appendChild(concertTimePlace);
    concertTimePlace.appendChild(concertDate);
    concertTimePlace.appendChild(concertLine1);
    concertTimePlace.appendChild(concertAdress);
    concertTimePlace.appendChild(concertDescription);
    concertCard.appendChild(concertTimeNewBox);
    concertTimeNewBox.appendChild(concertTime);
  });

  let arrowDownDiv = document.createElement("div");
  arrowDownDiv.classList.add("arrow-div");
  let arrowDown = document.createElement("i");
  arrowDown.classList.add("fa-solid");
  arrowDown.classList.add("fa-arrow-down");

  concertsBox.appendChild(arrowDownDiv);
  arrowDownDiv.appendChild(arrowDown);

  arrowDown.addEventListener("click", () => {
    // concertsBox.scrollTop = concertsBox.scrollTop + 200;
    if (concertsBox.scrollHeight == concertsBox.scrollTop) {
      console.log("kraj");
    }
    concertsBox.scrollTo({ top: concertsBox.scrollTop + 200, behavior: "smooth" });
  });
};

listConcertsPublic();

const formatDate = (value, formatting) => {
  if (!value) return value;
  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value));
};

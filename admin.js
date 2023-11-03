const nameInput = document.getElementById("name");
const passInput = document.getElementById("password");
const logInBtn = document.getElementById("log-in");
const errorP = document.getElementById("error");

logInBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let nameValue = nameInput.value.trim();
  let passValue = passInput.value.trim();

  if (nameValue !== "Jovana" || passValue !== "Jovana.2023") {
    logInBtn.innerText = "Incorect Values";
    logInBtn.style.backgroundColor = "rgb(249, 159, 159)";

    let errorText = "";

    if (nameValue !== "Jovana") {
      errorText += "Invalid Email ";
      nameInput.style.border = "2px solid rgb(249, 159, 159)";
    }
    if (passValue !== "Jovana.2023") {
      errorText += "Invalid Password";
      passInput.style.border = "2px solid rgb(249, 159, 159)";
    }

    error.style.visibility = "initial";
    error.innerText = errorText;
    setTimeout(() => {
      logInBtn.innerText = "Log in";
      logInBtn.style.backgroundColor = "white";
      nameInput.style.border = "2px solid transparent";
      passInput.style.border = "2px solid transparent";
    }, 3000);
  } else {
    error.style.visibility = "hidden";
    error.innerText = "";
    window.location.assign("./admin-editor.html");
  }
});

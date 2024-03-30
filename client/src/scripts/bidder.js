//bidder
const socket = io();
const statusEncheres = document.getElementById("enchereInfo");
const auctionStatus = document.getElementById("offre");
const Boutton10Euro = document.getElementById("10euro");
const Boutton50Euro = document.getElementById("50euro");
const Boutton100Euro = document.getElementById("100euro");
const message = document.getElementById("item");

const refreshStatus = (value) => {
  if (value == "waiting") {
    statusEncheres.innerHTML = "En attente du debut de l'enchere...";
    cacherButtons();
    desactiverButtons();
  } else if (value == "playing") {
    statusEncheres.innerHTML = "Enchere en cours";
    showButtons();
    desactiverButtons();
  }
};

Boutton10Euro.addEventListener("click", () => {
  desactiverButtons();
  statusEncheres.innerHTML = "";
  auctionStatus.innerHTML = "10";
  socket.emit("newoffer", 10);
  activerButtons();
});

Boutton50Euro.addEventListener("click", () => {
  desactiverButtons();
  statusEncheres.innerHTML = "";
  auctionStatus.innerHTML = "50";
  socket.emit("newoffer", 50);
  activerButtons();
  statusEncheres.innerHTML = "Veuillez faire une offre";
});

Boutton100Euro.addEventListener("click", () => {
  desactiverButtons();
  statusEncheres.innerHTML = "";
  auctionStatus.innerHTML = "100";
  socket.emit("newoffer", 100);
  activerButtons();
  statusEncheres.innerHTML = "Veuillez faire une offre";
});

const cacherButtons = () => {
  Boutton10Euro.style.visibility = "hidden";
  Boutton50Euro.style.visibility = "hidden";
  Boutton100Euro.style.visibility = "hidden";
};

const showButtons = () => {
  Boutton10Euro.style.visibility = "visible";
  Boutton50Euro.style.visibility = "visible";
  Boutton100Euro.style.visibility = "visible";
};

const desactiverButtons = () => {
  Boutton10Euro.disabled = true;
  Boutton50Euro.disabled = true;
  Boutton100Euro.disabled = true;
};

const activerButtons = () => {
  Boutton10Euro.disabled = false;
  Boutton50Euro.disabled = false;
  Boutton100Euro.disabled = false;
};

socket.on("update", (price, desc) => {
  document.querySelector("#item").innerHTML = desc;
  document.querySelector("#current-price").innerHTML = price;
  activerButtons();
  showButtons();
  statusEncheres.innerHTML = "Veuillez faire une offre";
});

socket.on("maj", (totalPrice, value, id) => {
  document.querySelector("#current-price").innerHTML = totalPrice;
  if (socket.id == id) {
    document.querySelector("#fin").innerHTML =
      "Vous avez fait une enchere de + " + value + "€";
  } else {
    document.querySelector("#fin").innerHTML =
      "Nouvelle enchere de + " + value + "€";
  }
});

socket.on("end", (finalValue, descValue, lastBidderId) => {
  statusEncheres.innerHTML = "En attente d'une nouvelle enchère!";
  if (socket.id == lastBidderId) {
    document.querySelector(
      "#fin"
    ).innerHTML = `Bravo ! Vous avez gagné ${descValue} pour une valeur de ${finalValue}€`;
  } else {
    document.querySelector(
      "#fin"
    ).innerHTML = `Fin de l'enchère! ${descValue} a été remporter par ${lastBidderId} au prix de ${finalValue}€`;
  }
  desactiverButtons();
});

desactiverButtons();
cacherButtons();
socket.emit("encherisseur");
socket.on("status", (value) => refreshStatus(value));
socket.on("late", () => {
  message.innerHTML = message.innerHTML + "En attente, enchère en cours!";
});

socket.on("maxEncherisseurReached", () => {
  statusEncheres.innerHTML =
    "Nombre maximal de joueurs atteint, connexion refusée.";
  document.querySelector("#item").innerHTML = "en attente";
  document.querySelector("#current-price").innerHTML = "-€";
  desactiverButtons();
});

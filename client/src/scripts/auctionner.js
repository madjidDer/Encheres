//auctioneer
const socket = io();
const statusEncheres = document.getElementById("enchereStatus");
const price = document.getElementById("prixDepart");
const desc = document.getElementById("description");
const finalprice = document.getElementById("prixactuel");
const StartingButton = document.getElementById("start");
const BiddingButton = document.getElementById("terminer");

let IdDernierBidder = null;
let MaximumPrice = null;

const disableButtons = () => {
  StartingButton.disabled = true;
  BiddingButton.disabled = true;
};

const enableButtons = () => {
  StartingButton.disabled = false;
  BiddingButton.disabled = false;
};

const refreshStatus = (value) => {
  if (value == "waiting") {
    statusEncheres.innerHTML = "En attente des encherisseurs...";
    disableButtons();
  } else if (value == "playing") {
    statusEncheres.innerHTML = "Veuillez debuter l'enchere";
    enableButtons();
  }
};

StartingButton.addEventListener("click", () => {
  let priceValue = price.value;
  let descValue = desc.value;
  socket.emit("start", priceValue, descValue);
  statusEncheres.innerHTML = "Enchere en cours";
  StartingButton.disabled = true;
});

BiddingButton.addEventListener("click", () => {
  let descValue = desc.value;
  socket.emit("end", MaximumPrice, descValue, IdDernierBidder);
  statusEncheres.innerHTML = "";
  BiddingButton.disabled = true;
});

socket.on("maj", (totalPrice, value, id) => {
  document.getElementById("informations").innerHTML = "Enchere reçue de";
  document.getElementById("infotxt").innerHTML = ":+ ";
  document.getElementById("encherePrice").innerHTML = value + "€";
  document.getElementById("encherisseur").innerHTML = id;
  finalprice.innerHTML = totalPrice;
  MaximumPrice = totalPrice;
  IdDernierBidder = id;
});

socket.on("end", (MaximumPrice, descValue, IdDernierBidder) => {
  document.getElementById("informations").innerHTML = "Fin de l'enchère !";
  document.getElementById("infotxt").innerHTML = "";
  document.getElementById("encherePrice").innerHTML = "";
  document.getElementById("encherisseur").innerHTML = "";
  finalprice.innerHTML = "-€";
  document.getElementById("fin").innerHTML =
    descValue +
    " remporter au prix de " +
    MaximumPrice +
    "€ par " +
    IdDernierBidder;
  statusEncheres.innerHTML = "Vous pouvez relancer une autre enchère!";
  StartingButton.disabled = false;
});

socket.on("update", () => {
  BiddingButton.disabled = false;
});

disableButtons();
socket.emit("commissaire");
socket.on("status", (value) => refreshStatus(value));

socket.on("maxCommissaireReached", () => {
  statusEncheres.innerHTML =
    "Nombre maximal de joueurs atteint, connexion refusée.";
  disableButtons();
});

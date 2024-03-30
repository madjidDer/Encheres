export default class SocketController {
  constructor(io) {
    this.io = io;
    this.commissaireID = "";
    this.commissaireSocket = null;
    this.bidders = [];
    this.isFinished = false;
    this.startPrice = "";
    this.newPrice = "";
    this.currentTotalPrice = 0;
    this.itemDescription = "";
    this.started = false;
    this.attente = [];
  }

  registerSocket(socket) {
    socket.on("commissaire", () => this.addCommissaire(socket));
    socket.on("encherisseur", () => this.addBidder(socket));
    socket.on("start", (price, desc) => this.initAuction(socket, price, desc));
    socket.on("newoffer", (value) => this.bid(socket, value));
    socket.on("end", (finalValue, descValue, lastBidderId) =>
      this.finishAuction(socket, finalValue, descValue, lastBidderId)
    );
    socket.on("disconnect", () => this.disconnect(socket));
  }

  addBidder(socket) {
    if (!this.started) {
      this.bidders.push({ id: socket.id, socket: socket });
      this.checkReady();
    } else {
      this.attente.push({ id: socket.id, socket: socket });
      socket.emit("late");
    }
  }

  addCommissaire(socket) {
    if (this.commissaireID == "") {
      this.commissaireID = socket.id;
      this.commissaireSocket = socket;
    } else {
      socket.emit("maxCommissaireReached");
      socket.disconnect(true);
    }
    this.checkReady();
  }

  disconnect(socket) {
    if (this.commissaireID == socket.id) {
      this.commissaireID = "";
      this.commissaireSocket = null;
    } else {
      const index = this.bidders.findIndex((e) => e.id === socket.id);
      if (index !== -1) {
        this.bidders.splice(index, 1);
      }
    }
    if (!this.isFinished) {
      this.checkReady();
    } else {
      this.isFinishedGame = true;
    }
  }

  initAuction(socket, price, desc) {
    if (socket.id == this.commissaireID) {
      this.startPrice = price;
      this.itemDescription = desc;
      this.bidders.forEach(({ socket }) => socket.emit("update", price, desc));
      this.commissaireSocket.emit("update", price);
      this.started = true;
      this.isFinished = false;
    }
  }

  checkReady() {
    if (this.commissaireID != "" && this.bidders.length >= 2) {
      this.commissaireSocket.emit("status", "playing");
      this.bidders.forEach(({ socket }) => socket.emit("status", "playing"));
    } else {
      this.commissaireSocket?.emit("status", "waiting");
      this.bidders.forEach(({ socket }) => socket.emit("status", "waiting"));
    }
  }

  bid(socket, value) {
    const bidder = this.bidders.find((e) => e.id === socket.id);
    if (bidder) {
      this.newPrice = parseInt(this.startPrice) + parseInt(value);
      this.currentTotalPrice = this.newPrice;
      this.startPrice = this.newPrice;
      this.bidders.forEach(({ socket }) =>
        socket.emit("maj", this.currentTotalPrice, value, bidder.id)
      );
      this.commissaireSocket.emit(
        "maj",
        this.currentTotalPrice,
        value,
        bidder.id
      );
    }
  }

  finishAuction(socket, finalValue, descValue, lastBidderId) {
    if (socket.id == this.commissaireID) {
      this.isFinished = true;
      this.commissaireSocket.emit("end", finalValue, descValue, lastBidderId);
      this.bidders.forEach(({ socket }) => {
        socket.emit("end", finalValue, descValue, lastBidderId);
        this.attente.push({ id: socket.id, socket: socket });
      });
      this.bidders = this.attente;
      this.started = false;
      this.attente = [];
    }
  }
}

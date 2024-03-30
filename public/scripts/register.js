const socket = io();
socket.emit("spectate");
socket.on("info", (value) => console.log(value));
socket.on("ok", () => console.log("ok"));

const handleSubmit = (event) => {
    const formElements = document.querySelectorAll('.newsletter-form input');
    const name = Array.from(formElements).filter(element => element.name)[0];
    Cookies.set("connect", "name");
    console.log(name);
}
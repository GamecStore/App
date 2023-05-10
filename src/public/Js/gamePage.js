const scrollButton = document.getElementById('scrollButton');
const content = document.getElementById('focusContent');

scrollButton.addEventListener('click', e => {
    content.scrollIntoView({ behavior: "smooth" });
});
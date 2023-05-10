const links = document.getElementById('scrol_to');
const content = document.getElementById('faq');

links.addEventListener('click', e => {
    content.scrollIntoView({ behavior: "smooth" });
});
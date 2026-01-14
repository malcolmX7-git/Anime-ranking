const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu-links');

burger.addEventListener('click', () => {
    menu.classList.toggle('active');
    burger.classList.toggle('toggle');
});

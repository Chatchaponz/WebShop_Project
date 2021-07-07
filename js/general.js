/* Get element from class */
const navOpen = document.querySelector(".nav__hamburger");
const navClose = document.querySelector(".close__toggle");
const menu = document.querySelector(".nav__menu");

navOpen.addEventListener('click', () => {
    const navLeft = menu.getBoundingClientRect().left;

    if(navLeft < 0)
    {
        menu.style.left = '0';
        document.body.classList.add('active');
    }
    else
    {
        menu.style.left = '-40rem';
        document.body.classList.add('active');
    }
});

navClose.addEventListener('click', () => {
    const navLeft = menu.getBoundingClientRect().left;

    if(navLeft > 0)
    {
        menu.style.left = '0';
        document.body.classList.add('active');
    }
    else
    {
        menu.style.left = '-40rem';
        document.body.classList.add('active');
    }
});

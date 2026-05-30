const btnRight = document.getElementById('arrow-right');
const btnLeft = document.getElementById('arrow-left');
const moviesList = document.getElementById('moviesList');

const menuToggle = document.getElementById('menuToggle');
const menuClose = document.getElementById('menuClose');
const sideMenu = document.getElementById('sideMenu');
const menuOverlay = document.getElementById('menuOverlay');
const pageLinks = document.querySelectorAll('.page-link');

function openMenu() {
    document.body.classList.add('menu-open');
    sideMenu?.setAttribute('aria-hidden', 'false');
}

function closeMenu() {
    document.body.classList.remove('menu-open');
    sideMenu?.setAttribute('aria-hidden', 'true');
}

menuToggle?.addEventListener('click', openMenu);
menuClose?.addEventListener('click', closeMenu);
menuOverlay?.addEventListener('click', closeMenu);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
});

pageLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#')) return;

        event.preventDefault();
        closeMenu();
        document.body.classList.add('page-transition');

        setTimeout(() => {
            window.location.href = href;
        }, 220);
    });
});

btnRight?.addEventListener('click', () => {
    moviesList?.scrollBy({
        left: 220,
        behavior: 'smooth'
    });
});

btnLeft?.addEventListener('click', () => {
    moviesList?.scrollBy({
        left: -220,
        behavior: 'smooth'
    });
});

moviesList?.addEventListener('scroll', () => {
    if (moviesList.scrollLeft > 0) {
        btnLeft.style.display = 'block';
    } else {
        btnLeft.style.display = 'none';
    }

    const maxScrollLeft = moviesList.scrollWidth - moviesList.clientWidth;
    if (moviesList.scrollLeft >= maxScrollLeft - 5) {
        btnRight.style.display = 'none';
    } else {
        btnRight.style.display = 'flex';
    }
});

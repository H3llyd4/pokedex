const btnRight = document.getElementById('arrow-right');
const btnLeft = document.getElementById('arrow-left');
const moviesList = document.getElementById('moviesList');

btnRight.addEventListener('click', () => {
    moviesList.scrollBy({
        left: 220,
        behavior: 'smooth'
    })
})

btnLeft.addEventListener('click', () => {
    moviesList.scrollBy({
        left: -220,
        behavior: 'smooth'
    })
})

moviesList.addEventListener('scroll', () => {
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
})
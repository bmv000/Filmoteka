// import './modal-login';

import createGalleryMarkup from './create-gallery';
import { getGenreNames } from './create-gallery';
import {
  storageKeys,
  buttonStates,
  storageHasMovie,
  addWatchedBtn,
  addQueueBtn,
} from './storage';
import { setMarkup } from './create-gallery';
import getGenreNames from './create-gallery';

import './modal-login';

const refs = {
  btnWatched: document.querySelector('.watched'),
  btnQueue: document.querySelector('.queue'),
  libraryGallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  noItemsImg: document.querySelector('.library__no-items'),
};
refs.loader.classList.add('is-hidden');

export let currentState = 'empty';
export let watchedMovies = '';
export let queueMovies = '';

// ============================
// Генерация галереи при первом старте
if (localStorage.getItem('WATCHED')) {
  watchedMovies = JSON.parse(localStorage.getItem('WATCHED'));
  if (!!watchedMovies.length) {
    currentState = 'watched';
    refs.loader.classList.add('is-hidden');
    createGalleryMarkup(watchedMovies);
    refs.btnQueue.classList.remove('library-header__button--active');
    refs.btnWatched.classList.add('library-header__button--active');
  }
}
if (localStorage.getItem('QUEUE')) {
  queueMovies = JSON.parse(localStorage.getItem('QUEUE'));
  if (!!queueMovies.length) {
    refs.btnWatched.disabled = true;
    currentState = 'queue';
    refs.loader.classList.add('is-hidden');
    createGalleryMarkup(queueMovies);
    refs.btnWatched.classList.remove('library-header__button--active');
    refs.btnQueue.classList.add('library-header__button--active');
  }
}
if (currentState === 'empty') {
  refs.btnQueue.disabled = true;
  refs.btnWatched.disabled = true;
  refs.noItemsImg.style.display = 'block';
}
// ================================
function refreshLibrary() {
  switch (currentState) {
    case 'watched':
      watchedMovies = JSON.parse(localStorage.getItem('WATCHED'));
      createGalleryMarkup(watchedMovies);
      break;

    case 'queue':
      queueMovies = JSON.parse(localStorage.getItem('QUEUE'));
      createGalleryMarkup(queueMovies);
      break;
  }
}
// if (refs.btnQueue.disabled && refs.btnWatched.disabled) {
//   refs.noItemsImg.style.display = 'block';
// }

// =====================================================================================

refs.btnWatched.addEventListener('click', onWatchedButtonClick);
refs.btnQueue.addEventListener('click', onQueueButtonClick);

// =====================================

function onWatchedButtonClick(event) {
  event.preventDefault();
  if (event.target.classList.contains('watched')) {
    refs.btnQueue.classList.remove('library-header__button--active');
    refs.btnWatched.classList.add('library-header__button--active');
  }
  currentState = 'watched';
  createGalleryMarkup(watchedMovies);
  refs.loader.classList.add('is-hidden');
}

function onQueueButtonClick(event) {
  event.preventDefault();
  if (event.target.classList.contains('queue')) {
    refs.btnWatched.classList.remove('library-header__button--active');
    refs.btnQueue.classList.add('library-header__button--active');
  }
  currentState = 'queue';
  createGalleryMarkup(queueMovies);
  refs.loader.classList.add('is-hidden');
}

function closeModal() {
  document.querySelector('.backdrop').style.display = 'none';
  document.querySelector('body').style.overflowY = 'visible';
  console.log('currentState при закрытии модалки->', currentState);
  refreshLibrary();
}

document.querySelector('.modal__close').addEventListener('click', closeModal);

CURRENTSTATE = currentState.toUpperCase();
console.log('currentState==', currentState);
// ========================================
// открытие модалки
document.querySelector('.gallery').addEventListener('click', function (e) {
  let targetItem = e.target;
  if (targetItem.closest('.card')) {
    const movieId = targetItem.closest('.card').getAttribute('movie-id');
    const data = JSON.parse(localStorage.getItem(CURRENTSTATE));
    const movie = data.find(item => {
      if (Number(movieId) === item.id) {
        return true;
      }
    });
    currentMovie = movie;

    document
      .querySelector('.content-card__img>img')
      .setAttribute(
        'src',
        'https://image.tmdb.org/t/p/w500' + movie.poster_path
      );
    document.querySelector('.content-card__title').innerText = movie.title;
    document.querySelector('.content-card__about-text').innerText =
      movie.overview;

    document.querySelector('.modal__movie-bord').innerText =
      movie.vote_average.toFixed(1);
    document.querySelector('.modal__movie-number').innerText = movie.vote_count;
    document.querySelector('.modal__movie-popularity').innerText =
      movie.popularity.toFixed(1);
    document.querySelector('.modal__movie-original').innerText =
      movie.original_title;
    document.querySelector('.modal__movie-genres').innerText = getGenreNames(
      movie.genre_ids
    );

    openModal();
  }
});

// открытие модалки
// =====================================
function openModal() {
  document.querySelector('.backdrop').style.display = 'block';
  document.querySelector('body').style.overflowY = 'hidden';

  //Встановлення тексту кнопки "ADD TO WATCHED"
  if (storageHasMovie(storageKeys.watched, currentMovie.id)) {
    addWatchedBtn.textContent = buttonStates.on + ' ' + storageKeys.watched;
  } else {
    addWatchedBtn.textContent = buttonStates.off + ' ' + storageKeys.watched;
  }

  //Встановлення тексту кнопки "ADD TO QUEUE"
  if (storageHasMovie(storageKeys.queue, currentMovie.id)) {
    addQueueBtn.textContent = buttonStates.on + ' ' + storageKeys.queue;
  } else {
    addQueueBtn.textContent = buttonStates.off + ' ' + storageKeys.queue;
  }
}
// ==============================
//закриття модалки по кліку поза модалки
window.addEventListener('click', function (event) {
  if (event.target === document.querySelector('.backdrop')) {
    closeModal();
  }
});

//закрытие модалки по esc
window.addEventListener('keydown', e => {
  if (e.keyCode === 27) {
    closeModal();
  }
});

const startAddMovieBtn = document.getElementById('start-add-movie-btn');
const addMovieModal = document.getElementById('add-modal');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieBtn = document.getElementById('cancel-add-movie-btn');
const addMovieBtn = document.getElementById('add-movie-btn');
const listRoot = document.getElementById('movie-list');
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');
const movieList = [];

function updateUI() {
  if (movieList.length == 0) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
}

function deleteMovie(movieId) {
  let movieIndex = 0;
  for (const movie of movieList) {
    if (movie.id === movieId) {
      movieList.splice(movieIndex, 1);
      break;
    }
    movieIndex++;
  }
  console.group(movieList);
  listRoot.children[movieIndex].remove();
  deleteMovieModal.classList.remove('visible');
  toggleBackdrop();
  updateUI();
}

function closeMovieDeletionModal() {
  toggleBackdrop();
  deleteMovieModal.classList.remove('visible');
}

function deleteMovieHandler(movieId) {
  deleteMovieModal.classList.add('visible');
  toggleBackdrop();
  const cancelDeleteMovieBtn = deleteMovieModal.querySelector('.btn--passive');
  let confirmDeleteMovieBtn = deleteMovieModal.querySelector('.btn--danger');

  confirmDeleteMovieBtn.replaceWith(confirmDeleteMovieBtn.cloneNode(true));
  confirmDeleteMovieBtn = deleteMovieModal.querySelector('.btn--danger');
  cancelDeleteMovieBtn.removeEventListener('click', closeMovieDeletionModal);
  cancelDeleteMovieBtn.addEventListener('click', closeMovieDeletionModal);
  confirmDeleteMovieBtn.addEventListener(
    'click',
    deleteMovie.bind(null, movieId)
  );
}

function renderNewMovie(movie) {
  const newMovie = document.createElement('li');

  newMovie.className = 'movie-element';
  newMovie.innerHTML = `
    <div class="movie-element__image">
      <image src="${movie.imageUrl}" alt="${movie.title}">
    </div>
    <div class="movie-element__info">
      <h2>${movie.title}</h2>
      <p>${movie.rating} stars</p>
    </div>
    `;
  newMovie.addEventListener('click', deleteMovieHandler.bind(null, movie.id));
  listRoot.append(newMovie);
}

function toggleBackdrop() {
  backdrop.classList.toggle('visible');
}

function closeMovieModal() {
  addMovieModal.classList.remove('visible');
}

function showMovieModal() {
  addMovieModal.classList.add('visible');
  toggleBackdrop();
}

function cancelMovieInput() {
  for (const input of userInputs) {
    input.value = '';
  }
  closeMovieModal();
  toggleBackdrop();
}

function addMovieHandler() {
  const title = userInputs[0].value;
  const imageUrl = userInputs[1].value;
  const rating = userInputs[2].value;

  const newMovie = {
    id: Math.random().toString(),
    title,
    imageUrl,
    rating,
  };

  if (!title || !imageUrl || !rating | (rating < 1) || rating >> 5) {
    alert('Invalid input motherfucker!');
  } else {
    movieList.push(newMovie);
    console.log(movieList);
    cancelMovieInput();
    updateUI();
    renderNewMovie(newMovie);
  }
}

function backdropClickHandler() {
  closeMovieModal();
  closeMovieDeletionModal();
  cancelMovieInput();
  toggleBackdrop();
}

startAddMovieBtn.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieBtn.addEventListener('click', cancelMovieInput);
addMovieBtn.addEventListener('click', addMovieHandler);

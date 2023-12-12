document.addEventListener('DOMContentLoaded', function () {
  let gamesPerPage;
  let gamesPerRow;
  let currentPage = 1;
  let searchTerm = '';
  const sid = 'YOUR_API_ID'; // api id gamepix

  calculateGamesPerPage();
  calculateRows();
  setFooterText();
  document.getElementById('searchInput').addEventListener('input', handleSearchInput);

  fetchAndRender();

  function renderGames(games) {
    const gameListElement = document.getElementById('gameList');
    gameListElement.innerHTML = '';

    if (games.length > 0) {
      games.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.classList.add('p-4', 'bg-white', 'rounded', 'shadow-md', 'cursor-pointer', 'grid-item');

        const overlay = document.createElement('div');
        overlay.classList.add('overlay');

        const title = document.createElement('h2');
        title.classList.add('text-xl', 'font-semibold', 'mb-2');
        title.textContent = game.title;
        title.addEventListener('click', () => {
          window.open(game.url, '_blank');
        });

        const ratingContainer = document.createElement('div');
        ratingContainer.classList.add('rating-container');
        ratingContainer.innerHTML = getStarRating(game.rkScore);

        ratingContainer.style.display = 'none';

        const thumbnail = document.createElement('img');
        thumbnail.classList.add('w-full', 'h-40', 'object-cover', 'mb-2', 'rounded');
        thumbnail.src = game.thumbnailUrl;
        thumbnail.alt = game.title;

        thumbnail.addEventListener('click', () => {
          window.open(game.url, '_blank');
        });

        gameCard.appendChild(ratingContainer);
        gameCard.appendChild(thumbnail);
        gameCard.appendChild(overlay);
        gameCard.appendChild(title);

        gameCard.addEventListener('mouseenter', () => {
          ratingContainer.style.display = 'flex';
        });

        gameCard.addEventListener('mouseleave', () => {
          ratingContainer.style.display = 'none';
        });

        gameListElement.appendChild(gameCard);
      });
    } else {
      const noGamesMessage = document.createElement('p');
      noGamesMessage.textContent = 'No games available.';
      gameListElement.appendChild(noGamesMessage);
    }
  }

  function getStarRating(rkScore) {
    const maxStars = 5;
    const roundedScore = Math.round(rkScore * maxStars);
    let starsHtml = '';

    for (let i = 0; i < maxStars; i++) {
      starsHtml += `<span class="star${i < roundedScore ? ' filled' : ''}">★</span>`;
    }

    return starsHtml;
  }

  function paginateGames(games, page) {
    const startIndex = (page - 1) * gamesPerPage;
    const endIndex = startIndex + gamesPerPage;
    return games.slice(startIndex, endIndex);
  }

  function updatePaginationButtons(totalPages) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    const previousButton = createPaginationButton('<< Previous', () => {
      if (currentPage > 1) {
        currentPage--;
        fetchAndRender();
      }
    });
    paginationContainer.appendChild(previousButton);

    const maxPagesToShow = Math.min(totalPages, 10);
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      const isActive = i === currentPage;
      const pageButton = createPaginationButton(i, () => {
        currentPage = i;
        fetchAndRender();
      }, isActive);
      paginationContainer.appendChild(pageButton);
    }
    

    const nextButton = createPaginationButton('Next >>', () => {
      if (currentPage < totalPages) {
        currentPage++;
        fetchAndRender();
      }
    });
    paginationContainer.appendChild(nextButton);

    const lastButton = createPaginationButton('Last', () => {
      currentPage = totalPages;
      fetchAndRender();
    });
    paginationContainer.appendChild(lastButton);
  }

  function createPaginationButton(text, onClick, isActive = false) {
    const button = document.createElement('button');
    button.classList.add('mx-1', 'px-3', 'py-1', 'bg-blue-500', 'text-white', 'rounded', 'hover:bg-blue-600', 'cursor-pointer');
    if (isActive) {
      button.classList.add('active-page');
    }
    button.textContent = text;
    button.addEventListener('click', onClick);
    return button;
  }
  

  function fetchAndRender() {
    const gameListElement = document.getElementById('gameList');
    const apiUrl = `https://games.gamepix.com/games?sid=${sid}&order=q&title=${encodeURIComponent(searchTerm)}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(responseData => {
        if (!responseData || responseData.code !== 200 || !Array.isArray(responseData.data)) {
          console.error('Error: Invalid or missing data in API response.', responseData);
          return;
        }

        const allGames = responseData.data;
        const totalGames = allGames.length;

        const filteredGames = allGames.filter(game => game.title.toLowerCase().includes(searchTerm.toLowerCase()));

        const totalPages = Math.ceil(filteredGames.length / gamesPerPage);

        const paginatedGames = paginateGames(filteredGames, currentPage);
        renderGames(paginatedGames);
        updatePaginationButtons(totalPages);

        const gameCount = paginatedGames.length;
        const columnCount = getComputedStyle(gameListElement).getPropertyValue('grid-template-columns').split(' ').length;

        if (gameCount % columnCount !== 0) {
          const additionalGamesNeeded = columnCount - (gameCount % columnCount);
          const additionalApiUrl = `https://games.gamepix.com/games?sid=${sid}&title=${encodeURIComponent(searchTerm)}&limit=${additionalGamesNeeded}`;
          fetch(additionalApiUrl)
            .then(response => response.json())
            .then(additionalData => {
              if (additionalData && additionalData.code === 200 && Array.isArray(additionalData.data)) {
                const additionalGames = additionalData.data;
                renderGames(additionalGames);
              }
            })
            .catch(error => {
              console.error('Error fetching additional data:', error);
            });
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  function handleSearchInput(event) {
    event.preventDefault();

    searchTerm = document.getElementById('searchInput').value.trim();
    currentPage = 1;

    if (searchTerm !== '') {
      fetchAndRender();
    }
  }

  function calculateGamesPerPage() {
    const containerWidth = document.getElementById('gameList').offsetWidth;
    gamesPerRow = Math.floor(containerWidth / 180);

    if (gamesPerRow >= 6) {
      gamesPerPage = gamesPerRow * 5;
    } else {
      gamesPerPage = gamesPerRow * 6;
    }

    return gamesPerPage;
  }

  function calculateRows() {
    return Math.ceil(gamesPerPage / gamesPerRow);
  }

  function setFooterText() {
    const currentDomain = window.location.hostname;
    const domainPart = currentDomain.slice(0, 8);
    document.getElementById("domainPart").textContent = domainPart;
  }
});

function loadPrivacyPolicy() {
  fetch('privacy-policy.html')
    .then(response => response.text())
    .then(data => {

      const hotGamesSection = document.querySelector('.container.mx-auto.mt-8');
      if (hotGamesSection) {
        hotGamesSection.style.display = 'none';
      }

      const aboutSiteContainer = document.getElementById('aboutSite');
      aboutSiteContainer.innerHTML = data;
    })
    .catch(error => console.error('Failed to load privacy policy:', error));
}

document.addEventListener('DOMContentLoaded', function() {
  const privacyPolicyLink = document.getElementById('privacyPolicyLink');
  if (privacyPolicyLink) {
    privacyPolicyLink.addEventListener('click', function(event) {
      event.preventDefault();
      loadPrivacyPolicy();
    });
  }
});

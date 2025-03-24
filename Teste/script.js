document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const resultsDiv = document.getElementById('results');

    searchButton.addEventListener('click', async function() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm!== '') {
            try {
                const response = await fetch(`https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${searchTerm}&srlimit=10&format=json`);
                const data = await response.json();
                const pages = data.query.search;

                resultsDiv.innerHTML = '';
                pages.forEach(page => {
                    const pageId = page.pageid;
                    const title = page.title;

                    // Pour obtenir l'image, nous devons faire une autre requête pour obtenir l'URL de l'image
                    fetch(`https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url&format=json&pageids=${pageId}`)
                      .then(response => response.json())
                      .then(data => {
                            if (data.query.pages[pageId].imageinfo) {
                                const imageUrl = data.query.pages[pageId].imageinfo[0].url;
                                const img = document.createElement('img');
                                img.src = imageUrl;
                                img.alt = title;
                                resultsDiv.appendChild(img);
                            } else {
                                const paragraph = document.createElement('p');
                                paragraph.textContent = `Aucune image trouvée pour ${title}`;
                                resultsDiv.appendChild(paragraph);
                            }
                        })
                      .catch(error => console.error('Erreur lors de la récupération de l\'image:', error));
                });
            } catch (error) {
                console.error('Erreur lors de la recherche:', error);
            }
        }
    });
});
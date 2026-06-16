const API_KEY = "73056f0bfe484e46a222fefe78cb7c0d";
const container = document.getElementById("news-container");

async function searchNews(query = "Brasil") {
  const url = `https://newsapi.org/v2/everything?q=${query}&language=pt&sortBy=publishedAt&pageSize=20&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data); // IMPORTANTE

    if (data.status === "error") {
      container.innerHTML = `<p>${data.message}</p>`;
      return;
    }

    container.innerHTML = "";

    data.articles.forEach(article => {
      container.innerHTML += `
        <div class="card">
          <img src="${
            article.urlToImage ||
            "https://via.placeholder.com/600x400"
          }">

          <div class="content">
            <h2>${article.title}</h2>
            <p>${article.description || ""}</p>
            <a href="${article.url}" target="_blank">
              Ler mais →
            </a>
          </div>
        </div>
      `;
    });

  } catch (error) {
    console.error(error);
    container.innerHTML = "<p>Erro ao carregar notícias.</p>";
  }
}

searchNews();

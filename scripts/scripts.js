// async function getArticles() {

//   let url = 'https://run.mocky.io/v3/82844fb8-9913-40eb-a128-745a31bb14f2';
//   try {
//     let res = await fetch(url);
//     return await res.json();
//   } catch (error) {
//     console.log(error);
//   }
// }



async function getArticles() {
  const COLLECTION_URL = 'https://run.mocky.io/v3/0afaae0e-9a5d-4a16-b50a-a978f670900e';
  const ARTICLE_URL = 'https://run.mocky.io/v3/77cfc734-28f1-4e93-9c83-004987954311';

  // If html file is running with localserver use url as articles.json
  // const ARTICLE_URL = './json/articles.json';
  // const COLLECTION_URL = './json/collections.json';

  const collection_type = "landing";
  const collections = await fetch(COLLECTION_URL).then(response => response.json());

  const articles = await fetch(ARTICLE_URL).then(response => response.json());
  return articles.filter((art) => art.collectiontype === collection_type)
}

function renderHeroArticle(heroArticle) {
  let heroArticleHtml = `<div class="hero-image img-wrapper">
                          <img class="fithero-image" src=${heroArticle.image_url} alt="heroImage" />
                        </div>
                        <div>
                        <h2 class="headline highlight"><span class="bullet">+&nbsp;</span>${heroArticle.headline}</h2>
                        <p><span class="title">${heroArticle.title}</span> ${heroArticle.description}</p>
                        <div class="comments">
                          <i class="fa-regular fa-clock"></i><label>2m</label>
                          <i class="fa-regular fa-message"></i>
                        </div>
                        </div >`
  let heroSection = document.querySelector('.hero-article');
  if (typeof heroSection !== "undefined") {
    heroSection.innerHTML = heroArticleHtml;
  }
}

function renderMainArticleHtml(mainArticle) {
  let subArticleHtml = `<div class="main-image img-wrapper">
                          <img class="fit-image" src=${mainArticle.image_url} alt="mainArticleImage" />
                        </div>
                        <h2 class="headline"><span class="bullet">+&nbsp;</span>${mainArticle.headline}</h2>
                        <p><span class="title blue">${mainArticle.title}</span>${mainArticle.description}</p>
                        <div class="comments">
                          <i class="fa-regular fa-clock"></i><label>&nbsp;1hr</label>
                          <i class="fa-regular fa-message"></i>
                        </div>`

  let subArticleSection = document.querySelector('.featured');
  if (typeof subArticleSection !== "undefined") {
    subArticleSection.innerHTML = subArticleHtml;
  }
}

function renderSubArticles(subArticles) {

  let subArticlesHtml = '';
  subArticles.forEach(article => {
    let subArticleHtml = `<div class="list grey-border pos-relative">
                            <h3 class="folded"><span class="bullet">+&nbsp;</span>${article.headline}</h3>
                          <div class="suggestion-image img-wrapper">
                            <img class="fit-image" src=${article.image_url} alt="subArticleImage" />
                          </div>
                          <div class="comments">
                            <i class="fa-regular fa-clock"></i><label>&nbsp;1hr</label>
                          </div>
                          </div>`;

    subArticlesHtml += subArticleHtml;
  });

  let lists = document.querySelector('.lists');
  if (typeof lists !== "undefined") {
    lists.innerHTML = subArticlesHtml;
  }
}

async function renderArticles() {
  let [heroArticle, mainArticle, ...subArticles] = await getArticles();

  // hero Article
  renderHeroArticle(heroArticle)

  // sub Article
  renderMainArticleHtml(mainArticle)

  // Articles List
  renderSubArticles(subArticles)

}

renderArticles();

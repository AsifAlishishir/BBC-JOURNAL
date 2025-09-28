const categoryContainer = document.getElementById("categoryContainer");
const newsContainer = document.getElementById("newsContainer");

const loadCategory = () => {
  fetch("https://news-api-fs.vercel.app/api/categories")
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data.categories);
      const categories = data.categories;
      showCategory(categories);
    })
    .catch((err) => {
      console.log(err);
    });
};

const showCategory = (categories) => {
  categories.forEach((cat) => {
    categoryContainer.innerHTML += `<li id="${cat.id}" class="hover:border-b-4 hover:border-red-600 border-red-600 cursor-pointer">
            ${cat.title} 
          </li>`;
  });

  categoryContainer.addEventListener("click", (e) => {
    const allLi = document.querySelectorAll("li");
    allLi.forEach((li) => {
      li.classList.remove("border-b-4");
    });
    if (e.target.localName === "li") {
      //   console.log(e.target);
      loadNewsByCategory(e.target.id);

      e.target.classList.add("border-b-4");
    }
  });
};

const loadNewsByCategory = (categoryId) => {
  console.log(categoryId);
  fetch(`https://news-api-fs.vercel.app/api/categories/${categoryId}`)
    .then((res) => res.json())
    .then((data) => {
      const articles = data.articles;
      showNewsByCategory(articles);
    })
    .catch((err) => {
      console.log(err);
    });
};

const showNewsByCategory = (articles) => {
  newsContainer.innerHTML = "";
  articles.forEach((article) => {
    newsContainer.innerHTML += ` <div class="border border-gray-300 rounded-lg">
        <div>
          <img src="${article.image.srcset[5].url}" alt="" />
        </div>
        <div class="p-2">
        <h2 class="font-extrabold pb-2">${article.title}</h2>
        <p class="text-sm">${article.time}</p>
        </div>
      </div>`;
  });
  console.log(articles);
};

loadCategory();
loadNewsByCategory("main");
// const loadCategoryAsync = async () => {
//   try {
//     const res = await fetch("https://news-api-fs.vercel.app/api/categories");
//     const data = await res.json();
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// };

// loadCategoryAsync();

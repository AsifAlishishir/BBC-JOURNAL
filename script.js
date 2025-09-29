const categoryContainer = document.getElementById("categoryContainer");
const newsContainer = document.getElementById("newsContainer");
const bookMarkContainer = document.getElementById("bookMarkContainer");
const bookMarkCount = document.getElementById("bookMarkCount");

let bookMarks = [];

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
      showLoading();
      loadNewsByCategory(e.target.id);

      e.target.classList.add("border-b-4");
    }
  });
};

const loadNewsByCategory = (categoryId) => {
  // console.log(categoryId);
  fetch(`https://news-api-fs.vercel.app/api/categories/${categoryId}`)
    .then((res) => res.json())
    .then((data) => {
      const articles = data.articles;
      showNewsByCategory(articles);
    })
    .catch((err) => {
      showError();
      alert("Something went wrong!");
    });
};

const showNewsByCategory = (articles) => {
  newsContainer.innerHTML = "";
  articles.forEach((article) => {
    // console.log(article);
    newsContainer.innerHTML += ` <div class="border border-gray-300 rounded-lg">
        <div>
          <img src="${article.image.srcset[5].url}" alt="" />
        </div>
        <div id="${article.id}" class="p-2">
        <h2 class="font-extrabold pb-2">${article.title}</h2>
        <p class="text-sm">${article.time}</p>
        <button class="btn">BookMark</button>
        </div>
      </div>`;
  });
  // console.log(articles);
};

newsContainer.addEventListener("click", (e) => {
  // console.log(e.target.innerText);
  if (e.target.innerText === "BookMark") {
    handleBookmarks(e);
    // console.log("button Clicked");
  }
});

const handleBookmarks = (e) => {
  const title = e.target.parentNode.children[0].innerText;
  const id = e.target.parentNode.id;
  // console.log(id);

  bookMarks.push({
    title: title,
    id: id,
  });

  showBookmarks(bookMarks);
};

const showBookmarks = (bookMarks) => {
  bookMarkContainer.innerHTML = "";
  bookMarks.forEach((bookMark) => {
    bookMarkContainer.innerHTML += `
    <div class="p-2">
      <div class="border mb-2 p-1 rounded-lg"> 
    <h1>${bookMark.title}</h1>
    <button onclick="handleDeleteBookmark('${bookMark.id}')" class="btn btn-xs mt-1">Delete</button>
    
      </div>
    </div>
    `;
  });

  bookMarkCount.innerText = bookMarks.length;
  // console.log(bookMarks);
};

const handleDeleteBookmark = (bookMarkId) => {
  const filterBookmarks = bookMarks.filter(
    (bookMark) => bookMark.id !== bookMarkId
  );
  bookMarks = filterBookmarks;
  showBookmarks(bookMarks);
  // console.log(filterBookmarks);
};

const showLoading = () => {
  newsContainer.innerHTML = `<div class="bg-green-500 p-3">Loading.....</div>
      </div>`;
};

const showError = () => {
  newsContainer.innerHTML = `<div class="bg-red-500 p-3">Something Went Wrong!</div>
      </div>`;
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

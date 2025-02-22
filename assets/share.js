//declaring some variables
const messageElement = document.getElementById("share-alert-container");
const explanation = document.querySelector(".explanation");
const explanationTitle = document.querySelector(".explanation-title");
const explanationText = document.querySelector(".explanation-text");
const tagFilter = document.querySelector(".tag-filter");
const filterButton = document.querySelector(".filter-button");
var dropDownCounter = 0;
var tagFilterCounter = 0;
var currentFilters = [];
var menu = null;
var category = null;
//the categories
const headerLinks = [
  { title: "The Magic of Learning", link: "https://www.acquirable.ch" },
  { title: "Acquirable Topics", link: "https://www.acquirable.ch" },
  { title: "Books to Acquire", link: "https://www.acquirable.ch" },
];
//the tags (our topics)
const tags = [
  { name: "Psychology", image: "../../assets/RP-T-1882-A-174.jpg" },
  { name: "Philosophy", image: "../../assets/RP-P-1904-4047.jpg" },
  { name: "Languages & Literature", image: "../../assets/RP-P-1904-4052.jpg" },
  { name: "Art & Design", image: "../../assets/RP-T-1882-A-175.jpg" },
  { name: "Tech & Science", image: "../../assets/RP-T-1921-168.jpg" },
  { name: "Business", image: "../../assets/RP-P-1904-4048.jpg" },
];
//the list of all artilces (please add new articles at the top)
const allArticles = [
  {
    title: "How to Master STEM Subjects by Memorisation",
    link: "https://www.acquirable.ch/the-magic-of-learning/mastering-stem-by-memorisation",
    image:
      "https://www.acquirable.ch/the-magic-of-learning/mastering-stem-by-memorisation/title.jpg",
    description:
      "STEM subjects present a significant challenge for many students. Here's how to master them.",
    category: [0, 1],
    tags: [0, 1],
  },
  {
    title: "How to Master STEM Subjects by Memorisation",
    link: "https://www.acquirable.ch/the-magic-of-learning/mastering-stem-by-memorisation",
    image:
      "https://www.acquirable.ch/the-magic-of-learning/mastering-stem-by-memorisation/title.jpg",
    description:
      "STEM subjects present a significant challenge for many students. Here's how to master them.",
    category: [0],
    tags: [2, 3],
  },
  {
    title: "How to Master STEM Subjects by Memorisation",
    link: "https://www.acquirable.ch/the-magic-of-learning/mastering-stem-by-memorisation",
    image:
      "https://www.acquirable.ch/the-magic-of-learning/mastering-stem-by-memorisation/title.jpg",
    description:
      "STEM subjects present a significant challenge for many students. Here's how to master them.",
    category: [1, 2],
    tags: [4, 5],
  },
];
function setCategory(givenCategory) {
  category = givenCategory;
}
//filters all articles
function curateMainPageContent(category, filter, page) {
  console.log(category, filter, page);
  let categorisedArray = [];
  //first, the category (The Magic of Learning etc.) is filtered
  if (category != null) {
    for (let i = 0; i < allArticles.length; i++) {
      if (allArticles[i].category.includes(category)) {
        categorisedArray.push(allArticles[i]);
      }
    }
  } else {
    categorisedArray = allArticles;
  }

  let filteredArray = [];
  let added = false;
  //then, the tag (Tech, Business etc.) is filtered
  if (filter != null) {
    for (let i = 0; i < categorisedArray.length; i++) {
      added = false;
      for (let j = 0; j < filter.length; j++) {
        if (categorisedArray[i].tags.includes(filter[j]) && !added) {
          filteredArray.push(categorisedArray[i]);
          added = true;
        }
      }
      if (filter.length == 0) {
        filteredArray = categorisedArray;
      }
    }
  } else {
    filteredArray = categorisedArray;
  }
  //after the filtered array is created, buildMainPost() now displays all articles on screen
  buildMainPost(filteredArray, page);
}
//displays the filtered articles
function buildMainPost(array, page) {
  // empty everything except for what we need
  document.querySelector(".article-container").innerHTML = "";
  //check if there is an entry
  if (array.length == 0) {
    document.querySelector(".article-container").innerHTML =
      "<img src='noresults.jpg' alt='alt' class='article-img' style='max-width: 975px; width: 80%; text-align: center;'><h1 class='main-quote'>Can’t find what you need? Adjust your filters to discover inspiring articles.</h1>";
  }
  for (let i = 0; i < array.length; i++) {
    //build the necessary HTML structure for every article
    let mainTitleText = document.createTextNode(array[i].title);
    let mainDescText = document.createTextNode(array[i].description);
    let articleDataArray = [];
    for (let j = 0; j < array[i].category.length; j++) {
      articleDataArray.push(headerLinks[array[i].category[j]].title);
    }
    let articleDataText = document.createTextNode(articleDataArray.join(", "));
    let mainImgSrc = array[i].image;
    let mainTitle = document.createElement("h1");
    let mainDesc = document.createElement("h2");
    let articleData = document.createElement("p");
    let mainImg = document.createElement("img");
    let postText = document.createElement("div");
    let postTags = document.createElement("div");
    let mainPost = document.createElement("a");

    mainTitle.classList.add("main-title");
    mainDesc.classList.add("main-desc");
    articleData.classList.add("article-data");
    mainImg.classList.add("main-img");
    postText.classList.add("post-text");
    postTags.classList.add("post-tags");
    mainPost.classList.add("main-post");

    mainTitle.appendChild(mainTitleText);
    mainDesc.appendChild(mainDescText);
    articleData.appendChild(articleDataText);
    mainPost.href = array[i].link;

    postText.appendChild(mainTitle);
    postText.appendChild(mainDesc);
    postText.appendChild(articleData);
    postText.appendChild(postTags);

    mainImg.src = mainImgSrc;

    //alternate between image and text being left or right if inner window width is big enough
    if (window.innerWidth > 850) {
      if (i % 2 == 0) {
        mainPost.appendChild(mainImg);
        mainPost.appendChild(postText);
      } else {
        mainPost.appendChild(postText);
        mainPost.appendChild(mainImg);
      }
    } else {
      mainPost.appendChild(mainImg);
      mainPost.appendChild(postText);
    }

    document.querySelector(".article-container").appendChild(mainPost);

    //create the tags
    for (let j = 0; j < array[i].tags.length; j++) {
      let imageLink = tags[array[i].tags[j]].image;
      let text = document.createTextNode(tags[array[i].tags[j]].name);

      let tagImage = document.createElement("img");
      let tagText = document.createElement("span");
      let tag = document.createElement("div");

      tagImage.classList.add("tag-image");
      tagText.classList.add("tag-text");
      tag.classList.add("article-tag");

      tagImage.src = imageLink;
      tagText.appendChild(text);

      tag.appendChild(tagImage);
      tag.appendChild(tagText);

      document.querySelectorAll(".post-tags")[i].appendChild(tag);
    }
  }
}

//adds or removes a tag filter
function addFilter(number) {
  const DOMFilters = document.querySelector(".tag-filter");
  const filterTags = DOMFilters.querySelectorAll(":scope > .filter-tag");
  if (currentFilters.includes(number)) {
    const index = currentFilters.indexOf(number);
    if (index > -1) {
      // only splice array when item is found
      currentFilters.splice(index, 1); // 2nd parameter means remove one item only
    }
    filterTags[number].classList.remove("clicked-tag");
  } else {
    currentFilters.push(number);
    filterTags[number].classList.add("clicked-tag");
  }
  //re-filters the articles, because the filters have changed
  if (currentFilters.length == 0) {
    curateMainPageContent(category, null, 0);
  } else {
    curateMainPageContent(category, currentFilters, 0);
  }
}

//shows the dropdown
function dropDown() {
  if (dropDownCounter % 2 === 0) {
    menu.style.display = "flex";
    dropDownCounter++;
  } else {
    closeDropDown();
  }
}
//hides the dropdown
function closeDropDown() {
  menu.style.display = "none";
  dropDownCounter++;
}
//function for sharing the article link
function shareArticleLink(text, link) {
  navigator.clipboard.writeText(text + ": " + link);
  // Show a confirmation message
  messageElement.style.visibility = "visible";

  // Hide the message after 1 second (1000 milliseconds)
  setTimeout(() => {
    messageElement.style.visibility = "hidden";
  }, 5000); // 1000ms = 1 second
}
//removes the thank you message from the screen
function removeMessage() {
  messageElement.style.visibility = "hidden";
}
//shows the explanation of a word
function showExplanation(title, text) {
  explanation.style.visibility = "visible";
  explanationTitle.innerHTML = title;
  explanationText.innerHTML = text;
}
//hides the explanation
function hideExplanation() {
  explanation.style.visibility = "hidden";
}
//lets the explanation disappear (on mobile)
function showAndHideExplanation(title, text) {
  explanation.style.visibility = "visible";
  explanationTitle.innerHTML = title;
  explanationText.innerHTML = text;
  setTimeout(() => {
    explanation.style.visibility = "hidden";
  }, 10000); // 1000ms = 1 second
}
//shows and hides the tag filter options
function showAndHideTagFilter() {
  if (tagFilterCounter % 2 === 0) {
    tagFilter.style.display = "flex";
    filterButton.innerHTML = "<ion-icon name='close-outline'></ion-icon>";
  } else {
    tagFilter.style.display = "none";
    filterButton.innerHTML = "<ion-icon name='apps-outline'></ion-icon>";
  }
  tagFilterCounter++;
}

//loads the footer on every screen
function loadFooter() {
  var footerContent =
    '<img src="../../assets/acqu.png" alt="footer-logo" class="footer-logo"><div class="footer-links"><h2 class="footer-title">Company</h2><a href="https://acquirable.ch">Home</a><a href="https://acquirable.ch/about">About Acquirable</a><a href="https://acquirable.ch/useful-advice">Privacy Policy</a><h2 class="footer-title">Content</h2><a href="https://acquirable.ch/mindful-learning">Mindful Learning</a><a href="https://acquirable.ch/study-methods">Study Methods</a><a href="https://acquirable.ch/useful-advice">Useful Advice</a></div><div class="swiss-text">© Porath Media</div><div class="swiss-flex"><div class="swiss-text">Created in Switzerland</div><img src="../../assets/schweiz.png" alt="switzerland" class="swiss-image"></div>';

  var footer = document.querySelector(".footer");
  footer.innerHTML = footerContent;
}
//loads the header on every screen
function loadHeader() {
  var finalLink =
    '<a href="https://www.acquirable.ch"><img src="../../assets/Acquirable-white-1.png" alt="logo" class="logo"></a><div class="header-link-flex">';
  for (i = 0; i < headerLinks.length; i++) {
    finalLink +=
      '<a href="' +
      headerLinks[i].link +
      '" class="header-link">' +
      headerLinks[i].title +
      "</a>";
  }
  finalLink +=
    '</div><div class="dropdown"><ion-icon onclick="dropDown();" name="reorder-three-outline"></ion-icon><div class="dropdown-list">';
  for (j = 0; j < headerLinks.length; j++) {
    finalLink +=
      '<a href="' +
      headerLinks[j].link +
      '" class="header-link">' +
      headerLinks[j].title +
      "</a>";
  }
  finalLink +=
    '<ion-icon onclick="closeDropDown();" name="close-outline" class="dropdown-icon"></ion-icon></div></div>';

  var header = document.querySelector(".header");
  header.innerHTML = finalLink;
  menu = document.querySelector(".dropdown-list");
}
//hides the loader
window.addEventListener("load", function () {
  document.querySelector(".loader").style.display = "none";
});

//adds the tags to a specific article and sets the category
function setCategoryAndTags(category, allTags) {
  let tagBox = document.querySelector(".article-tags");
  var link =
    '<a href="' +
    headerLinks[category].link +
    '" class="type-link">- ' +
    headerLinks[category].title.toUpperCase() +
    " -</a>";

  for (let i = 0; i < allTags.length; i++) {
    let imageLink = tags[allTags[i]].image;
    let text = document.createTextNode(tags[allTags[i]].name);

    let tagImage = document.createElement("img");
    let tagText = document.createElement("span");
    let tag = document.createElement("div");

    tagImage.classList.add("tag-image");
    tagText.classList.add("tag-text");
    tag.classList.add("article-tag");

    tagImage.src = imageLink;
    tagText.appendChild(text);

    tag.appendChild(tagImage);
    tag.appendChild(tagText);

    tagBox.appendChild(tag);
  }

  var linkBox = document.querySelector(".article-type");
  linkBox.innerHTML = link;
}

let ranFunction = false;
function handleResize() {
  if (window.innerWidth <= 850 && ranFunction == false) {
    console.log("Screen is now less than 850px! Running function...");
    // Call your function here
    ranFunction = true;
    console.log(ranFunction);
    curateMainPageContent(category, currentFilters, 0);
  } else if (window.innerWidth > 850) {
    //only if it is bigger again
    ranFunction = false;
    console.log(ranFunction);
    curateMainPageContent(category, currentFilters, 0);
  }
}

window.addEventListener("resize", handleResize);

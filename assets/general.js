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
  { title: "The Art of Learning", link: "https://www.acquirable.ch" },
  { title: "Acquirable Topics", link: "https://www.acquirable.ch" },
  { title: "Books to Acquire", link: "https://www.acquirable.ch" },
];
//the tags (our topics)
const tags = [
  {
    name: "Psychology",
    image: "../../assets/natural-patterns/flower-meadow.jpg",
  },
  { name: "Philosophy", image: "../../assets/natural-patterns/grass.jpg" },
  {
    name: "Languages & Literature",
    image: "../../assets/natural-patterns/manyships.jpg",
  },
  { name: "Art & Design", image: "../../assets/natural-patterns/sky1.jpg" },
  { name: "Tech & Science", image: "../../assets/natural-patterns/italy.jpg" },
  { name: "Business", image: "../../assets/natural-patterns/storm.jpg" },
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
    tags: [4],
  },
];

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

//loads the footer on every screen
function loadFooter() {
  var footerContent =
    '<img src="../../assets/acqu.png" alt="footer-logo" class="footer-logo"><div class="footer-links"><h2 class="footer-title">Company</h2><a href="https://acquirable.ch">Home</a><a href="https://acquirable.ch/about">About Acquirable</a><a href="https://acquirable.ch/useful-advice">Privacy Policy</a><h2 class="footer-title">Content</h2><a href="https://acquirable.ch/mindful-learning">Mindful Learning</a><a href="https://acquirable.ch/study-methods">Study Methods</a><a href="https://acquirable.ch/useful-advice">Useful Advice</a></div><div class="swiss-text">© 2025 Porath Media</div><div class="swiss-flex"><div class="swiss-text">Created in Switzerland</div><img src="../../assets/schweiz.png" alt="switzerland" class="swiss-image"></div>';

  var footer = document.querySelector(".footer");
  footer.innerHTML = footerContent;
}

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

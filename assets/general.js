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
var pageAnaId = null;
//the categories
const headerLinks = [
  {
    title: "The Magic of Learning",
    link: "https://www.acquirable.ch/the-magic-of-learning",
    description:
      "Lifelong learning is fantastic! On <i>The Magic of Learning</i>, you find fascinating articles about learning advice, methods, tools, techniques and many other inspiring ideas.",
  },
  {
    title: "Acquirable Topics",
    link: "https://www.acquirable.ch/acquirable-topics",
    description:
      "Every complex topic can be explained simply without dumbing it down. To showcase this, I created <i>Acquirable Topics</i>, a library full of interesting articles about complex topics and ideas, presented in clear and simple terms.",
  },
  {
    title: "Acquirable Book Club",
    link: "https://www.acquirable.ch/book-club",
    description:
      "Books are one of the best inventions of all time! They enable us to consume knowledge that took others ages to acquire. In the <i>Acquirable Book Club</i>, I will present the best books I have ever read: books that inspired me and sometimes significantly improved my life.",
  },
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
    title: "How to Get the Most out of Writing Summaries",
    link: "https://www.acquirable.ch/the-magic-of-learning/writing-summaries",
    image:
      "https://www.acquirable.ch/the-magic-of-learning/writing-summaries/title.jpg",
    description:
      "Writing summaries is one of the most popular and effective ways to learn something. Find out how to get the most out of them.",
    category: [0],
    tags: [],
    articleId: 0,
  },
  {
    title: "How to Improve Your Social Skills",
    link: "https://www.acquirable.ch/acquirable-topics/improving-social-skills",
    image:
      "https://www.acquirable.ch/acquirable-topics/improving-social-skills/titleimg.jpg",
    description:
      "Your social skills determine the quality of your conversations, relationships and your connections. Here's how to improve them.",
    category: [1],
    tags: [0],
    articleId: 1,
  },
];

//shows the dropdown
function dropDown() {
  if (dropDownCounter % 2 === 0) {
    menu.style.display = "flex";
    menu.innerHTML = "";
    for (j = 0; j < headerLinks.length; j++) {
      menu.innerHTML +=
        '<a href="' +
        headerLinks[j].link +
        '" class="header-link" anaid="insignificantHeaderLinkButton">' +
        headerLinks[j].title +
        "</a>";
    }
    menu.innerHTML +=
      '<ion-icon onclick="closeDropDown();" name="close-outline" class="dropdown-icon"></ion-icon>';
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
    '<img src="../../assets/acqu.png" alt="footer-logo" class="footer-logo"><div class="footer-links"><h2 class="footer-title">Company</h2><a href="https://acquirable.ch" anaid="insignificantFooterLinkButton">Home</a><a href="https://acquirable.ch/about" anaid="insignificantFooterLinkButton">About Acquirable</a><a href="https://acquirable.ch/privacy-policy" anaid="insignificantFooterLinkButton">Privacy Policy</a><a href="https://acquirable.ch/imprint" anaid="insignificantFooterLinkButton">Imprint</a><h2 class="footer-title">Content</h2>';

  for (i = 0; i < headerLinks.length; i++) {
    footerContent +=
      '<a href="' +
      headerLinks[i].link +
      '"  anaid="insignificantFooterLinkButton">' +
      headerLinks[i].title +
      "</a>";
  }

  footerContent +=
    '</div><div class="swiss-text">© 2025 Lior Porath</div><div class="swiss-flex"><div class="swiss-text">Created in Switzerland</div><img src="../../assets/schweiz.png" alt="switzerland" class="swiss-image"></div>';

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
      '" class="header-link" anaid="insignificantHeaderLinkButton">' +
      headerLinks[i].title +
      "</a>";
  }
  finalLink +=
    '</div><div class="dropdown"><ion-icon onclick="dropDown();" name="reorder-three-outline"></ion-icon><div class="dropdown-list">';
  for (j = 0; j < headerLinks.length; j++) {
    finalLink +=
      '<a href="' +
      headerLinks[j].link +
      '" class="header-link" anaid="insignificantHeaderLinkButton">' +
      headerLinks[j].title +
      "</a>";
  }
  finalLink +=
    '<ion-icon onclick="closeDropDown();" name="close-outline" class="dropdown-icon"></ion-icon></div></div>';

  var header = document.querySelector(".header");
  header.innerHTML = finalLink;
  menu = document.querySelector(".dropdown-list");
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

function setPageAnaId(id) {
  pageAnaId = id;
}

//hides the loader
window.addEventListener("load", function () {
  var csrfToken = null;
  document.querySelector(".loader").style.display = "none";

  // Fetch CSRF token from PHP
  fetch("../../assets/analytics.php")
    .then((response) => response.json())
    .then((data) => {
      csrfToken = data.csrf_token;
    })
    .then(() => {
      anaClick(pageAnaId);
    });

  function anaClick(name) {
    if (!csrfToken) return;

    fetch("../../assets/analytics.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        token: csrfToken,
      }),
    })
      .then((response) => response.json())
      .catch((error) => console.error("Error:", error));
  }

  // Attach event listeners to buttons and links
  document.querySelectorAll("a").forEach((element) => {
    element.addEventListener("click", function () {
      const anaName = this.attributes.anaid.nodeValue;
      console.log(anaName);
      if (anaName) {
        anaClick(anaName);
      }
    });
  });
  document.querySelectorAll("button").forEach((element) => {
    element.addEventListener("click", function () {
      const anaName = this.attributes.anaid.nodeValue;
      console.log(anaName);
      if (anaName) {
        anaClick(anaName);
      }
    });
  });
});

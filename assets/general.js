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
    title: "Articles",
    link: "https://www.acquirable.ch/articles",
    description:
      "Learning is magic available to everyone. Explore concise articles about a variety of topics.",
  },
  {
    title: "Projects",
    link: "https://www.acquirable.ch/projects",
    description:
      "Explore everything I (Lior) have built - and get ready for what's to come.",
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
    color: "white",
  },
  { name: "Philosophy", color: "white" },
  {
    name: "Languages & Literature",
    color: "white",
  },
  { name: "Art & Design", color: "white" },
  { name: "Tech & Science", color: "white" },
  { name: "Business", color: "white" },
  { name: "Study Methods", color: "white" },
  {
    name: "Benefits of Learning",
    color: "white",
  },
  {
    name: "Productivity & Habits",
    color: "white",
  },
];

//the list of all articles (please add new articles at the top)
const allArticles = [
  {
    title: `The Book of Joy`,
    link: "https://www.acquirable.ch/book-club/the-book-of-joy-10",
    image: "https://www.acquirable.ch/book-club/the-book-of-joy-10/title.jpg",
    description: `"The Book of Joy" combines knowledge from science, the Christian Archbishop Desmond Tutu, and the Buddhist leader Dalai Lama to answer one question: How can we find more joy? Explore the answer in this article.`,
    category: [2, 0],
    tags: [0, 1],
    articleId: 10,
    keyword: "the book of joy",
    affiliate: "",
  },
  {
    title: `Why Should We Be Curious?`,
    link: "https://www.acquirable.ch/articles/why-curiosity-9",
    image: "https://www.acquirable.ch/articles/why-curiosity-9/title.jpg",
    description: `We are always being told to “be curious” and “stay curious”, more often than not by myself. But why is this the case? Why is curiosity so amazing? Here are the answers.`,
    category: [0],
    tags: [0, 1, 7],
    articleId: 9,
    keyword: "curiosity",
    affiliate: "",
  },
  {
    title: `My GitHub Account`,
    link: "https://github.com/lior-acqu",
    image: "https://www.acquirable.ch/assets/github.jpg",
    description: `Explore my some of my most exciting coding projects on my GitHub page.`,
    category: [1],
    tags: [4],
    articleId: null,
    keyword: "github",
    affiliate: "",
  },
  {
    title: `Medieval Reasons Why “Hustle Culture” Is Pointless`,
    link: "https://www.acquirable.ch/articles/medieval-reason-8",
    image: "https://www.acquirable.ch/articles/medieval-reason-8/title.jpg",
    description: `What the progress we’ve made in the world of food production tells us about healthy productivity in our modern lives.`,
    category: [0],
    tags: [0, 4, 8],
    articleId: 8,
    keyword: "medieval-reason",
    affiliate: "",
  },
  {
    title: `The 7 Habits of Highly Effective People`,
    link: "https://www.acquirable.ch/book-club/the-seven-habits-of-highly-effective-people-7",
    image:
      "https://www.acquirable.ch/book-club/the-seven-habits-of-highly-effective-people-7/T7HoHEP.png",
    description: `"The 7 Habits of Highly Effective People" is a highly valuable book showing us ways to sustainably become the person you want to be. Find out how in this article.`,
    category: [0, 2],
    tags: [1, 5, 8],
    articleId: 7,
    keyword: "seven habits",
    affiliate: "https://amzn.to/3YmRMpM",
  },
  {
    title: `Why Every Great Learner Uses Active Learning`,
    link: "https://www.acquirable.ch/articles/active-learning-6",
    image: "https://www.acquirable.ch/articles/active-learning-6/title.jpg",
    description: `The terms "active learning" and "passive learning" are becoming increasingly popular. Explore why this hype is well-deserved.`,
    category: [0],
    tags: [6],
    articleId: 6,
    keyword: "active learning",
  },
  {
    title: `Influence`,
    link: "https://www.acquirable.ch/book-club/influence-5",
    image: "https://www.acquirable.ch/book-club/influence-5/Influence.png",
    description: `“Influence” by psychologist Robert Cialdini is one of the most popular psychology books in the world and one of the best I've read. Read my extensive review here.`,
    category: [0, 2],
    tags: [0, 4, 5],
    articleId: 5,
    keyword: "influence",
    affiliate: "https://amzn.to/3RxdSSw",
  },
  {
    title: `How to Learn Anything with the Feynman Technique`,
    link: "https://www.acquirable.ch/articles/feynman-technique-4",
    image:
      "https://www.acquirable.ch/articles/feynman-technique-4/titleimg.jpg",
    description: `The Feynman Technique is one of the most useful learning techniques to boost your understanding and knowledge of any topic. Explore here how it works.`,
    category: [0],
    tags: [6],
    articleId: 4,
    keyword: "feynman technique",
  },
  {
    title: "How I Mastered Notion",
    link: "https://www.acquirable.ch/articles/notion-3",
    image: "https://www.acquirable.ch/articles/notion-3/titleimg.jpg",
    description: `Notion is a fantastic tool. It offers you countless functions to take notes, organise your data and much more. Explore here how to master it.`,
    category: [0],
    tags: [4, 8],
    articleId: 3,
    keyword: "notion",
  },
  {
    title: `The Infinite Game`,
    link: "https://www.acquirable.ch/book-club/the-infinite-game-2",
    image:
      "https://www.acquirable.ch/book-club/the-infinite-game-2/titleimg.png",
    description: `Simon Sinek's book "The Infinite Game" completely changed how I think about leadership and organsitations. Explore my total review here.`,
    category: [0, 2],
    tags: [0, 1, 5],
    articleId: 2,
    keyword: "infinite game",
    affiliate: "https://amzn.to/4caCWsb",
  },
  {
    title: "The Magic of Storytelling",
    link: "https://www.acquirable.ch/articles/storytelling-1",
    image: "https://www.acquirable.ch/articles/storytelling-1/titleimg.jpg",
    description:
      "People love stories. Especially yours if you tell them in an engaging, authentic manner. Explore how that works in this article.",
    category: [0],
    tags: [0, 2],
    articleId: 1,
    keyword: "storytelling",
  },
  {
    title: "How to Get the Most out of Writing Summaries",
    link: "https://www.acquirable.ch/articles/writing-summaries-0",
    image: "https://www.acquirable.ch/articles/writing-summaries-0/title.jpg",
    description:
      "Writing summaries is one of the most popular and effective ways to learn something. Find out how to get the most out of them.",
    category: [0],
    tags: [6],
    articleId: 0,
    keyword: "summaries",
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
      '<img src="../../assets/x_black.png" class="menu-icon" style="margin-top: 10px;" onclick="closeDropDown();">';
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
    '<img src="../../assets/acqu.png" alt="footer-logo" class="footer-logo"><div class="footer-links"><h2 class="footer-title">Company</h2><a href="https://acquirable.ch" anaid="insignificantFooterLinkButton">Home</a><a href="https://acquirable.ch/about" anaid="insignificantFooterLinkButton">About Acquirable</a><a href="https://acquirable.ch/privacy-policy" anaid="insignificantFooterLinkButton">Privacy Policy</a><a href="https://acquirable.ch/imprint" anaid="insignificantFooterLinkButton">Imprint</a><a href="https://acquirable.ch/affiliate-disclosure" anaid="insignificantFooterLinkButton">Affiliate Disclosure</a><a href="https://www.instagram.com/notesbylior/" anaid="insignificantFooterLinkButton" target="_blank">Instagram</a><a href="https://www.linkedin.com/in/liorporath/" anaid="insignificantFooterLinkButton" target="_blank">LinkedIn</a><h2 class="footer-title">Content</h2>';

  for (i = 0; i < headerLinks.length; i++) {
    footerContent +=
      '<a href="' +
      headerLinks[i].link +
      '"  anaid="insignificantFooterLinkButton">' +
      headerLinks[i].title +
      "</a>";
  }

  footerContent +=
    '</div><div class="swiss-text">© 2025 Lior Porath</div><div class="swiss-flex"><div class="swiss-text">Created in Switzerland</div><img src="../../assets/schweiz.png" alt="switzerland flag" class="swiss-image"></div><p class="footer-disclosure">We are a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for us to earn advertising fees by linking to Amazon.com and affiliated websites.</p>';

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
    '</div><div class="dropdown"><img src="../../assets/menu.png" class="menu-icon" onclick="dropDown();"><div class="dropdown-list">';
  for (j = 0; j < headerLinks.length; j++) {
    finalLink +=
      '<a href="' +
      headerLinks[j].link +
      '" class="header-link" anaid="insignificantHeaderLinkButton">' +
      headerLinks[j].title +
      "</a>";
  }
  finalLink +=
    '<img src="../../assets/menu.png" class="menu-icon"  onclick="closeDropDown();"></div></div>';

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
  // only changes header on the main pages where mainpage.js exists
  try {
    initialHeaderChange();
  } catch {}

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

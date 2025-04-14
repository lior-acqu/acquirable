function findArticleData(id) {
  var foundArticle = {};
  for (let i = 0; i < allArticles.length; i++) {
    if (allArticles[i].articleId == id) {
      setCategoryAndTags(allArticles[i].category, allArticles[i].tags);
      curateSuggestions(null, id);
      document
        .getElementById("upperShare")
        .setAttribute(
          "onclick",
          "shareArticleLink('Acquirable | " +
            allArticles[i].title +
            "','" +
            allArticles[i].link +
            "')"
        );
      document
        .getElementById("lowerShare")
        .setAttribute(
          "onclick",
          "shareArticleLink('Acquirable | " +
            allArticles[i].title +
            "','" +
            allArticles[i].link +
            "')"
        );
      document.querySelector(".title").innerHTML = allArticles[i].title;
    }
  }
}

//function for sharing the article link
function shareArticleLink(text, link) {
  //navigator.clipboard.writeText(text + " - " + link);
  let shareData = {
    title: "Acquirable",
    text: text,
    url: link,
  };
  try {
    navigator.share(shareData);
  } catch {
    navigator.clipboard.writeText(text + " - " + link);
    console.log("caught");
    // Show a confirmation message
    messageElement.style.visibility = "visible";

    // Hide the message after 3 seconds (1000 milliseconds)
    setTimeout(() => {
      messageElement.style.visibility = "hidden";
    }, 2000); // 1000ms = 1 second
  }
}
//removes the thank you message from the screen

function removeMessage() {
  messageElement.style.visibility = "hidden";
}

// makes suggestions based on the current article
function curateSuggestions(filter, articleId) {
  let otherArticlesArray = [];
  for (let i = 0; i < allArticles.length; i++) {
    if (allArticles[i].articleId != articleId) {
      otherArticlesArray.push(allArticles[i]);
    }
  }
  let categorisedArray = [];
  let addedCategory = false;
  //first, the category (The Magic of Learning etc.) is filtered
  if (category != null) {
    for (let i = 0; i < otherArticlesArray.length; i++) {
      addedCategory = false;
      for (let j = 0; j < category.length; j++) {
        if (
          otherArticlesArray[i].category.includes(category[j]) &&
          !addedCategory
        ) {
          categorisedArray.push(otherArticlesArray[i]);
          addedCategory = true;
        }
      }
    }
  } else {
    categorisedArray = otherArticlesArray;
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
  // give the array a maximum length of 3
  while (filteredArray.length > 3) {
    filteredArray.pop();
  }
  //after the filtered array is created, buildMainPost() now displays all articles on screen
  buildSuggestions(filteredArray);
}

function buildSuggestions(array) {
  //check if there is an entry
  if (array.length == 0) {
    document.querySelector(".article-container").innerHTML =
      "<img src='../../noresults.jpg' alt='alt' class='article-img' style='max-width: 975px; width: 80%; text-align: center;'><h1 class='main-quote'>Can’t find what you need? Adjust your filters to discover inspiring articles.</h1>";
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

    mainTitle.classList.add("main-title-article");
    mainDesc.classList.add("main-desc");
    articleData.classList.add("article-data");
    mainImg.classList.add("main-img-article");
    postText.classList.add("post-text-article");
    postTags.classList.add("post-tags-article");
    mainPost.classList.add("main-post-article");

    mainTitle.appendChild(mainTitleText);
    mainDesc.appendChild(mainDescText);
    articleData.appendChild(articleDataText);
    mainPost.href = array[i].link;

    postText.appendChild(mainTitle);
    postText.appendChild(mainDesc);
    postText.appendChild(articleData);
    postText.appendChild(postTags);

    mainImg.src = mainImgSrc;

    mainPost.appendChild(mainImg);
    mainPost.appendChild(postText);

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

      document.querySelectorAll(".post-tags-article")[i].appendChild(tag);
    }
  }
}

//adds the tags to a specific article and sets the category
function setCategoryAndTags(givenCategory, allTags) {
  category = givenCategory;
  let tagBox = document.querySelector(".article-tags");

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
    if (tagBox != null) {
      tagBox.appendChild(tag);
    }
  }

  var linkBox = document.querySelector(".article-type");
  var linkString = "";
  if (linkBox != null) {
    for (let i = 0; i < givenCategory.length; i++) {
      if (i != 0) {
        linkString += ", ";
      }
      linkString +=
        '<a href="' +
        headerLinks[givenCategory[i]].link +
        '" class="type-link" anaid="articleTypeLinkButton">' +
        headerLinks[givenCategory[i]].title +
        "</a>";
    }
    linkBox.innerHTML = linkString;
  }
}

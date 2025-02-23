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

//adds the tags to a specific article and sets the category
function setCategoryAndTags(category, allTags) {
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
    for (let i = 0; i < category.length; i++) {
      if (i != 0) {
        linkString += ", ";
      }
      linkString +=
        '<a href="' +
        headerLinks[category[i]].link +
        '" class="type-link">' +
        headerLinks[category[i]].title +
        "</a>";
    }
    linkBox.innerHTML = linkString;
  }
}

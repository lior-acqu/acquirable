var filterDropdownCounter = 0;

function setCategory(givenCategory) {
  category = givenCategory;
}

function curateMainPageContent(category, filter, page) {
  let categorisedArray = [];
  let addedCategory = false;
  //first, the category (The Magic of Learning etc.) is filtered
  if (category != null) {
    for (let i = 0; i < allArticles.length; i++) {
      addedCategory = false;
      for (let j = 0; j < category.length; j++) {
        if (allArticles[i].category.includes(category[j]) && !addedCategory) {
          categorisedArray.push(allArticles[i]);
          addedCategory = true;
        }
      }
    }
  } else {
    categorisedArray = allArticles;
  }

  let filteredArray = [];
  let addedFilter = false;
  //then, the tag (Tech, Business etc.) is filtered
  if (filter != null) {
    for (let i = 0; i < categorisedArray.length; i++) {
      addedFilter = false;
      for (let j = 0; j < filter.length; j++) {
        if (categorisedArray[i].tags.includes(filter[j]) && !addedFilter) {
          filteredArray.push(categorisedArray[i]);
          addedFilter = true;
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
  const dropdownTags = document.querySelectorAll(".dropdown-tag");
  if (currentFilters.includes(number)) {
    const index = currentFilters.indexOf(number);
    if (index > -1) {
      // only splice array when item is found
      currentFilters.splice(index, 1); // 2nd parameter means remove one item only
    }
    filterTags[number].classList.remove("clicked-tag");
    if (dropDownCounter % 2 == 1) {
      dropdownTags[number].classList.remove("selected");
    }
  } else {
    currentFilters.push(number);
    filterTags[number].classList.add("clicked-tag");
    if (dropDownCounter % 2 == 1) {
      dropdownTags[number].classList.add("selected");
    }
  }
  //re-filters the articles, because the filters have changed
  if (currentFilters.length == 0) {
    curateMainPageContent(category, null, 0);
  } else {
    curateMainPageContent(category, currentFilters, 0);
  }
}

// shows the new tag filters
function displayTagFilters() {
  for (var i = 0; i < tags.length; i++) {
    tagFilter.innerHTML +=
      '<button onclick="addFilter(' +
      i +
      ')" class="filter-tag">' +
      tags[i].name +
      "</button>";
  }
  tagFilter.innerHTML +=
    '<div class="dropdown" style="padding-bottom: 10px;"><ion-icon onclick="showDropdownFilters();" name="reorder-three-outline"></ion-icon><span style="font-size: 18px; font-weight: 400; margin-left: 10px">Filter Articles</span></div>';
}

// if screen is too small, this shows the dropdown with the tag filters
function showDropdownFilters() {
  if (dropDownCounter % 2 === 0) {
    menu.style.display = "flex";
    menu.innerHTML = "";
    for (var i = 0; i < tags.length; i++) {
      menu.innerHTML +=
        '<button onclick="addFilter(' +
        i +
        ')" class="dropdown-tag">' +
        tags[i].name +
        "</button>";
    }
    menu.innerHTML +=
      '<ion-icon onclick="closeDropDown();" name="close-outline" class="dropdown-icon"></ion-icon>';
    dropDownCounter++;
  } else {
    closeDropDown();
  }
}

let ranFunction = false;

// this checks if the screen is too small for the big display settings
function handleResize() {
  if (window.innerWidth <= 850 && ranFunction == false) {
    // Call your function here
    ranFunction = true;
    curateMainPageContent(category, currentFilters, 0);
  } else if (window.innerWidth > 850) {
    //only if it is bigger again
    ranFunction = false;
    curateMainPageContent(category, currentFilters, 0);
  }
}

// small parallax effect with title image
const initialImageMargin = 0;
var newImageMargin = 0;
window.addEventListener("scroll", () => {
  var scroll = window.scrollY;
  newImageMarginBottom = initialImageMargin + scroll / 5; // change intensity of parallax
  document.querySelector(".title-line-img").style.marginBottom =
    newImageMarginBottom + "px";
});

// make the screen transition from dark to light on scroll
function enlightenScreen(startColor) {
  var start = startColor;
  var end = [255, 255, 255];
  var maxPx = 600;
  var redDifference = end[0] - start[0];
  var greenDifference = end[1] - start[1];
  var blueDifference = end[2] - start[2];
  var redPerPx = redDifference / maxPx;
  var greenPerPx = greenDifference / maxPx;
  var bluePerPx = blueDifference / maxPx;
  document.querySelector("body").style.backgroundColor =
    "rgb(" + start[0] + "," + start[1] + "," + start[2] + ")";

  window.addEventListener("scroll", () => {
    var scroll = window.scrollY;
    if (scroll < 600) {
      document.querySelector("body").style.backgroundColor =
        "rgb(" +
        (start[0] + redPerPx * scroll) +
        "," +
        (start[1] + greenPerPx * scroll) +
        "," +
        (start[2] + bluePerPx * scroll) +
        ")";
    } else {
      document.querySelector("body").style.backgroundColor = "white";
    }
  });
}

window.addEventListener("resize", handleResize);

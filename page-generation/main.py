# all elements of the article
import datetime
currentTime = datetime.datetime.now()
articleDate = currentTime.strftime("%x")
description = ""
imgSource = ""
link = ""
categories = []
tags = []
artId = ""
keyword = ""
affiliate = ""
currentContainer = ""
headDescription = ""
articleContent = ""
fileName = ""
folders = ["articles", "projects", "book-club"]

# adding a normal text paragraph
def addText(textInput):
    global articleContent, currentContainer, currentContainer
    # close graphic if not yet closed
    if currentContainer != "text-container":
        currentContainer = "text-container"
        articleContent = articleContent +  """
        </div>
        <div class="text-container">\n
        """
    articleContent = articleContent + f"<p class='article-text'>{textInput}</p>\n"

# adding a sub-title
def addSubTitle():
    global articleContent, currentContainer
    # close graphic if not yet closed
    if currentContainer != "text-container":
        currentContainer = "text-container"
        articleContent = articleContent +  """
        </div>
        <div class="text-container">\n
        """
    textInput = input("Text: ")
    articleContent = articleContent +  f"<div class='sub-title'>{textInput}</div>\n"

# adding a sub-sub-title
def addSubSubTitle():
    global articleContent, currentContainer
    # close graphic if not yet closed
    if currentContainer != "text-container":
        currentContainer = "text-container"
        articleContent = articleContent +  """
        </div>
        <div class="text-container">\n
        """
    textInput = input("Text: ")
    articleContent = articleContent +  f"<div class='sub-sub-title'>{textInput}</div>\n"

# adding a bullet-container
def addBulletContainer():
    global articleContent, currentContainer
    # close graphic if not yet closed
    if currentContainer != "text-container":
        currentContainer = "text-container"
        articleContent = articleContent +  """
        </div>
        <div class="text-container">\n
        """
    finishedPoints = False
    bulletPoints = ""
    while not finishedPoints:
        bulletInput = input("Add bullet point ('Done' if finished): ")
        if bulletInput == "Done":
            finishedPoints = True
        else:
            bulletPoints += f"<p class='bullet-point'>{bulletInput}</p>\n"
    articleContent = articleContent +  f"<div class='bullet-container'>{bulletPoints}</div>\n"

def addGraphic():
    global articleContent, currentContainer
    # close graphic if not yet closed
    if currentContainer != "graphic":
        currentContainer = "graphic"
        articleContent = articleContent +  """
        </div>
        <div class="graphic">\n
        """
    width = int(input("Image width (x%, usually 60 or 100): "))
    source = input("Image source: ")
    alt = input("Alt text: ")
    caption = input("Caption: ")
    articleContent = articleContent + f"""
        <div class="graphic">
            <img src="{source}" alt="{alt}" class="article-img"
            style="width: {width}%; text-align: center;">
            <p class="img-desc">{caption}
            </p>\n
"""

def addSource():
    global articleContent, currentContainer
    # close graphic if not yet closed
    if currentContainer != "text-container":
        currentContainer = "text-container"
        articleContent = articleContent +  """
        </div>
        <div class="text-container">\n
        """
    finishedSources = False
    sources = ""
    while not finishedSources:
        urlInput = input("Add source url ('Done' if finished): ")
        if urlInput == "Done":
            finishedSources = True
        else:
            sourceTitle = input("Add source title: ")
            sources += f"<a class='source' target='_blank' href='{urlInput}' anaid='sourceButton'>{sourceTitle}</a>\n"
    articleContent = articleContent +  f"<div class='source-container'>{sources}</div>\n"

# the entire questionnaire

title = input("What's the title of the article? ")
imgSource = input("What's the title image called? ")
description = input("What's the description? ")


# add the categories to the article
finishedCategories = False
while not finishedCategories:
    newCategory = input("Add categories - 0 (Articles), 1 (Projects), 2 (Book Club), Done (Done): ")
    if newCategory != "Done":
        if int(newCategory) < 3 and int(newCategory) >= 0:
            categories.append(int(newCategory))
    else:
        finishedCategories = True

# add the tags to the article
finishedTags = False
while not finishedTags:
    newTag = input("Add tags - 0 (Psychology), 1 (Philosophy), 2 (Languages & Literature), 3 (Art & Design), 4 (Tech & Science), 5 (Business), 6 (Study Methods), 7 (Benefits of Learning), 8 (Productivity & Habits), Done (Done): ")
    if newTag != "Done":
        if int(newTag) < 9 and int(newTag) >= 0:
            tags.append(int(newTag))
    else:
        finishedTags = True

artId = input("Article id: ")
keyword = input("Search keyword: ")
affiliate = input("Affiliate link (leave empty if not relevant): ")

# generate link
link = f"https://www.acquirable.ch/{folders[categories[0]]}/{keyword}-{artId}"


# generate the filename, very similar to link
fileName = f"{folders[categories[0]]}-{keyword}-{artId}"


# adds description paragraphs
finishedDesc = False
while not finishedDesc:
    newDesc = input("Add a description paragraph (just type 'Done' if you don't want to): ")
    if newDesc != "Done":
        headDescription += f'<h2 class="description">{newDesc}</h2>'
    else:
        finishedDesc = True

# add initial article container
addedContainer = False
while not addedContainer:
    initialContainer = input("Add the initial container (t (text-container), g (graphic)): ")
    if initialContainer == "t":
        articleContent = articleContent +  f"<div class='text-container'>\n"
        currentContainer = "text-container"
        addedContainer = True
    if initialContainer == "g":
        articleContent = articleContent +  f"<div class='graphic'>\n"
        currentContainer = "graphic"
        addGraphic()
        addedContainer = True

# add the real content
finishedContent = False
while not finishedContent:
    newElement = input("New element (Default (text), 1 (sub-title), 2 (sub-sub-title), b (bullet-container), g (graphic), s (source), 'Done' if finished): ")
    if newElement == "1":
        addSubTitle()
    if newElement == "2":
        addSubSubTitle()
    if newElement == "b":
        addBulletContainer()
    if newElement == "g":
        addGraphic()
    if newElement == "s":
        addSource()
    if newElement == "Done":
        articleContent = articleContent +  """
        <div class="article-container" style="border-top: 1px solid #e7e7e7; padding: 50px 0; margin: 50px 0 0 0;">
                    <div class="sub-title" style="text-align: center;">Popular Articles for You</div>
                </div>
        </div>
        """
        finishedContent = True
    elif len(newElement) > 1:
        addText(newElement)



# generates the general.js entry
jsEntry = f"""
    title: `{title}`,
    link: "{link}",
    image:
      "{link}/{imgSource}",
    description: `{description}`,
    category: {categories},
    tags: {tags},
    articleId: {artId},
    keyword: "{keyword}",
    affiliate: "{affiliate}",
  """

# everything that frames the real content
html_frame = f"""<!DOCTYPE html>
<html lang="en">

<!-- Add this to general.js
    {"{"}
        {jsEntry}
    {"}"}
-->

<head>
    <link rel="stylesheet" href="../../assets/styles.css">
    <link rel="icon" href="../../assets/icon_gray.ico" type="image/x-icon">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="{description}">
    <title>Acquirable | {title}</title>
</head>
<body>
    <div class="header"></div>
    <div class="container">
        <div class="article">
            <div class="art-header">
                <img
                src="{imgSource}"
                alt="title-img" class="title-img">
                <h1 class="title">{title}</h1>
                <div class="article-type">
                </div>
                <div class="article-tags">
                </div>
                {headDescription}
                <div class="info">
                    <p>{articleDate}</p>
                </div>
                <div class="actions-container" id="upperShare">
                    <button onclick="shareArticleLink()" class="article-tag" style="border: 1px solid #515cd4; color:#515cd4;"  anaid="upperShareButton">
                        <span class="tag-link-text">Share Article</span>
                    </button>
                </div>
            </div>
            {articleContent}
            <h1 class="main-quote">Everything is Acquirable.</h1>
        </div>
    </div>
    </div>
    <div class="actions-container" id="lowerShare">
        <button onclick="shareArticleLink()" class="article-tag" style="border: 1px solid #515cd4; color:#515cd4;"  anaid="lowerShareButton">
            <span class="tag-link-text">Share Article</span>
        </button>
    </div>
    <div class="share-alert-container" id="share-alert-container">
        <div class="share-alert">
            <p class="share-header">Thank You!</p>
            <p class="share-desc">The article link is copied to clipboard.</p>
            <button onclick="removeMessage();" class="action-content" anaid="closeMessageButton">
                <ion-icon name="close-outline"></ion-icon>
            </button>
        </div>
    </div>
        <div class="explanation" onclick="hideExplanation()" anaid="closeExplanationButton">
        <div class="explanation-content">
            <div class="explanation-title"></div>
            <div class="explanation-text"></div>
        </div>
    </div>
    <div class="footer">
    </div>
    <div class="loader">
        <img src="../../assets/acqu.png" alt="footer-logo" class="footer-logo" style="height: 100px; width: auto;">
        <h1 class="main-quote" >Everything is Acquirable.</h1>
    </div>
    <script src="../../assets/general.js"></script>
    <script src="../../assets/article.js"></script>
    <script>
        loadFooter();
        loadHeader();
        setPageAnaId("article_{artId}");
        findArticleData({artId});
    </script>
</body>
</html>
"""

print(html_frame)

# Write the content to an HTML file (called index_.html not to overwrite any real files)
with open(f"{fileName}.html", "w", encoding="utf-8") as file:
    file.write(html_frame)

# %%

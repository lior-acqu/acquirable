var dropDownCounter = 0;
var menu = null;

function dropDown() {
    if (dropDownCounter % 2 === 0) {
        menu.style.display = 'flex';
        dropDownCounter++;
    } else {
        closeDropDown();
    }
}

function closeDropDown() {
    menu.style.display = 'none';
    dropDownCounter++;
}

function loadFooter() {
    var footerContent = '<img src="../assets/acqu.png" alt="footer-logo" class="footer-logo"><div class="footer-links"><h2 class="footer-title">Company</h2><a href="https://acquirable.ch">Home</a><a href="https://acquirable.ch/about">About Acquirable</a><a href="https://acquirable.ch/useful-advice">Privacy Policy</a><h2 class="footer-title">Content</h2><a href="https://acquirable.ch/mindful-learning">Mindful Learning</a><a href="https://acquirable.ch/study-methods">Study Methods</a><a href="https://acquirable.ch/useful-advice">Useful Advice</a></div><div class="swiss-text">© Porath Media</div><div class="swiss-flex"><div class="swiss-text">Created in Switzerland</div><img src="../assets/schweiz.png" alt="switzerland" class="swiss-image"></div>';

    var footer = document.querySelector('.footer');
    footer.innerHTML = footerContent;
}

function loadHeader() {
    var headerContent = '<img src="acquirable.png" alt="logo" class="logo"><div class="header-link-flex"><a href="/" class="header-link">Mindful Learning</a><a href="/" class="header-link">Study Methods</a><a href="/" class="header-link">Useful Advice</a></div><div class="dropdown"><ion-icon onclick="dropDown();" name="reorder-three-outline"></ion-icon><div class="dropdown-list"><a href="/" class="header-link">Mindful Learning</a><a href="/" class="header-link">Study Methods</a><a href="/" class="header-link">Useful Advice</a><ion-icon onclick="closeDropDown();" name="close-outline" class="dropdown-icon"></ion-icon></div></div>';

    var header = document.querySelector('.header');
    header.innerHTML = headerContent;
    menu = document.querySelector(".dropdown-list");
}

loadFooter();
loadHeader();

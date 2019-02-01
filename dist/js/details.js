'use strict';

// matches polyfill
this.Element && function (ElementPrototype) {
    ElementPrototype.matches = ElementPrototype.matches ||
        ElementPrototype.matchesSelector ||
        ElementPrototype.webkitMatchesSelector ||
        ElementPrototype.msMatchesSelector ||
        function (selector) {
            var node = this, nodes = (node.parentNode || node.document).querySelectorAll(selector), i = -1;
            while (nodes[++i] && nodes[i] != node);
            return !!nodes[i];
        }
}(Element.prototype);

// closest polyfill
this.Element && function (ElementPrototype) {
    ElementPrototype.closest = ElementPrototype.closest ||
        function (selector) {
            var el = this;
            while (el.matches && !el.matches(selector)) el = el.parentNode;
            return el.matches ? el : null;
        }
}(Element.prototype);

function getBodyScrollTop() {
    var el = document.scrollingElement || document.documentElement;
    return el.scrollTop;
}

function randomState(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

var item = localStorage.getItem('_item');
item != null ? item = JSON.parse(item) : item = { title: "Ben Mild" };;
var itemSplit = item.title.split(' ');

var imgTitle = document.querySelector('.mdc-image-list__label');
imgTitle.innerText = item.title;

var singleImgTitle = document.querySelector('[id^="details-image-appbar"] .mdc-top-app-bar__title');
singleImgTitle.innerText = item.title;

var elmStates = ['Relased', 'In Progress', 'Archived'];

var attrFirstName = document.getElementById('firstname').children[1],
    attrLastName = document.getElementById('lastname').children[1],
    attrFileName = document.getElementById('filename').children[1],
    attrStreet = document.getElementById('street').children[1],
    attrPostal = document.getElementById('postal-code').children[1],
    attrCity = document.getElementById('city').children[1],
    attrPhoneNumber = document.getElementById('phone').children[1],
    attrCreatedBy = document.getElementById('created-by').children[1],
    attrCreationDate = document.getElementById('creation-date').children[1],
    attrCurrentState = document.getElementById('current-state').children[1];

attrFirstName.innerText = itemSplit[0];
attrLastName.innerText = itemSplit[1];
attrStreet.innerText = faker.address.streetAddress();
attrPostal.innerText = faker.address.zipCode();
attrCity.innerText = faker.address.city();
attrPhoneNumber.innerText = faker.phone.phoneNumber();
attrCreatedBy.innerText = faker.name.findName();
attrCreationDate.innerText = faker.date.past().toLocaleDateString("en-US");
attrCurrentState.innerText = randomState(elmStates);
attrFileName.innerText = itemSplit[0].substring(0, 1).toLowerCase() + '' + itemSplit[1].toLowerCase() + '.jpg';

var navBack = document.querySelector('[id^="arrow_back-"]');

navBack.addEventListener('click', function (e) {
    localStorage.removeItem('_item');
});

var topAppBars = [].slice.call(document.querySelectorAll('.mdc-top-app-bar'));
var mTopAppBar = topAppBars.map(function (topAppBarElm) {
    return mdc.topAppBar.MDCTopAppBar.attachTo(topAppBarElm);
});

var tabBarElement = document.querySelector('.mdc-tab-bar');
var mTabBar = mdc.tabBar.MDCTabBar.attachTo(tabBarElement);

var mTabs = [].map.call(document.querySelectorAll('.mdc-tab'), function (el) {

    var elmRipple = mdc.ripple.MDCRipple.attachTo(el);
    return elmRipple.unbounded = true;
});

var mTopActions = [].map.call(document.querySelectorAll('.mdc-top-app-bar__action-item'), function (el) {
    var elmRipple = mdc.ripple.MDCRipple.attachTo(el);

    elmRipple.listen('click', function (e) {
        console.log('Here is your top action');
    });

    return elmRipple.unbounded = true;
});

var favToggle = document.querySelector('[id^="favorite_border-"]');
var favToggleIcon = favToggle.innerText;

favToggle.addEventListener('click', function (e) {
    if (e.target.innerText == favToggleIcon) {
        favToggle.innerText = "favorite";
    } else {
        favToggle.innerText = favToggleIcon;
    }
});

var contentElements = document.querySelectorAll('.dmc-tab-index__content');

mTabBar.listen('MDCTabBar:activated', function (e) {
    console.log('tab change');
    // Hide currently-active content
    document.querySelector('.dmc-tab-index__content--active').classList.remove('dmc-tab-index__content--active');
    // Show content for newly-activated tab
    contentElements[e.detail.index].classList.add('dmc-tab-index__content--active');
});

var backDrop = document.querySelector('.dmc-backdrop');
var backDropAppBar = backDrop.querySelector('.mdc-top-app-bar');
var backDropImg = backDrop.querySelector('.mdc-image-list__image');
var navBackDrop = backDrop.querySelector('[id^="arrow_back-"]');

navBackDrop.addEventListener('click', function (e) {
    e.preventDefault();
    backDrop.classList.remove('dmc-backdrop--active');
});

backDropAppBar.addEventListener('click', function (e) {
    e.stopPropagation();
});

backDropImg.addEventListener('click', function (e) {
    e.stopPropagation();
});

backDrop.addEventListener('click', function (e) {
    navBackDrop.click();
});

var imgElements = [].map.call(document.querySelectorAll('.mdc-image-list__image'), function (elm) {

    elm.addEventListener('click', function (e) {
        console.log('Here is your image');
        backDrop.classList.add('dmc-backdrop--active');
    });
});

window.onscroll = function () {
    var elm = tabBarElement,
        header = elm.parentElement.previousElementSibling,
        scrollDist = getBodyScrollTop(),
        leadElmsDist = document.querySelector('.mdc-image-list').clientHeight;

    if (scrollDist > leadElmsDist) {
        //make position fixed instead of absolute
        elm.classList.add('mdc-tab-bar--fixed-scrolled');
        elm.closest('.mdc-top-app-bar--fixed-adjust').classList.add('mdc-tab-bar--fixed--adjust');
        header.classList.remove('mdc-top-app-bar--fixed-scrolled');
    } else {
        //clear styles if back to original position
        elm.classList.remove('mdc-tab-bar--fixed-scrolled');
        elm.closest('.mdc-top-app-bar--fixed-adjust').classList.remove('mdc-tab-bar--fixed--adjust');
        header.classList.add('mdc-top-app-bar--fixed-scrolled');
    }
};

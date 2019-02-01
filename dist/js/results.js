'use strict';

var topAppBars = [].slice.call(document.querySelectorAll('.mdc-top-app-bar'));
var mTopAppBar = topAppBars.map(function (topAppBarElm) {
    return mdc.topAppBar.MDCTopAppBar.attachTo(topAppBarElm);
});

var viewToggle = document.querySelector('[id^="view_list"]');
var viewToggleIcon = viewToggle.innerText;

viewToggle.addEventListener('click', function (e) {
    if (e.target.innerText === viewToggleIcon) {
        viewToggle.innerText = "view_comfy";
    } else {
        viewToggle.innerText = viewToggleIcon;
    }
});

var goToDetails = function goToDetails(elm) {

    var title = elm.querySelector('.mdc-list-item__primary-text');
    console.log(title.innerText);

    var item = {
        title: title.innerText
    };

    item = JSON.stringify(item);

    localStorage.setItem('_item', item);
    window.location = 'details.html';
};

var mList = mdc.list.MDCList.attachTo(document.querySelector('.mdc-list'));
var listItemRipple = mList.listElements.map(function (listItemEl) {
    return mdc.ripple.MDCRipple.attachTo(listItemEl);
});

var listItems = mList.listElements.map(function (listItemEl) {
    return listItemEl.addEventListener('click', function (e) {
        var itemEl = e.currentTarget;
        goToDetails(itemEl);
    });
});

var mTopActions = [].map.call(document.querySelectorAll('.mdc-top-app-bar__action-item'), function (el) {
    var elmRipple = mdc.ripple.MDCRipple.attachTo(el);

    elmRipple.listen('click', function () {
        console.log('Here is your top action');
    });

    return elmRipple.unbounded = true;
});

var mMoreButtons = [].map.call(document.querySelectorAll('.mdc-icon-button'), function (el) {

    var elmRipple = mdc.ripple.MDCRipple.attachTo(el);
    var menuElement = document.querySelector('.mdc-menu');
    var mMenu = mdc.menu.MDCMenu.attachTo(menuElement);

    elmRipple.listen('click', function (e) {
        e.stopPropagation();
        console.log('Here is your menu');
        mMenu.open = !mMenu.open;

        var btnElement = e.target,
            itemElement = btnElement.parentNode,
            btnElementRect = btnElement.getBoundingClientRect();

        mMenu.setAbsolutePosition(btnElementRect.left, btnElementRect.top);

        mMenu.listen('click', function () {
            goToDetails(itemElement);
        });
    });

    return elmRipple.unbounded = true;
});

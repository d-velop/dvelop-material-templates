'use strict';

var items = [].map.call(document.querySelectorAll('.mdc-list-item'), function (el) {
    return mdc.ripple.MDCRipple.attachTo(el);
});
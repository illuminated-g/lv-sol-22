(function() {
    'use strict';

    const setInnerHTML = function(placeholder, html) {
        placeholder.innerHTML = html;
    }

    const clearClassFromAll = function(className) {
        var elts = document.querySelectorAll('.' + className);
        for (var i = 0; i < elts.length; ++i) {
            elts[i].classList.remove(className);
        }
    }

    window.Utilities = {
        setInnerHTML,
        clearClassFromAll
    };
}());
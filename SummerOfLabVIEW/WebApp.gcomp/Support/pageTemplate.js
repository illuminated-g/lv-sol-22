(function () {
    'use strict';

    //values used to update parts after initially applying the template
    var navbar = null;
    var navlinks = null;
    var userInfo = null;
    var login = null;
    var signup = null;
    var logout = null;
    var greeting = null;
    var user = null;
    var anonymous = true;

    // Modify to insert custom HTML into different spots in the page
    // Custom scripts and styles should be added to the JSLI instead so the editor can manage the files
    const applyTemplate = function () {
        document.head.insertAdjacentHTML('beforeend', `
            <!-- Some HTML inserted before the end of head -->
        `);

        navbar = document.createElement('div');
        navbar.classList.add('sol-nav-bar');

        var elt = document.createElement('span');
        elt.classList.add('sol-nav-logo');
        elt.innerHTML = '<a href="/"><img src="/images/sol-logo.png"> Summer of LabVIEW</a>';
        navbar.appendChild(elt);

        navlinks = document.createElement('span');
        navlinks.classList.add('sol-nav-links');
        navbar.appendChild(navlinks);

        elt = document.createElement('a');
        elt.setAttribute('href', '/challenges.html');
        elt.innerText = 'Challenges';
        navlinks.appendChild(elt);

        userInfo = document.createElement('span');
        userInfo.classList.add('sol-nav-user');
        navbar.appendChild(userInfo);

        greeting = document.createElement('span');
        greeting.innerText = 'Welcome!';
        userInfo.appendChild(greeting);

        login = document.createElement('a');
        login.setAttribute('href', '/login.html');
        login.innerText = 'Login';
        login.style.display = 'none';
        userInfo.appendChild(login);

        signup = document.createElement('a');
        signup.setAttribute('href', '/register.html');
        signup.innerText = 'Sign Up';
        signup.style.display = 'none';
        userInfo.appendChild(signup);

        logout = document.createElement('a');
        logout.setAttribute('href', '/logout');
        logout.innerText = 'Logout';
        logout.style.display = 'none';
        userInfo.appendChild(logout);

        document.body.insertAdjacentElement('afterbegin', navbar);
    };

    // Helper functions
    const ready = function (callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('readystatechange', function readyStateChangeHandler () {
                document.removeEventListener('readystatechange', readyStateChangeHandler);
                callback();
            });
        } else {
            callback();
        }
    };

    const isInBrowser = function () {
        const webAppElement = document.querySelector('ni-web-application');
        const isInBrowser = webAppElement.getAttribute('location') === 'BROWSER';
        return isInBrowser;
    };

    ready(function () {
        if (isInBrowser()) {
            applyTemplate();
        }
    });

    const setUser = function(loggedIn, userJSON) {
        if (userJSON != "") {
            user = JSON.parse(userJSON);

            greeting.innerText = 'Welcome, ' + user.first_name + '!';
            logout.style.display = '';
        } else {
            login.style.display = '';
            signup.style.display = '';
        }

        anonymous = !loggedIn;
    }

    const addNavLink = function(url, text) {
        var elt = document.createElement('a');
        elt.setAttribute('href', url);
        elt.innerText = text;

        navlinks.appendChild(elt);
    }

    window.SummerOfLabVIEW = {
        setUser,
        addNavLink
    };
}());
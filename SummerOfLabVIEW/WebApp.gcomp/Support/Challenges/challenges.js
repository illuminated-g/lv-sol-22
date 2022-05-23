(function() {
    'use strict';

    const buildChallengesList = function(placeholder, challengesJSON, canSubmit) {
        var challenges = JSON.parse(challengesJSON);
        var container = document.createElement("div");
        container.classList.add("chal-list");

        while (placeholder.firstChild) {
            placeholder.removeChild(placeholder.firstChild);
        }

        if (challenges.length == 0) {
            var msg = document.createElement("div");
            msg.innerHTML = "<i>No challenges have begun yet.</i>";
            placeholder.appendChild(msg);
        }

        challenges.forEach(challenge => {
            var elt;
            var chal = document.createElement("div");
            chal.classList.add("chal-item");

            // Name
            elt = document.createElement("div");
            elt.classList.add("chal-name");
            elt.innerText = challenge.name;
            chal.appendChild(elt);

            // Download link
            elt = document.createElement("div");
            elt.classList.add("chal-download");
            if (challenge.download == "") {
                elt.innerText = "Download not available yet";
            } else {
                elt.innerHTML = '<a href="' + challenge.download + '">Download</a>';
            }
            chal.appendChild(elt);

            //submit
            if (canSubmit) {
                elt = document.createElement("span");
                elt.classList.add("chal-submit");
                elt.innerHTML = '<a href="/submit.html?id=' + challenge.id + '">Submit</a>';
                chal.appendChild(elt);
            }

            // Description
            //elt = document.createElement("div");
            //elt.classList.add("chal-label");
            //elt.innerText = "Description";
            //chal.appendChild(elt);

            elt = document.createElement("div");
            elt.classList.add("chal-desc");
            elt.innerHTML = challenge.description;
            chal.appendChild(elt);

            // Instructions
            elt = document.createElement("div");
            elt.classList.add("chal-label");
            elt.innerText = "Instructions";
            chal.appendChild(elt);

            elt = document.createElement("div");
            elt.classList.add("chal-inst");
            elt.innerHTML = challenge.instructions;
            chal.appendChild(elt);

            container.appendChild(chal);
        });

        placeholder.appendChild(container);
    };

    //Export functions exposed for JSLI
    window.Challenges = {
        buildChallengesList
    };
}());
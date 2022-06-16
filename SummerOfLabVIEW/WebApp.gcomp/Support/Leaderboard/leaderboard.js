(function() {
    'use strict';

    const buildLeaderboard = function (placeholder, leaderboardJSON) {

        let leaderboard = JSON.parse(leaderboardJSON);

        while (placeholder.firstChild) {
            placeholder.removeChild(placeholder.firstChild);
        }

        let elt = document.createElement("div");
        elt.classList.add("leaderboard-label");
        elt.innerText = leaderboard.name + " leaderboard:";
        placeholder.appendChild(elt);

        let outer = document.createElement("div");
        outer.classList.add('leaderboard-outer');
        placeholder.appendChild(outer);

        let inner = document.createElement("div");
        inner.classList.add('leaderboard-inner');
        outer.appendChild(inner);
        
        let table = document.createElement("table");
        inner.appendChild(table);

        let num = 0;
        leaderboard.top_subs.forEach(sub => {
            let tr = document.createElement("tr");
            table.appendChild(tr);

            let td = document.createElement("td");
            td.innerText = "#" + ++num;
            tr.appendChild(td);

            td = document.createElement("td");
            td.innerText = sub.first_name + " " + sub.last_name + " - " + sub.department;
            tr.appendChild(td);

            td = document.createElement("td");
            td.innerText = "Score: " + sub.score.Overall;
            tr.appendChild(td);
        });
    };

    window.Leaderboard = {
        buildLeaderboard
    };
}());
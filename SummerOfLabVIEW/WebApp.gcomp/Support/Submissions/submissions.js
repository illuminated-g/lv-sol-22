(function() {
    'use strict';

    const show = function(placeholder, submissionsJSON) {

        var submissions = JSON.parse(submissionsJSON);

        if (submissions.length == 0) {
            placeholder.innerText = "No entries submitted yet for this challenge."
        } else {
            while (placeholder.firstChild) {
                placeholder.removeChild(placeholder.firstChild);
            }
            
            var subs = document.createElement('div');
            subs.classList.add('sol-subs');

            var table = document.createElement('table');
            var tr = document.createElement('tr');
            
            var th = document.createElement('th');
            th.innerText = "ID";
            tr.append(th);

            th = document.createElement('th');
            th.innerText = 'Submitted';
            tr.append(th);

            th = document.createElement('th');
            th.innerText = 'Run';
            tr.append(th);

            th = document.createElement('th');
            th.innerText = 'Score';
            tr.append(th);

            th = document.createElement('th');
            th.innerText = 'Info';
            tr.append(th);

            table.append(tr);

            for (var i = 0; i < submissions.length; ++i) {
                tr = document.createElement('tr');

                var td = document.createElement('td');
                td.innerText = submissions[i].ID;
                tr.append(td);

                td = document.createElement('td');
                td.innerText = submissions[i].Submitted;
                tr.append(td);

                if (submissions[i].Tested) {
                    td = document.createElement('td');
                    td.innerText = submissions[i].Test_Timestamp;
                    tr.append(td);

                    td = document.createElement('td');
                    td.innerText = submissions[i].Score.Overall;
                    tr.append(td);

                    td = document.createElement('td');
                    td.innerText = submissions[i].Test_Summary;
                    tr.append(td);
                } else {
                    td = document.createElement('td');
                    td.colSpan = 3;
                    td.innerText = 'Not run yet.';
                    tr.append(td);
                }
                table.append(tr);
            }

            subs.append(table);
            placeholder.append(subs);
        }
    }

    window.Submissions = {
        show
    };
}());
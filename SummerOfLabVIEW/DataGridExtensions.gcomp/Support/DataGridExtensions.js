(function () {
    'use strict';

    const getByLabel = function(label) {
        let labelElts = document.querySelectorAll("ni-label");
        let ctrlId = -1;

        for (let i = 0; i < labelElts.length; ++i) {
            if (labelElts[i].firstChild.innerText == label) {
                ctrlId = parseInt(labelElts[i].getAttribute("ni-control-id"));
                break;
            }
        }

        let datagrid = document.querySelector('ni-data-grid[label-id="'+ctrlId+'"]');
        console.log(datagrid);
        return datagrid;
    }

    const activateColumn = function (datagrid, index) {
        let column = datagrid.children[index];
        column.children[0].removeAttribute('readonly');
    }

    window.GWebDataGrid = {
        activateColumn,
        getByLabel
    };
}());
"use strict";
const inputFile = document.getElementById('csv-file');
const tableContainer = document.querySelector('#table-container');
function handleFileSelect(event) {
    var _a;
    const input = event.target;
    const errorMessage = document.getElementById('errorMessage');
    if (!((_a = input.files) === null || _a === void 0 ? void 0 : _a.length)) {
        return;
    }
    const file = input.files[0];
    if (file.type !== 'text/csv') {
        if (errorMessage) {
            errorMessage.textContent = 'Please upload a valid CSV file.';
        }
        return;
    }
    else if (errorMessage) {
        errorMessage.textContent = '';
    }
    const reader = new FileReader();
    reader.onload = function (e) {
        var _a;
        const csvText = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
        // Mostrar el contenido del CSV tal cual
        console.log(csvText);
        const table = document.createElement('table');
        table.id = 'csv-table';
        table.classList.add('table', 'table-striped');
        tableContainer === null || tableContainer === void 0 ? void 0 : tableContainer.appendChild(table);
        createTable(csvText);
    };
    reader.readAsText(file);
}
function createTable(data) {
    const table = document.getElementById('csv-table');
    const rows = data.split('\n').map(row => row.split(','));
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const headerRow = rows[0];
    const trHead = document.createElement('tr');
    headerRow.forEach(cell => {
        const th = document.createElement('th');
        th.textContent = cell;
        trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    rows.slice(1).forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(thead);
    table.appendChild(tbody);
}
inputFile.addEventListener('change', handleFileSelect);

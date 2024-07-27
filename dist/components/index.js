"use strict";
const inputFile = document.getElementById('csv-file');
const tableContainer = document.querySelector('#table-container');
const paginationContainer = document.querySelector('#pagination');
const recordsPerPage = 15;
let currentPage = 1;
let csvData = '';
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
        tableContainer.appendChild(table);
        createTable(csvText);
        pagination(csvText);
    };
    reader.readAsText(file);
}
function createTable(data) {
    const table = document.getElementById('csv-table');
    table.innerHTML = '';
    const rows = data.split('\n').map(row => row.split(','));
    const start = (currentPage - 1) * recordsPerPage + 1;
    const end = Math.min(start + recordsPerPage - 1, rows.length - 1);
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
    // usando for 
    // for (let i = start; i <= end; i++){
    //     const row = rows[i];
    //     const tr = document.createElement('tr') as HTMLTableRowElement;
    //     row.forEach(cell => {
    //         const td = document.createElement('td') as HTMLTableCellElement;
    //         td.textContent = cell;
    //         tr.appendChild(td);
    //     });
    //     tbody.appendChild(tr);
    // }
    //usando foreach
    const arrayAsc = [];
    rows.slice(start, end + 1).forEach(row => {
        const tr = document.createElement('tr');
        arrayAsc.push(row[4]);
        row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    console.log(arrayAsc.reverse());
    table.appendChild(thead);
    table.appendChild(tbody);
}
function pagination(data) {
    const previousButton = document.querySelector("#previous");
    const nextButton = document.querySelector("#next");
    previousButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            console.log(currentPage);
            createTable(data);
        }
    });
    nextButton.addEventListener('click', () => {
        const maxPage = Math.ceil(data.split('\n').length / recordsPerPage);
        if (currentPage < maxPage) {
            currentPage++;
            console.log(currentPage);
            createTable(data);
        }
    });
}
inputFile.addEventListener('change', handleFileSelect);

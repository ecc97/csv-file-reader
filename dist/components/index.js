"use strict";
const inputFile = document.getElementById('csv-file');
const tableContainer = document.querySelector('#table-container');
const paginationContainer = document.querySelector('#pagination');
const previousButton = document.querySelector("#previous");
const nextButton = document.querySelector("#next");
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
        csvData = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result; // Guardar datos CSV
        console.log(csvData);
        const table = document.createElement('table');
        table.id = 'csv-table';
        table.classList.add('table', 'table-striped');
        tableContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar la nueva tabla
        tableContainer.appendChild(table);
        createTable(csvData);
        pagination(csvData); // Llamar a la función de paginación
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
    rows.slice(start, end + 1).forEach(row => {
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
    updatePaginationButtons();
}
function pagination(data) {
    previousButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            createTable(data);
        }
    });
    nextButton.addEventListener('click', () => {
        const maxPage = Math.ceil(data.split('\n').length / recordsPerPage);
        if (currentPage < maxPage) {
            currentPage++;
            createTable(data);
        }
    });
    updatePaginationButtons();
}
function updatePaginationButtons() {
    previousButton.disabled = currentPage === 1;
    const maxPage = Math.ceil(csvData.split('\n').length / recordsPerPage);
    nextButton.disabled = currentPage >= maxPage;
}
inputFile.addEventListener('change', handleFileSelect);

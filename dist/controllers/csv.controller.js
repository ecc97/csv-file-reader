import { updatePaginationButtons } from '../components/paginationButtons.js';
import { validateDatasetCVS } from '../components/validateDataset.js';
const sortColumnSelect = document.getElementById('sortColumn');
const sortOrderSelect = document.getElementById('sortOrder');
export class CSVController {
    constructor(inputFile, searchInput, tableContainer, paginationContainer) {
        this.inputFile = inputFile;
        this.searchInput = searchInput;
        this.tableContainer = tableContainer;
        this.paginationContainer = paginationContainer;
        this.recordsPerPage = 15;
        this.currentPage = 1;
        this.csvData = [];
        this.filteredData = [];
        this.inputFile.addEventListener('change', this.handleFileSelect.bind(this));
        this.searchInput.addEventListener('input', this.handleSearch.bind(this));
        sortColumnSelect.addEventListener('change', this.handleOrder.bind(this));
        sortOrderSelect.addEventListener('change', this.handleOrder.bind(this));
    }
    handleFileSelect(event) {
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
        reader.onload = (e) => {
            var _a;
            const csvText = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            const allData = csvText.split('\n').map(row => row.split(','));
            console.log('CSV Data:', allData);
            this.csvData = validateDatasetCVS(allData);
            this.filteredData = this.csvData;
            if (this.csvData.length === 0) {
                if (errorMessage) {
                    errorMessage.textContent = 'El archivo CSV no tiene la estructura esperada.';
                }
                return;
            }
            console.log('Filtrado CSV Data:', this.csvData);
            console.log(csvText);
            this.tableContainer.innerHTML = '';
            const table = document.createElement('table');
            table.id = 'csv-table';
            table.classList.add('table', 'table-striped');
            this.tableContainer.appendChild(table);
            this.createTable();
        };
        reader.readAsText(file);
    }
    handleSearch(e) {
        const errorMessageSearch = document.getElementById('errorMessageSearch');
        const query = e.target.value.toLowerCase();
        this.filteredData = this.csvData.filter(row => row.some(cell => cell.toLowerCase().includes(query)));
        if (this.filteredData.length !== 0) {
            this.currentPage = 1; // Resetear a la primera página después de la búsqueda
            errorMessageSearch.style.display = 'none';
        }
        else {
            errorMessageSearch.textContent = 'No se encontraron resultados.';
            errorMessageSearch.style.display = 'block';
        }
        this.createTable();
    }
    handleOrder() {
        const columnSelect = document.getElementById('sortColumn');
        const orderSelect = document.getElementById('sortOrder');
        const columnIndex = parseInt(columnSelect.value);
        const sortOrder = orderSelect.value;
        const sortedData = [...this.filteredData];
        sortedData.sort((a, b) => {
            const aValue = a[columnIndex];
            const bValue = b[columnIndex];
            if (aValue < bValue) {
                return sortOrder === 'asc' ? -1 : 1;
            }
            else if (aValue > bValue) {
                return sortOrder === 'asc' ? 1 : -1;
            }
            else {
                return 0;
            }
        });
        this.filteredData = sortedData;
        this.createTable();
    }
    createTable() {
        const table = document.getElementById('csv-table');
        table.innerHTML = '';
        const rows = this.filteredData;
        const start = (this.currentPage - 1) * this.recordsPerPage + 1;
        const end = Math.min(start + this.recordsPerPage - 1, rows.length - 1);
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
        updatePaginationButtons(this.currentPage, this.csvData.length, this.recordsPerPage);
    }
    initPagination() {
        const previousButton = document.querySelector("#previous");
        const nextButton = document.querySelector("#next");
        previousButton.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                console.log(this.currentPage);
                this.createTable();
            }
        });
        nextButton.addEventListener('click', () => {
            const maxPage = Math.ceil(this.csvData.length / this.recordsPerPage);
            if (this.currentPage < maxPage) {
                this.currentPage++;
                console.log(this.currentPage);
                this.createTable();
            }
        });
        updatePaginationButtons(this.currentPage, this.csvData.length, this.recordsPerPage);
    }
}

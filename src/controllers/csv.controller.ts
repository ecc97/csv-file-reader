import { CSVData } from '../models/csv.model.js';
import { updatePaginationButtons } from '../components/paginationButtons.js';
import { validateDatasetCVS } from '../components/validateDataset.js';

export class CSVController {
    private recordsPerPage: number = 15;
    private currentPage: number = 1;
    private csvData: CSVData = [];
    private filteredData: CSVData = [];

    constructor(private inputFile: HTMLInputElement, public searchInput: HTMLInputElement, private tableContainer: HTMLDivElement, public paginationContainer: HTMLDivElement) {
        this.inputFile.addEventListener('change', this.handleFileSelect.bind(this));
        this.searchInput.addEventListener('input', this.handleSearch.bind(this));
    }

    private handleFileSelect(event: Event): void {
        const input = event.target as HTMLInputElement;
        const errorMessage = document.getElementById('errorMessage') as HTMLParagraphElement;

        if (!input.files?.length) {
            return;
        }

        const file = input.files[0];
        if (file.type !== 'text/csv') {
            if (errorMessage) {
                errorMessage.textContent = 'Please upload a valid CSV file.';
            }
            return;
        } else if (errorMessage) {
            errorMessage.textContent = '';
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            const csvText = e.target?.result as string;
            const allData = csvText.split('\n').map(row => row.split(','));

             console.log('CSV Data:', allData);

            this.csvData = validateDatasetCVS(allData)
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

            const table = document.createElement('table') as HTMLTableElement;
            table.id = 'csv-table';
            table.classList.add('table', 'table-striped');
            this.tableContainer.appendChild(table);

            this.createTable();
        };

        reader.readAsText(file);
    }

    private handleSearch(e: Event): void {
        const errorMessageSearch = document.getElementById('errorMessageSearch') as HTMLDivElement;
        const query = (e.target as HTMLInputElement).value.toLowerCase();
        this.filteredData = this.csvData.filter(row => row.some(cell => cell.toLowerCase().includes(query)));
        if(this.filteredData.length !== 0){
            this.currentPage = 1; // Resetear a la primera página después de la búsqueda
            errorMessageSearch.style.display = 'none'
        } else {
            errorMessageSearch.textContent = 'No se encontraron resultados.';
            errorMessageSearch.style.display = 'block';
        }
        this.createTable();
    }
    
    public createTable(): void {
        const table = document.getElementById('csv-table') as HTMLTableElement;
        table.innerHTML = '';

        const rows = this.filteredData;

        const start = (this.currentPage - 1) * this.recordsPerPage + 1;
        const end = Math.min(start + this.recordsPerPage - 1, rows.length - 1);

        const thead = document.createElement('thead') as HTMLTableSectionElement;
        const tbody = document.createElement('tbody') as HTMLTableSectionElement;

        const headerRow: string[] = rows[0];
        const trHead = document.createElement('tr') as HTMLTableRowElement;
        headerRow.forEach(cell => {
            const th = document.createElement('th') as HTMLTableCellElement;
            th.textContent = cell;
            trHead.appendChild(th);
        });
        thead.appendChild(trHead);

        rows.slice(start, end + 1).forEach(row => {
            const tr = document.createElement('tr') as HTMLTableRowElement;

            row.forEach(cell => {
                const td = document.createElement('td') as HTMLTableCellElement;
                td.textContent = cell;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });

        table.appendChild(thead);
        table.appendChild(tbody);

        updatePaginationButtons(this.currentPage, this.csvData.length, this.recordsPerPage);
    }

    public initPagination(): void {
        const previousButton = document.querySelector("#previous") as HTMLButtonElement;
        const nextButton = document.querySelector("#next") as HTMLButtonElement;

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

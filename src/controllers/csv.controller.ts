import { CSVData } from '../models/csv.model.js';
import { updatePaginationButtons } from '../components/paginationButtons.js';

export class CSVController {
    private recordsPerPage: number = 15;
    private currentPage: number = 1;
    private csvData: CSVData = [];

    constructor(private inputFile: HTMLInputElement, private tableContainer: HTMLDivElement, private paginationContainer: HTMLDivElement) {
        this.inputFile.addEventListener('change', this.handleFileSelect.bind(this));
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
            this.csvData = csvText.split('\n').map(row => row.split(','));

            console.log(csvText);

            this.tableContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar la nueva tabla

            const table = document.createElement('table') as HTMLTableElement;
            table.id = 'csv-table';
            table.classList.add('table', 'table-striped');
            this.tableContainer.appendChild(table);

            this.createTable();
        };

        reader.readAsText(file);
    }

    public createTable(): void {
        const table = document.getElementById('csv-table') as HTMLTableElement;
        table.innerHTML = '';

        const rows = this.csvData;

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

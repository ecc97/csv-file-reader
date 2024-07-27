const inputFile = document.getElementById('csv-file') as HTMLInputElement;
const tableContainer = document.querySelector('#table-container') as HTMLDivElement;
const paginationContainer = document.querySelector('#pagination') as HTMLDivElement;

const previousButton = document.querySelector("#previous") as HTMLButtonElement;
const nextButton = document.querySelector("#next") as HTMLButtonElement;

const recordsPerPage = 15;
let currentPage = 1;
let csvData: string = '';

function handleFileSelect(event: Event) {
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

    reader.onload = function(e) {
        csvData = e.target?.result as string; // Guardar datos CSV

        console.log(csvData);

        const table = document.createElement('table') as HTMLTableElement;
        table.id = 'csv-table';
        table.classList.add('table', 'table-striped');
        tableContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar la nueva tabla
        tableContainer.appendChild(table);

        createTable(csvData);
        pagination(csvData); // Llamar a la función de paginación
    };

    reader.readAsText(file);
}

function createTable(data: string) {
    const table = document.getElementById('csv-table') as HTMLTableElement;
    table.innerHTML = '';

    const rows: string[][] = data.split('\n').map(row => row.split(','));

    const start = (currentPage - 1) * recordsPerPage + 1;
    const end = Math.min(start + recordsPerPage - 1, rows.length - 1);

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

    updatePaginationButtons(); 
}

function pagination(data: string) {
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

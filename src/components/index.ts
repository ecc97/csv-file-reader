const inputFile = document.getElementById('csv-file') as HTMLInputElement;
const tableContainer = document.querySelector('#table-container') as HTMLDivElement;

function handleFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    const errorMessage = document.getElementById('errorMessage');

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
        const csvText = e.target?.result as string;

        // Mostrar el contenido del CSV tal cual
        console.log(csvText);

        const table = document.createElement('table');
        table.id = 'csv-table';
        table.classList.add('table', 'table-striped')
        tableContainer?.appendChild(table);

        createTable(csvText);
    };

    reader.readAsText(file);
}

function createTable(data: string) {
    const table = document.getElementById('csv-table') as HTMLTableElement;

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


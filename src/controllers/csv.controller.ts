// Importa las dependencias necesarias
import { CSVData } from '../models/csv.model.js';
import { updatePaginationButtons } from '../components/paginationButtons.js';
import { validateDatasetCVS } from '../components/validateDataset.js';

// Selecciona los elementos del DOM para ordenar las columnas
const sortColumnSelect = document.getElementById('sortColumn') as HTMLSelectElement;
const sortOrderSelect = document.getElementById('sortOrder') as HTMLSelectElement;

// Define la clase CSVController
export class CSVController {
    private recordsPerPage: number = 15; // Número de registros por página
    private currentPage: number = 1; // Página actual
    private csvData: CSVData = []; // Datos del CSV completos
    private filteredData: CSVData = []; // Datos del CSV filtrados

    // Constructor que recibe los elementos necesarios del DOM y establece los manejadores de eventos
    constructor(private inputFile: HTMLInputElement, public searchInput: HTMLInputElement, private tableContainer: HTMLDivElement, public paginationContainer: HTMLDivElement) {
        this.inputFile.addEventListener('change', this.handleFileSelect.bind(this)); // Maneja la selección de archivo
        this.searchInput.addEventListener('input', this.handleSearch.bind(this)); // Maneja la entrada de búsqueda

        // .bind(this) es esencial para asegurarse de que el contexto (this) dentro de una función manejadora de eventos es el esperado, en este caso, la instancia de la clase CSVController, permitiendo el acceso a sus propiedades y métodos
        sortColumnSelect.addEventListener('change', this.handleOrder.bind(this)); // Maneja el cambio de orden de columna
        sortOrderSelect.addEventListener('change', this.handleOrder.bind(this)); // Maneja el cambio de orden ascendente/descendente 
    }

    // Método para manejar la selección de archivos
    private handleFileSelect(event: Event): void {
        const input = event.target as HTMLInputElement; // Obtiene el input del archivo del evento
        const errorMessage = document.getElementById('errorMessage') as HTMLParagraphElement; // Obtiene el elemento del DOM que muestra mensajes de error

        // Verifica si hay archivos seleccionados
        if (!input.files?.length) {
            return; // Si no hay archivos, sale de la función
        }

        // Toma el primer archivo seleccionado
        const file = input.files[0];

        // Verifica si el archivo es de tipo CSV
        if (file.type !== 'text/csv') {
            if (errorMessage) { // Si no es un archivo CSV, muestra un mensaje de error
                errorMessage.textContent = 'Please upload a valid CSV file.';
            }
            return;// Sale de la función
        } else if (errorMessage) {
            errorMessage.textContent = ''; // Si no hay error en el tipo de archivo, limpia cualquier mensaje de error previo
        }

        // Crea un nuevo lector de archivos
        const reader = new FileReader();

        // Define la función de carga del archivo
        reader.onload = (e) => {
            const csvText = e.target?.result as string; // Obtiene el contenido del archivo como texto
            const allData: string[][] = csvText.split('\n').map(row => row.split(',')); // Divide el texto del CSV en líneas y luego en celdas

            //  console.log('CSV Data:', allData);

            // Valida y almacena los datos del CSV
            this.csvData = validateDatasetCVS(allData)
            // Inicializa los datos filtrados con todos los datos
            this.filteredData = this.csvData;

            // Verifica si el dataset validado está vacío. Si es así, muestra un mensaje de error
            // indicando que el archivo CSV no tiene la estructura esperada y termina la función.
            if (this.csvData.length === 0) {
                if (errorMessage) {
                    errorMessage.textContent = 'El archivo CSV no tiene la estructura esperada.';
                }
                return; // Sale de la función
            }
            // console.log('Filtrado CSV Data:', this.csvData);
            // console.log(csvText);
            
            this.tableContainer.innerHTML = ''; // Limpia el contenedor de la tabla

            const table = document.createElement('table') as HTMLTableElement; // Crea una nueva tabla HTML
            table.id = 'csv-table'; // Establece el id de la tabla
            table.classList.add('table', 'table-striped'); // Añade clases CSS a la tabla
            // Añade la tabla al contenedor de la tabla
            this.tableContainer.appendChild(table);

            // Llama al método createTable para crear la tabla con los datos del CSV
            this.createTable();
        };

        reader.readAsText(file); // Lee el archivo como texto
    }

    // Método para manejar la búsqueda
    private handleSearch(e: Event): void {
        const errorMessageSearch = document.getElementById('errorMessageSearch') as HTMLDivElement; // Obtiene el elemento del DOM que muestra mensajes de error relacionados con la búsqueda
        const query = (e.target as HTMLInputElement).value.toLowerCase(); // Obtiene el valor del input de búsqueda y lo convierte a minúsculas para facilitar la comparación
        this.filteredData = this.csvData.filter(row => row.some(cell => cell.toLowerCase().includes(query))); // Filtra los datos del CSV. Para cada fila, verifica si al menos una celda contiene la consulta de búsqueda
        
        // Si hay datos filtrados que coinciden con la búsqueda
        if(this.filteredData.length !== 0){
            this.currentPage = 1; // Resetear la página actual a la primera página después de la búsqueda
            errorMessageSearch.style.display = 'none'
        } else {
            errorMessageSearch.textContent = 'No se encontraron resultados.'; // Si no se encuentran resultados, muestra un mensaje de error
            errorMessageSearch.style.display = 'block';
        }

        this.createTable(); // Llama al método createTable para actualizar la tabla con los datos filtrados
    }

    // Método para manejar el ordenamiento
    public handleOrder(): void {
        const columnSelect = document.getElementById('sortColumn') as HTMLSelectElement; // Obtiene la referencia del elemento de selección de columna para ordenamiento
        const orderSelect = document.getElementById('sortOrder') as HTMLSelectElement; // Obtiene la referencia del elemento de selección de orden (ascendente o descendente)

        const columnIndex = parseInt(columnSelect.value); // Convierte el valor seleccionado de la columna a un número entero (índice de la columna)
        const sortOrder = orderSelect.value; // Obtiene el valor del orden seleccionado (ascendente o descendente)

        // Crea una copia de los datos filtrados con spread operator para no modificar el array original directamente
        const sortedData = [...this.filteredData]; 

        // Ordena los datos copiados usando el índice de la columna seleccionada y el orden seleccionado
        sortedData.sort((a, b) => {
            const aValue = a[columnIndex]; // Obtiene el valor de la columna seleccionada para la fila 'a'
            const bValue = b[columnIndex]; // Obtiene el valor de la columna seleccionada para la fila 'b'

            // Compara los valores de las columnas seleccionadas de 'a' y 'b'
            if (aValue < bValue) {
                return sortOrder === 'asc' ? -1 : 1;  // Si el valor de 'a' es menor que el de 'b', retorna -1 si el orden es ascendente, de lo contrario retorna 1
            } else if (aValue > bValue) {
                return sortOrder === 'asc' ? 1 : -1; // Si el valor de 'a' es mayor que el de 'b', retorna 1 si el orden es ascendente, de lo contrario retorna -1
            } else {
                return 0; // Si los valores son iguales, retorna 0 (no cambia el orden relativo de 'a' y 'b')
            }
        });

        this.filteredData = sortedData; // Asigna los datos ordenados al array filtrado
        this.createTable(); // Llama a la función createTable para actualizar la tabla en la interfaz con los datos ordenados
    }

    // Método para crear la tabla con los datos
    public createTable(): void {
        // Obtiene el elemento de la tabla en el DOM y lo limpia.
        const table = document.getElementById('csv-table') as HTMLTableElement;
        table.innerHTML = '';

        const rows = this.filteredData; // Obtiene las filas filtradas del CSV.

        // Calcula el índice de inicio y fin para las filas que se mostrarán en la página actual.
        const start = (this.currentPage - 1) * this.recordsPerPage + 1;
        const end = Math.min(start + this.recordsPerPage - 1, rows.length - 1);

        // Crea los elementos <thead> y <tbody> para la tabla.
        const thead = document.createElement('thead') as HTMLTableSectionElement;
        const tbody = document.createElement('tbody') as HTMLTableSectionElement;

        // Toma la primera fila como los encabezados de la tabla.
        const headerRow: string[] = rows[0];
        const trHead = document.createElement('tr') as HTMLTableRowElement;
        // Crea y agrega las celdas del encabezado a la fila del encabezado.
        headerRow.forEach(cell => {
            const th = document.createElement('th') as HTMLTableCellElement;
            th.textContent = cell; // Asigna el texto de la celda del encabezado.
            trHead.appendChild(th); // Añade la celda del encabezado a la fila del encabezado.
        });
        thead.appendChild(trHead); // Añade la fila del encabezado a <thead>.

        // Itera sobre las filas desde el índice de inicio hasta el índice de fin.
        rows.slice(start, end + 1).forEach(row => {
            const tr = document.createElement('tr') as HTMLTableRowElement; // Crea una nueva fila
            // Itera sobre las celdas en la fila actual.
            row.forEach(cell => {
                const td = document.createElement('td') as HTMLTableCellElement;
                td.textContent = cell; // Asigna el texto de la celda
                tr.appendChild(td);// Añade la celda a la fila
            });
            tbody.appendChild(tr); // Añade la fila a <tbody>
        });

        // Añade <thead> y <tbody> a la tabla.
        table.appendChild(thead);
        table.appendChild(tbody);

        // Actualiza los botones de paginación según la página actual y el número total de registros.
        updatePaginationButtons(this.currentPage, this.csvData.length, this.recordsPerPage);
    }

    // Método para inicializar la paginación
    public initPagination(): void {
        const previousButton = document.querySelector("#previous") as HTMLButtonElement; // Selecciona el botón de "Anterior" en el DOM y lo tipa como HTMLButtonElement
        const nextButton = document.querySelector("#next") as HTMLButtonElement; // Selecciona el botón de "Siguiente" en el DOM y lo tipa como HTMLButtonElement

        // Agrega un event listener al botón de "Anterior" para manejar los clics
        previousButton.addEventListener('click', () => {
            // Verifica si la página actual es mayor que 1 (para no ir a una página negativa)
            if (this.currentPage > 1) {
                this.currentPage--; // Disminuye el número de la página actual
                // console.log(this.currentPage);
                this.createTable(); // Llama al método createTable para actualizar la tabla con la nueva página
            }
        });

        // Agrega un event listener al botón de "Siguiente" para manejar los clics
        nextButton.addEventListener('click', () => {
            const maxPage = Math.ceil(this.csvData.length / this.recordsPerPage); // Calcula el número máximo de páginas dividiendo el número total de registros entre los registros por página
            // Verifica si la página actual es menor que el número máximo de páginas
            if (this.currentPage < maxPage) {
                this.currentPage++; // Incrementa el número de la página actual
                // console.log(this.currentPage);
                this.createTable(); // Llama al método createTable para actualizar la tabla con la nueva página
            }
        });
        // Actualiza los botones de paginación al inicio, estableciendo el estado inicial de los botones
        updatePaginationButtons(this.currentPage, this.csvData.length, this.recordsPerPage);
    }
}

import { CSVController } from "../controllers/csv.controller.js"; // Importa el controlador CSVController desde la ubicación especificada

const inputFile = document.getElementById('csv-file') as HTMLInputElement; // Selecciona el elemento de entrada de archivo CSV del DOM y lo asigna a la constante 'inputFile'
const searchInput = document.getElementById('searchInput') as HTMLInputElement; // Selecciona el elemento de entrada de búsqueda del DOM y lo asigna a la constante 'searchInput'
const tableContainer = document.querySelector('#table-container') as HTMLDivElement; // Selecciona el contenedor de la tabla del DOM y lo asigna a la constante 'tableContainer'
const paginationContainer = document.querySelector('#pagination') as HTMLDivElement; // Selecciona el contenedor de paginación del DOM y lo asigna a la constante 'paginationContainer'

const csvController = new CSVController(inputFile, searchInput, tableContainer, paginationContainer); // Crea una instancia de CSVController pasando los elementos seleccionados como parámetros

csvController.initPagination();

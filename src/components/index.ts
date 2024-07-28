import { CSVController } from "../controllers/csv.controller.js";

const inputFile = document.getElementById('csv-file') as HTMLInputElement;
const searchInput = document.getElementById('searchInput') as HTMLInputElement;
const tableContainer = document.querySelector('#table-container') as HTMLDivElement;
const paginationContainer = document.querySelector('#pagination') as HTMLDivElement;

const csvController = new CSVController(inputFile, searchInput, tableContainer, paginationContainer);

csvController.initPagination();

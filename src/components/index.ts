import { CSVController } from "../controllers/csv.controller.js";

const inputFile = document.getElementById('csv-file') as HTMLInputElement;
const tableContainer = document.querySelector('#table-container') as HTMLDivElement;
const paginationContainer = document.querySelector('#pagination') as HTMLDivElement;

const csvController = new CSVController(inputFile, tableContainer, paginationContainer);

csvController.initPagination();

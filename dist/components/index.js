import { CSVController } from "../controllers/csv.controller.js";
const inputFile = document.getElementById('csv-file');
const tableContainer = document.querySelector('#table-container');
const paginationContainer = document.querySelector('#pagination');
const csvController = new CSVController(inputFile, tableContainer, paginationContainer);
csvController.initPagination();

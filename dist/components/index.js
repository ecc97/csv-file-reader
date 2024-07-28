import { CSVController } from "../controllers/csv.controller.js";
const inputFile = document.getElementById('csv-file');
const searchInput = document.getElementById('searchInput');
const tableContainer = document.querySelector('#table-container');
const paginationContainer = document.querySelector('#pagination');
const csvController = new CSVController(inputFile, searchInput, tableContainer, paginationContainer);
csvController.initPagination();

import { CSVData } from "../models/csv.model.js";

const totalColumns: number = 5; // Número total esperado de columnas en cada fila del dataset CSV

// Función para validar y filtrar el dataset CSV
export function validateDatasetCVS(data: CSVData): CSVData { 
    // Filtra las filas del dataset para incluir solo aquellas que tengan el número correcto de columnas
    return data.filter(row => row.length === totalColumns);
}
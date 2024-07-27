import { CSVData } from "../models/csv.model.js";

const totalColumns: number = 5;
export function validateDatasetCVS(data: CSVData): CSVData {
    return data.filter(row => row.length === totalColumns);
}
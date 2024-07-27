const totalColumns = 5;
export function validateDatasetCVS(data) {
    return data.filter(row => row.length === totalColumns);
}

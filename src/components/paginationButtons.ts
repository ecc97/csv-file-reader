// Función para actualizar el estado de los botones de paginación
export function updatePaginationButtons(currentPage: number, totalRecords: number, recordsPerPage: number): void {
    const previousButton = document.querySelector("#previous") as HTMLButtonElement; // Selecciona el botón de "Anterior" del DOM
    const nextButton = document.querySelector("#next") as HTMLButtonElement; // Selecciona el botón de "Siguiente" del DOM

    previousButton.disabled = currentPage === 1; // Desactiva el botón de "Anterior" si estamos en la primera página
    const maxPage = Math.ceil(totalRecords / recordsPerPage);  // Calcula el número máximo de páginas basado en el total de registros y los registros por página
    nextButton.disabled = currentPage >= maxPage; // Desactiva el botón de "Siguiente" si estamos en la última página
}
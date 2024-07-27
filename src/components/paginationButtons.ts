export function updatePaginationButtons(currentPage: number, totalRecords: number, recordsPerPage: number): void {
    const previousButton = document.querySelector("#previous") as HTMLButtonElement;
    const nextButton = document.querySelector("#next") as HTMLButtonElement;

    previousButton.disabled = currentPage === 1;
    const maxPage = Math.ceil(totalRecords / recordsPerPage);
    nextButton.disabled = currentPage >= maxPage;
}
export function updatePaginationButtons(currentPage, totalRecords, recordsPerPage) {
    const previousButton = document.querySelector("#previous");
    const nextButton = document.querySelector("#next");
    previousButton.disabled = currentPage === 1;
    const maxPage = Math.ceil(totalRecords / recordsPerPage);
    nextButton.disabled = currentPage >= maxPage;
}

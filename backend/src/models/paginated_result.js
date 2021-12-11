class PaginatedResult {
    constructor(page, itemsPerPage, totalItems, results) {
        this.page = page;
        this.itemsPerPage = itemsPerPage;
        this.totalItems = totalItems;
        this.results = results;
        this.totalPages = (Math.ceil(totalItems / itemsPerPage));
    }

    get lastPage() {
        return this.totalPages - 1;
    }
}

module.exports = PaginatedResult;
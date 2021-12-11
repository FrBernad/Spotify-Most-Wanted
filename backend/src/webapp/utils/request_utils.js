function getOrDefault(value, def) {
    return value !== undefined ? value : def;
}

function addPaginationHeaders(res, baseUri, searchParams, results){
    const page = results.page;
    const itemsPerPage = results.itemsPerPage;

    const first = 0;
    const last = results.lastPage;
    const prev = page - 1;
    const next = page + 1;

    const links = {};

    const firstLink = new URLSearchParams(searchParams);
    firstLink.append("page", first);
    firstLink.append("itemsPerPage", itemsPerPage);
    links.first = `${baseUri}?${firstLink}`;

    const lastLink = new URLSearchParams(searchParams);
    lastLink.append("page", last);
    lastLink.append("itemsPerPage", itemsPerPage);
    links.last = `${baseUri}?${lastLink}`;

    if (page != first) {
        const prevLink = new URLSearchParams(searchParams);
        prevLink.append("page", prev)
        prevLink.append("itemsPerPage", itemsPerPage);
        links.prev = `${baseUri}?${prevLink}`;
    }

    if (page != last) {
        const nextLink = new URLSearchParams(searchParams);
        nextLink.append("page", next)
        nextLink.append("itemsPerPage", itemsPerPage);
        links.next = `${baseUri}?${nextLink}`;
    }

    res.links(links);
}

function createPaginationResponse(req, res, searchParams, results){

    if (results.results.length === 0) {
        res.status(204).end();
        return;
    }

    const baseUri = getRequestUri(req);

    addPaginationHeaders(res, baseUri, searchParams, results)

    res.send(results.results);
}

function getRequestUri(req){
    return `${req.protocol}://${req.headers.host}${req.baseUrl}${req.path}`;
}

module.exports = { getOrDefault, addPaginationHeaders, getRequestUri, createPaginationResponse };

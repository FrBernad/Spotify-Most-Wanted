const debug = require('debug')('backend:server');
const PaginatedResult = require("@models/paginated_result")

class SearchService {

    constructor() {
        if (!SearchService.instance) {
            this._isInitialized = false;
            SearchService.instance = this;
        }

        return SearchService.instance;
    }

    async _init() {
        this._songsDao = await require("@persistence/daos/song_dao")();
        this._artistDao = await require("@persistence/daos/artist_dao")();
        this._countriesDao = await require("@persistence/daos/countries_dao")();
    }

    async getMostPopularSongs(artist, country, genre, page, itemsPerPage) {

        page = parseInt(page);
        itemsPerPage = parseInt(itemsPerPage);

        if (isNaN(page) || isNaN(itemsPerPage) || page < 0 || itemsPerPage < 0) {
            debug(`Invalid params artist:${!artist ? "any" : artist} country:${!country ? "any" : country} genre:${!genre ? "any" : genre} (page:${page}, itemsPerPage:${itemsPerPage})`);
            throw new Error("204");
        }

        debug(`Searching most popular songs artist:${!artist ? "any" : artist} country:${!country ? "any" : country} genre:${!genre ? "any" : genre} (page:${page}, itemsPerPage:${itemsPerPage})`);

        const totalItems = await this._songsDao.getMostPopularSongsCount(artist, country, genre);
        const results = await this._songsDao.getMostPopularSongs(artist, country, genre, page, itemsPerPage);

        if (!results) {
            throw new Error("500");
        }

        return new PaginatedResult(page, itemsPerPage, totalItems, results);
    }

    async getMostPopularArtists(country, genre, page, itemsPerPage) {

        page = parseInt(page);
        itemsPerPage = parseInt(itemsPerPage);

        if (isNaN(page) || isNaN(itemsPerPage) || page < 0 || itemsPerPage < 0) {
            debug(`Invalid params country:${!country ? "any" : country} genre:${!genre ? "any" : genre} (page:${page}, itemsPerPage:${itemsPerPage})`);
            throw new Error("204");
        }

        debug(`Searching most popular songs country:${!country ? "any" : country} genre:${!genre ? "any" : genre} (page:${page}, itemsPerPage:${itemsPerPage})`);

        const totalItems = await this._artistDao.getMostPopularArtistsCount(country, genre);
        const results = await this._artistDao.getMostPopularArtists(country, genre, page, itemsPerPage);

        if (!results) {
            throw new Error("500");
        }

        return new PaginatedResult(page, itemsPerPage, totalItems, results);
    }

    async getAllCountries() {

        debug(`Searching all countries`);

        const results = await this._countriesDao.getCountries();

        if (!results) {
            throw new Error("500");
        }
        return results;
    }

}

const searchService = new SearchService();
module.exports = async () => {
    if (!searchService._isInitialized) {
        searchService._isInitialized = true;
        await searchService._init();
        Object.freeze(searchService);
    }
    return searchService;
};

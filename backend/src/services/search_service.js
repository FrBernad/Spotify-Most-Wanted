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
        this._albumDao = await require("@persistence/daos/album_dao")();
    }

    async getMostPopularSongs(artist, country, genre, page, itemsPerPage) {

        page = parseInt(page);
        itemsPerPage = parseInt(itemsPerPage);

        if (isNaN(page) || isNaN(itemsPerPage) || page < 0 || itemsPerPage < 0) {
            debug(`Invalid params artist:${!artist ? "any" : artist} country:${!country ? "any" : country} genre:${!genre ? "any" : genre} (page:${page}, itemsPerPage:${itemsPerPage})`);
            throw new Error("400");
        }

        debug(`Searching most popular songs artist:${!artist ? "any" : artist} country:${!country ? "any" : country} genre:${!genre ? "any" : genre} (page:${page}, itemsPerPage:${itemsPerPage})`);

        const totalItems = await this._songsDao.getMostPopularSongsCount(artist, country, genre);

        let results = [];

        if (totalItems > 0) {
            results = await this._songsDao.getMostPopularSongs(artist, country, genre, page, itemsPerPage);
        }

        return new PaginatedResult(page, itemsPerPage, totalItems, results);
    }

    async getMostPopularArtists(country, genre, page, itemsPerPage) {

        page = parseInt(page);
        itemsPerPage = parseInt(itemsPerPage);

        if (isNaN(page) || isNaN(itemsPerPage) || page < 0 || itemsPerPage < 0) {
            debug(`Invalid params country:${!country ? "any" : country} genre:${!genre ? "any" : genre} (page:${page}, itemsPerPage:${itemsPerPage})`);
            throw new Error("400");
        }

        debug(`Searching most popular artist country:${!country ? "any" : country} genre:${!genre ? "any" : genre} (page:${page}, itemsPerPage:${itemsPerPage})`);

        const totalItems = await this._artistDao.getMostPopularArtistsCount(country, genre);

        let results = [];

        if (totalItems > 0) {
            results = await this._artistDao.getMostPopularArtists(country, genre, page, itemsPerPage);
        }

        return new PaginatedResult(page, itemsPerPage, totalItems, results);
    }

    async getArtistRelations(artist, size) {

        size = parseInt(size);

        if (!artist || isNaN(size) || size < 0) {
            debug(`Invalid params artist:${artist} (size:${size})`);
            throw new Error("400");
        }

        const artistNode = await this._artistDao.getArtist(artist);

        if (!artistNode) {
            return null;
        }

        const results = await this._artistDao.getArtistRelations(artist, size);

        if (!results.nodes.length) {
            results.nodes.push(artistNode);
        }

        return results;
    }

    async getMostPopularAlbums(artist, country, genre, page, itemsPerPage) {

        page = parseInt(page);
        itemsPerPage = parseInt(itemsPerPage);

        if (isNaN(page) || isNaN(itemsPerPage) || page < 0 || itemsPerPage < 0) {
            debug(`Invalid params artist:${!artist ? "any" : artist} country:${!country ? "any" : country} genre:${!genre ? "any" : genre} (page:${page}, itemsPerPage:${itemsPerPage})`);
            throw new Error("400");
        }

        debug(`Searching most popular albums artist:${!artist ? "any" : artist} country:${!country ? "any" : country} genre:${!genre ? "any" : genre} (page:${page}, itemsPerPage:${itemsPerPage})`);

        const totalItems = await this._albumDao.getMostPopularAlbumsCount(artist, country, genre);

        let results = [];

        if (totalItems > 0) {
            results = await this._albumDao.getMostPopularAlbums(artist, country, genre, page, itemsPerPage);
        }

        return new PaginatedResult(page, itemsPerPage, totalItems, results);
    }

    async getAllCountries() {

        debug(`Searching all countries`);

        const results = await this._countriesDao.getCountries();

        return results;
    }

    async getGetAllGenres() {

        debug(`Searching all genres`);

        const results = await this._songsDao.getGenres();

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

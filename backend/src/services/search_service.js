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
    }

    async getArtists(){
        return this._artistDao.getArtists();
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
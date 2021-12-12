const debug = require('debug')('backend:server');
const daoUtils = require('@persistence/daos/utils/dao_utils');

class SongsDao {

    constructor() {
        if (!SongsDao.instance) {
            this._isInitialized = false;
            SongsDao.instance = this;
        }

        return SongsDao.instance;
    }

    async _init() {
        this._mongoDriver = await require("@persistence/drivers/mongo_driver")();
        this._neoDriver = await require("@persistence/drivers/neo_driver")();
    }

    async getMostPopularSongsCount(artist, country, genre) {
        try {
            const match = daoUtils.generateMatch(artist, country, genre);

            const pipeline = daoUtils.generateCountPipeline(match);

            const result = await this._mongoDriver.executeAggregationQuery(pipeline);

            return result[0].totalItems;

        } catch (error) {
            debug(error);
            return null;
        }
    }

    async getMostPopularSongs(artist, country, genre, page, itemsPerPage) {
        try {

            const match = daoUtils.generateMatch(artist, country, genre);

            const pipeline = daoUtils.generateResultsPipeline(match,null,null,null, page, itemsPerPage);

            return await this._mongoDriver.executeAggregationQuery(pipeline);

        } catch (error) {
            debug(error);
            return null;
        }
    }

}

const songsDao = new SongsDao();
module.exports = async () => {
    if (!songsDao._isInitialized) {
        songsDao._isInitialized = true;
        await songsDao._init();
        Object.freeze(songsDao);
    }
    return songsDao;
};

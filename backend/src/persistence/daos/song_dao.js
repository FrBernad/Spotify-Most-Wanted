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
        const match = daoUtils.generateMatch(artist, country, genre);
        const count = {$count: "totalItems"}

        const pipeline = [match, count];

        const result = await this._mongoDriver.executeAggregationQuery(pipeline);

        return result[0].totalItems;
    }

    async getMostPopularSongs(artist, country, genre, page, itemsPerPage) {
        const match = daoUtils.generateMatch(artist, country, genre);
        const offsetAndLimit = daoUtils.generateOffsetAndLimit(page, itemsPerPage);

        const pipeline = [match, ...offsetAndLimit];

        return await this._mongoDriver.executeAggregationQuery(pipeline);
    }

    async getGenres() {
        const group = {$group: {"_id": "$genre", count: {"$sum": 1}}};
        const project = {$project: {_id: 0, genre: "$_id", amount: "$count"}};
        const sort = {$sort: {genre: 1}};

        const pipeline = [group, project, sort];

        return await this._mongoDriver.executeAggregationQuery(pipeline);
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

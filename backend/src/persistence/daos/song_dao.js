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

        const pipeline = [daoUtils.project_normalization, match, count];

        const result = await this._mongoDriver.executeAggregationQuery(pipeline);

        return result.length > 0 ? result[0].totalItems : 0;
    }

    async getMostPopularSongs(artist, country, genre, page, itemsPerPage) {
        const match = daoUtils.generateMatch(artist, country, genre);
        const sort = {$sort: {popularity: -1, _id: -1}};
        const offsetAndLimit = daoUtils.generateOffsetAndLimit(page, itemsPerPage);

        const pipeline = [daoUtils.project_normalization, match, sort, ...offsetAndLimit];

        return await this._mongoDriver.executeAggregationQuery(pipeline);
    }

    async getGenres() {
        const group = {$group: {"_id": "$genre"}};
        const project = {$project: {_id: 0, name: "$_id"}};
        const sort = {$sort: {name: 1}};

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

const debug = require('debug')('backend:server');
const daoUtils = require('@persistence/daos/utils/dao_utils');

class ArtistDao {

    constructor() {
        if (!ArtistDao.instance) {
            this._isInitialized = false;
            ArtistDao.instance = this;
        }

        return ArtistDao.instance;
    }

    async _init() {
        this._mongoDriver = await require("@persistence/drivers/mongo_driver")();
        this._neoDriver = await require("@persistence/drivers/neo_driver")();
    }

    async getMostPopularArtists(country, genre, page, itemsPerPage) {

        try {

            const match = daoUtils.generateMatch(null, country, genre);
            const project =
                {
                    $project: {
                        _id: 0,
                        key: {$setUnion: [["$artist"], "$co_artists"]},
                        value: {title: "$title", popularity: "$popularity", uri: "$uri"}
                    }
                };
            const unwind = {$unwind: "$key"};
            const group = {$group: {"_id": "$key", "songs": {"$push": "$value"}}};
            const sort = {$sort: {_id: 1}};
            const offsetAndLimit = daoUtils.generateOffsetAndLimit(page, itemsPerPage);

            const pipeline = [match, project, unwind, group, sort, ...offsetAndLimit];

            return await this._mongoDriver.executeAggregationQuery(pipeline);

        } catch (error) {
            debug(error);
            return null;
        }
    }

    async getMostPopularArtistsCount(country, genre) {
        try {
            const match = daoUtils.generateMatch(null, country, genre);
            const project =
                {
                    $project: {
                        _id: 0,
                        key: {$setUnion: [["$artist"], "$co_artists"]},
                        value: {title: "$title", popularity: "$popularity", uri: "$uri"}
                    }
                };
            const unwind = {$unwind: "$key"};
            const group = {$group: {"_id": "$key", "songs": {"$push": "$value"}}};
            const count = {$count: "totalItems"};

            const pipeline = [match, project, unwind, group, count];

            const result = await this._mongoDriver.executeAggregationQuery(pipeline);
            return result[0].totalItems;

        } catch (error) {
            debug(error);
            return null;
        }
    }


}

const artistDao = new ArtistDao();
module.exports = async () => {
    if (!artistDao._isInitialized) {
        artistDao._isInitialized = true;
        await artistDao._init();
        Object.freeze(artistDao);
    }
    return artistDao;
};

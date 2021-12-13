const debug = require('debug')('backend:server');
const daoUtils = require('@persistence/daos/utils/dao_utils');

class AlbumDao {

    constructor() {
        if (!AlbumDao.instance) {
            this._isInitialized = false;
            AlbumDao.instance = this;
        }

        return AlbumDao.instance;
    }

    async _init() {
        this._mongoDriver = await require("@persistence/drivers/mongo_driver")();
        this._neoDriver = await require("@persistence/drivers/neo_driver")();
    }

    async getMostPopularAlbumsCount(artist, country, genre) {
        try {
            const match = daoUtils.generateMatch(artist, country, genre);
            const count = {$count: "totalItems"};

            const pipeline = [match, count];

            const result = await this._mongoDriver.executeAggregationQuery(pipeline);

            return result[0].totalItems;

        } catch (error) {
            debug(error);
            return null;
        }
    }

    async getMostPopularAlbums(artist, country, genre, page, itemsPerPage) {
        try {

            const match = daoUtils.generateMatch(artist, country, genre);
            let project = {
                $project: {
                    _id: 0,
                    album: {AlbumName: "$album", By: "$artist"},
                    value: {
                        title: "$title",
                        popularity: "$popularity",
                        uri: "$uri",
                        artists: {$setUnion: [["$artist"], "$co_artists"]}
                    }
                }
            };
            let group = {$group: {"_id": "$album", "songs": {"$push": "$value"}}};
            let sort = {$sort: {_id: 1}};
            const offsetAndLimit = daoUtils.generateOffsetAndLimit(page, itemsPerPage);

            const pipeline = [match, project, group, sort, offsetAndLimit];

            return await this._mongoDriver.executeAggregationQuery(pipeline);

        } catch (error) {
            debug(error);
            return null;
        }
    }

}

const albumDao = new AlbumDao();
module.exports = async () => {
    if (!albumDao._isInitialized) {
        albumDao._isInitialized = true;
        await albumDao._init();
        Object.freeze(albumDao);
    }
    return albumDao;
};

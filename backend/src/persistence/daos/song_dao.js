const debug = require('debug')('backend:server');

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

    async getMostPopularSongsCount(artist, country, genre){
        try {

            const match = this._generateMatch(artist, country, genre);

            const pipeline = this._generateCountPipeline(match);

            const result = await this._mongoDriver.executeAggregationQuery(pipeline);
            
            return result[0].totalItems;

        } catch (error) {
            debug(error);
            return null;
        }
    }

    async getMostPopularSongs(artist, country, genre, page, itemsPerPage) {
        try {

            const match = this._generateMatch(artist, country, genre);

            const pipeline = this._generateResultsPipeline(match, page, itemsPerPage);

            return await this._mongoDriver.executeAggregationQuery(pipeline);

        } catch (error) {
            debug(error);
            return null;
        }
    }

    _generateResultsPipeline(match, page, itemsPerPage) {
        const pipeline = [];

        if (!!match) {
            pipeline.push(match);
        }

        pipeline.push({ $skip: page * itemsPerPage }, { $limit: itemsPerPage })

        return pipeline;
    }

    _generateCountPipeline(match) {
        const pipeline = [];

        if (!!match) {
            pipeline.push(match);
        }

        pipeline.push({ $count: "totalItems" })

        return pipeline;
    }

    _generateMatch(artist, country, genre) {
        const match = [];
        if (!!artist) {
            match.push({ $or: [{ artist: artist }, { co_artists: artist }] })
        }
        if (!!country) {
            match.push({ countries: country })
        }
        if (!!genre) {
            match.push({ genre: genre })
        }
        if (!match.length) {
            return null;
        }
        return {
            $match: { $and: match }
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

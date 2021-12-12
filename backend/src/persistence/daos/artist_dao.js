const debug = require('debug')('backend:server');
// const daoUtils = require('@persistence/daos/utils/dao_utils');

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

            const match = this._generateMatch(null, country, genre);

            const pipeline = this.generateResultsPipeline(match, page, itemsPerPage);

            return await this._mongoDriver.executeAggregationQuery(pipeline);

        } catch (error) {
            debug(error);
            return null;
        }
    }

    async getMostPopularArtistsCount(country, genre) {
        try {
            const match = daoUtils.generateMatch(null, country, genre);

            match.push(
                {
                    $project: {
                        _id: 0,
                        key: {$setUnion: [["$artist"], "$co_artists"]},
                        value: {title: "$title", popularity: "$popularity", uri: "$uri"}
                    }
                });

            match.push({$unwind: "$key"});

            match.push({$group: {"_id": "$key", "songs": {"$push": "$value"}}});

            const pipeline = daoUtils.generateCountPipeline(match,null);

            const result = await this._mongoDriver.executeAggregationQuery(pipeline);
            return result[0].totalItems;

        } catch (error) {
            debug(error);
            return null;
        }
    }


    _generateCountPipeline(match) {
        const pipeline = [];

        if (!!match) {
            pipeline.push(match);
        }
        pipeline.push(
            {
                $project: {
                    _id: 0,
                    key: {$setUnion: [["$artist"], "$co_artists"]},
                    value: {title: "$title", popularity: "$popularity", uri: "$uri"}
                }
            });

        pipeline.push({$unwind: "$key"});

        pipeline.push({$group: {"_id": "$key", "songs": {"$push": "$value"}}});

        pipeline.push({$count: "totalItems"})

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

    generateResultsPipeline(match, page, itemsPerPage) {
        const pipeline = [];

        if (!!match) {
            pipeline.push(match);
        }

        pipeline.push(
            {
                $project: {
                    _id: 0,
                    key: {$setUnion: [["$artist"], "$co_artists"]},
                    value: {title: "$title", popularity: "$popularity", uri: "$uri"}
                }
            });

        pipeline.push({$unwind: "$key"});

        pipeline.push({$group: {"_id": "$key", "songs": {"$push": "$value"}}});

        pipeline.push({ $skip: page * itemsPerPage }, { $limit: itemsPerPage })

        return pipeline;
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
